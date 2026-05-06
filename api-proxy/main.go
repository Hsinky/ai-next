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
		return os.Getenv("AREA_GUID")
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	bodyStr := string(body)
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
	return os.Getenv("AREA_GUID")
}

func handleProxy(w http.ResponseWriter, r *http.Request) {
	var req ProxyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	areaGUID := getAreaGUID()
	singleDate := req.Date
	if len(singleDate) > 10 {
		singleDate = singleDate[:10]
	}

	cookies := fmt.Sprintf("outusertime=%s; outxai=1", url.QueryEscape(req.Date))
	userno := "1928154"
	userdq := "1928154"
	usernamedq := "蒋静"
	sybcode := "FQ01"
	isuser := "0"

	createMd5 := func(typeCode string) string {
		return md5Hash(userno + userdq + "" + singleDate + typeCode + areaGUID + sybcode + isuser)
	}

	output := make(map[string]interface{})

	for _, typeCode := range []string{"A007", "A008", "A019", "A016"} {
		apiReq := APIRequest{
			UserNo: userno, UserDQ: userdq, UserYZ: "", UserNameDQ: usernamedq,
			ChannelID: "", Date: singleDate, Type: typeCode, AreaGUID: areaGUID,
			SybCode: sybcode, IsUser: isuser, MD5: createMd5(typeCode),
		}
		jsonData, _ := json.Marshal(apiReq)
		resp, err := http.Post(ExternalAPI, "application/json; charset=utf-8", bytes.NewBuffer(jsonData))
		if err != nil {
			output[typeCode] = map[string]string{"error": "request failed"}
			continue
		}
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()
		output[typeCode] = json.RawMessage(body)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}

func main() {
	port := "8080"
	if p := os.Getenv("PORT"); p != "" {
		port = p
	}
	http.HandleFunc("/", corsMiddleware(handleProxy))
	fmt.Printf("Proxy running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
