package main

import (
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
)

const (
	ExternalAPI = "http://c-cms.eifini.com:9923/index.aspx/GetInfo"
)

type ProxyRequest struct {
	Date string `json:"date"`
}

type APIRequest struct {
	UserNo     string `json:"userno"`
	UserDQ     string `json:"userdq"`
	UserYZ     string `json:"useryz"`
	UserNameDQ string `json:"usernamedq"`
	ChannelID  string `json:"channelid"`
	Date       string `json:"date"`
	Type       string `json:"type"`
	AreaGUID   string `json:"area_guid"`
	SybCode    string `json:"sybcode"`
	IsUser     string `json:"isuser"`
	MD5        string `json:"md5"`
}

func md5Hash(message string) string {
	hash := md5.Sum([]byte(message))
	return hex.EncodeToString(hash[:])
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func getAreaGUID() string {
	resp, err := http.Get("http://c-cms.eifini.com:9923/index.aspx?eid=52846&sybcode=FQ01")
	if err != nil {
		return "4fe1414d75434e67bb1a7d188a1ada48" // fallback
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	bodyStr := string(body)

	// 查找 area_guid = "xxx" 格式
	for i := 0; i < len(bodyStr)-20; i++ {
		if bodyStr[i:i+12] == "area_guid =" {
			start := i + 14
			end := start
			for end < len(bodyStr) && bodyStr[end] != '"' {
				end++
			}
			if end < len(bodyStr) {
				return bodyStr[start:end]
			}
		}
	}
	return "4fe1414d75434e67bb1a7d188a1ada48" // fallback
}

func handleProxy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	// 解析请求
	var req ProxyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// 获取 area_guid
	areaGUID := getAreaGUID()

	// 从日期范围中提取单日
	singleDate := req.Date
	if len(singleDate) > 10 {
		singleDate = singleDate[:10]
	}

	// Cookie
	cookies := fmt.Sprintf("outusertime=%s; outxai=1", url.QueryEscape(req.Date))

	// 固定参数
	userno := "1928154"
	userdq := "1928154"
	usernamedq := "蒋静"
	sybcode := "FQ01"
	isuser := "0"

	// 创建 MD5
	createMd5 := func(typeCode string) string {
		return md5Hash(userno + userdq + "" + singleDate + typeCode + areaGUID + sybcode + isuser)
	}

	// 并发请求所有类型
	type result struct {
		resp *http.Response
		err  error
	}
	results := make(chan result, 4)

	for _, typeCode := range []string{"A007", "A008", "A019", "A016"} {
		go func(tc string) {
			apiReq := APIRequest{
				UserNo:     userno,
				UserDQ:     userdq,
				UserYZ:     "",
				UserNameDQ: usernamedq,
				ChannelID:  "",
				Date:       singleDate,
				Type:       tc,
				AreaGUID:   areaGUID,
				SybCode:    sybcode,
				IsUser:     isuser,
				MD5:        createMd5(tc),
			}
			jsonData, _ := json.Marshal(apiReq)
			resp, err := http.Post(ExternalAPI, "application/json; charset=utf-8", bytes.NewBuffer(jsonData))
			results <- result{resp, err}
		}(typeCode)
	}

	// 收集结果
	responses := make(map[string]*http.Response)
	for i := 0; i < 4; i++ {
		r := <-results
		if r.resp != nil {
			// 确定类型
			for _, tc := range []string{"A007", "A008", "A019", "A016"} {
				if responses[tc] == nil {
					responses[tc] = r.resp
					break
				}
			}
		}
	}

	// 返回所有响应
	output := make(map[string]interface{})
	for tc, resp := range responses {
		if resp != nil {
			defer resp.Body.Close()
			body, _ := io.ReadAll(resp.Body)
			output[tc] = json.RawMessage(body)
		} else {
			output[tc] = map[string]string{"error": "request failed"}
		}
	}

	json.NewEncoder(w).Encode(output)
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("OK"))
}

func main() {
	port := "8080"
	if p := os.Getenv("PORT"); p != "" {
		port = p
	}

	http.HandleFunc("/", corsMiddleware(handleProxy))
	http.HandleFunc("/health", corsMiddleware(handleHealth))

	fmt.Printf("Proxy server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
