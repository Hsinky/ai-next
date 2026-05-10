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
	"os/exec"
	"regexp"
	"runtime"
	"strconv"
	"strings"
	"time"
)

const (
	UserNo     = "1928154"
	UserDQ     = "1928154"
	UserNameDQ = "蒋静"
	IsUser     = "0"
	SybCode    = "FQ01"
	APIUrl     = "http://c-cms.eifini.com:9923/index.aspx/GetInfo"
)

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

type APIResponse struct {
	D string `json:"d"`
}

type DataList struct {
	Code   int                      `json:"code"`
	A007   *A007Data                `json:"A007"`
	A008   *A008Data                `json:"A008"`
	A019   *A019Data                `json:"A019"`
	A019_4 []CategoryItem           `json:"A019_4"`
	A019_2 []SeasonItem             `json:"A019_2"`
	A016   []map[string]string      `json:"A016"`
	Other  *int                     `json:"other"`
}

type A007Data struct {
	AMOUNT string `json:"AMOUNT"`
}

type A008Data struct {
	POS_AMOUNT string `json:"POS_AMOUNT"`
	WSC_AMOUNT string `json:"WSC_AMOUNT"`
}

type A019Data struct {
	A019_4 []CategoryItem `json:"A019_4"`
	A019_2 []SeasonItem   `json:"A019_2"`
}

type CategoryItem struct {
	PRODCATEGORY string `json:"PRODCATEGORY"`
	QUANTITY     string `json:"QUANTITY"`
	DISAMOUNT    string `json:"DISAMOUNT"`
	SYEZB        string `json:"SYEZB"`
	ZKL          string `json:"ZKL"`
}

type SeasonItem struct {
	QUARTER   string `json:"QUARTER"`
	QUANTITY  string `json:"QUANTITY"`
	DISAMOUNT string `json:"DISAMOUNT"`
	SYEZB     string `json:"SYEZB"`
	ZKL       string `json:"ZKL"`
}

type StoreItem struct {
    NAME        string `json:"NAME"`
    PLAN_AMOUNT string `json:"PLAN_AMOUNT"`
    POS_AMOUNT  string `json:"POS_AMOUNT"`
    WSC_AMOUNT  string `json:"WSC_AMOUNT"`
    WCL         string `json:"WCL"`
}

type ResultData struct {
	CompletionRate string         `json:"completionRate"`
	TargetAmount   string         `json:"targetAmount"`
	TotalSales     string         `json:"totalSales"`
	ESRatio        string         `json:"esRatio"`
	CategorySales  []CategoryItem `json:"categorySales"`
	SeasonSales    []SeasonItem   `json:"seasonSales"`
	FetchedAt       string         `json:"fetchedAt"`
    StoreAnalysis   string         `json:"storeAnalysis"`
}

func md5Hash(message string) string {
	hash := md5.Sum([]byte(message))
	return hex.EncodeToString(hash[:])
}

func getTodayDateRange() string {
	today := time.Now()
	year := today.Year()
	month := fmt.Sprintf("%02d", today.Month())
	day := fmt.Sprintf("%02d", today.Day())
	dateStr := fmt.Sprintf("%d-%s-%s", year, month, day)
	return fmt.Sprintf("%s ~ %s", dateStr, dateStr)
}

func getTodayDate() string {
	today := time.Now()
	year := today.Year()
	month := fmt.Sprintf("%02d", today.Month())
	day := fmt.Sprintf("%02d", today.Day())
	return fmt.Sprintf("%d-%s-%s", year, month, day)
}

func dateRangeToDate(dateRange string) string {
	// 从 "2026-05-07 ~ 2026-05-07" 格式中提取单日
	// 如果已经是单日格式，直接返回
	if !strings.Contains(dateRange, "~") {
		return dateRange
	}
	parts := strings.Split(dateRange, " ~ ")
	if len(parts) > 0 {
		return strings.TrimSpace(parts[0])
	}
	return dateRange
}

func calculateCompletionRate(posAmount, wscAmount, targetAmount string) string {
	pos := parseFloat(posAmount)
	wsc := parseFloat(wscAmount)
	target := parseFloat(targetAmount)
	if target == 0 {
		return "0.0%"
	}
	return fmt.Sprintf("%.1f%%", (pos+wsc)/target*100)
}

func parseFloat(s string) float64 {
	f, _ := strconv.ParseFloat(s, 64)
	return f
}

func fetchWithTimeout(apiUrl string, jsonData []byte, cookies string, timeout time.Duration) (*APIResponse, error) {
	req, err := http.NewRequest("POST", apiUrl, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	req.Header.Set("Cookie", cookies)

	client := &http.Client{Timeout: timeout}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var result APIResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return &result, nil
}

func getAreaGUID() string {
	resp, err := http.Get("http://c-cms.eifini.com:9923/index.aspx?eid=52846&sybcode=FQ01")
	if err != nil {
		return ""
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	bodyStr := string(body)

	// 查找 area_guid = "xxx" 格式
	re := regexp.MustCompile(`area_guid = "([^"]+)"`)
	matches := re.FindStringSubmatch(bodyStr)
	if len(matches) > 1 {
		return matches[1]
	}
	return ""
}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// 动态获取area_guid
	areaGUID := getAreaGUID()
	if areaGUID == "" {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":    "Failed to get area_guid",
		})
		return
	}

	dateParam := r.URL.Query().Get("date")
	dateRange := dateParam
	if dateRange == "" {
		dateRange = getTodayDateRange()
	}

	// 从日期范围中提取单日（用于MD5和API请求）
	singleDate := dateRangeToDate(dateRange)

	// Cookie中使用日期范围格式
	cookies := fmt.Sprintf("outusertime=%s; outxai=1", url.QueryEscape(dateRange))

	createMd5 := func(typeCode string) string {
		return md5Hash(UserNo + UserDQ + "" + singleDate + typeCode + areaGUID + SybCode + IsUser)
	}

	// 并发请求
	type result struct {
		resp *APIResponse
		err  error
	}
	results := make(chan result, 4)

	for _, typeCode := range []string{"A007", "A008", "A019", "A016"} {
		go func(tc string) {
			req := APIRequest{
				UserNo:     UserNo,
				UserDQ:     UserDQ,
				UserYZ:     "",
				UserNameDQ: UserNameDQ,
				ChannelID:  "",
				Date:       singleDate,
				Type:       tc,
				AreaGUID:   areaGUID,
				SybCode:    SybCode,
				IsUser:     IsUser,
				MD5:        createMd5(tc),
			}
			jsonData, _ := json.Marshal(req)
			resp, err := fetchWithTimeout(APIUrl, jsonData, cookies, 25*time.Second)
			results <- result{resp, err}
		}(typeCode)
	}

	// 收集结果
	var respA007, respA008, respA019, respA016 *APIResponse

	for i := 0; i < 4; i++ {
		r := <-results
		switch {
		case r.resp != nil && r.err == nil:
			// 根据内容判断类型（简化处理）
			// 实际应该按顺序接收，但这里用简化方式
		}
	}

	// 重新按顺序请求（更可靠）
	respA007, _ = fetchWithTimeout(APIUrl, func() []byte {
		req := APIRequest{UserNo: UserNo, UserDQ: UserDQ, UserYZ: "", UserNameDQ: UserNameDQ, ChannelID: "", Date: singleDate, Type: "A007", AreaGUID: areaGUID, SybCode: SybCode, IsUser: IsUser, MD5: createMd5("A007")}
		b, _ := json.Marshal(req)
		return b
	}(), cookies, 25*time.Second)

	respA008, _ = fetchWithTimeout(APIUrl, func() []byte {
		req := APIRequest{UserNo: UserNo, UserDQ: UserDQ, UserYZ: "", UserNameDQ: UserNameDQ, ChannelID: "", Date: singleDate, Type: "A008", AreaGUID: areaGUID, SybCode: SybCode, IsUser: IsUser, MD5: createMd5("A008")}
		b, _ := json.Marshal(req)
		return b
	}(), cookies, 25*time.Second)

	respA019, _ = fetchWithTimeout(APIUrl, func() []byte {
		req := APIRequest{UserNo: UserNo, UserDQ: UserDQ, UserYZ: "", UserNameDQ: UserNameDQ, ChannelID: "", Date: singleDate, Type: "A019", AreaGUID: areaGUID, SybCode: SybCode, IsUser: IsUser, MD5: createMd5("A019")}
		b, _ := json.Marshal(req)
		return b
	}(), cookies, 25*time.Second)

	respA016, _ = fetchWithTimeout(APIUrl, func() []byte {
		req := APIRequest{UserNo: UserNo, UserDQ: UserDQ, UserYZ: "", UserNameDQ: UserNameDQ, ChannelID: "", Date: singleDate, Type: "A016", AreaGUID: areaGUID, SybCode: SybCode, IsUser: IsUser, MD5: createMd5("A016")}
		b, _ := json.Marshal(req)
		return b
	}(), cookies, 25*time.Second)


	// 获取店铺排名数据 A024
	respA024, _ := fetchWithTimeout(APIUrl, func() []byte {
		req := APIRequest{UserNo: UserNo, UserDQ: UserDQ, UserYZ: "", UserNameDQ: UserNameDQ, ChannelID: "", Date: singleDate, Type: "A024", AreaGUID: areaGUID, SybCode: SybCode, IsUser: IsUser, MD5: createMd5("A024")}
		b, _ := json.Marshal(req)
		return b
	}(), cookies, 25*time.Second)

	// 解析响应
	var listA007, listA008, listA019, listA016 DataList
	json.Unmarshal([]byte(respA007.D), &listA007)
	json.Unmarshal([]byte(respA008.D), &listA008)
	json.Unmarshal([]byte(respA019.D), &listA019)
	json.Unmarshal([]byte(respA016.D), &listA016)

	// 解析 A024 店铺排名
	var storeList []StoreItem
	if respA024 != nil {
		var storeResult struct {
			A024 []StoreItem `json:"A024"`
		}
		json.Unmarshal([]byte(respA024.D), &storeResult)
		storeList = storeResult.A024
	}
	log.Printf("[DEBUG] A024 stores count: %d", len(storeList))

	// 按完成率分组店铺
	var passedStores []string
	var failedStores []string
	for _, s := range storeList {
		if strings.Contains(s.NAME, "特卖") {
			continue
		}
		wcl := parseFloat(s.WCL)
		if wcl >= 100 {
			passedStores = append(passedStores, s.NAME)
		} else {
			failedStores = append(failedStores, s.NAME)
		}
	}
	// 清洗店铺名称
		cleanName := func(name string) string {
			name = strings.ReplaceAll(name, "四川成都", "")
			name = strings.ReplaceAll(name, "购物广场", "")
			name = strings.ReplaceAll(name, "广场", "")
			return name
		}
		storeAnalysis := strings.Join(passedStores, "/") + "✅\n" + strings.Join(failedStores, "/") + "❌"
		// 替换干净后的名称
		passedClean := make([]string, len(passedStores))
		for i, s := range passedStores { passedClean[i] = cleanName(s) }
		failedClean := make([]string, len(failedStores))
		for i, s := range failedStores { failedClean[i] = cleanName(s) }
		storeAnalysis = strings.Join(passedClean, "/") + "✅\n" + strings.Join(failedClean, "/") + "❌"
	log.Printf("[DEBUG] Store analysis: %s", storeAnalysis)

	// 调试：打印原始响应
	log.Printf("[DEBUG] A007 raw: %s", respA007.D)
	log.Printf("[DEBUG] A008 raw: %s", respA008.D)

	// 提取数据
	targetAmount := "0"
	if listA007.A007 != nil && listA007.A007.AMOUNT != "" {
		targetAmount = listA007.A007.AMOUNT
	}

	posAmount := "0"
	wscAmount := "0"
	if listA008.A008 != nil {
		if listA008.A008.POS_AMOUNT != "" {
			posAmount = listA008.A008.POS_AMOUNT
		}
		if listA008.A008.WSC_AMOUNT != "" {
			wscAmount = listA008.A008.WSC_AMOUNT
		}
	}

	completionRate := calculateCompletionRate(posAmount, wscAmount, targetAmount)

	var categorySales []CategoryItem
	var seasonSales []SeasonItem

	// 从 A019 直接获取
	if len(listA019.A019_4) > 0 {
		categorySales = listA019.A019_4
	} else if listA019.A019 != nil {
		categorySales = listA019.A019.A019_4
	}
	if len(listA019.A019_2) > 0 {
		seasonSales = listA019.A019_2
	} else if listA019.A019 != nil {
		seasonSales = listA019.A019.A019_2
	}

	// ES 比例
	esRatio := 0.0
	if len(listA016.A016) >= 4 {
		headerRow := listA016.A016[0]
		targetCol := "T4"
		for k, v := range headerRow {
			if v == "S/E" {
				targetCol = k
				break
			}
		}
		compareValue := parseFloat(listA016.A016[2][targetCol])
		eValue := parseFloat(listA016.A016[3][targetCol])
		if compareValue > 0 {
			esRatio = (eValue / compareValue) * 100
		}
	}

	totalSales := fmt.Sprintf("%.1f", parseFloat(posAmount)+parseFloat(wscAmount))

	// 确保空切片是空数组而不是 null
	if categorySales == nil {
		categorySales = []CategoryItem{}
	}
	if seasonSales == nil {
		seasonSales = []SeasonItem{}
	}

	resultData := ResultData{
		CompletionRate: completionRate,
		TargetAmount:   targetAmount,
		TotalSales:     totalSales,
		ESRatio:        fmt.Sprintf("%.0f", esRatio),
		CategorySales:  categorySales,
		SeasonSales:    seasonSales,
		FetchedAt:      time.Now().Format(time.RFC3339),
			StoreAnalysis:  storeAnalysis,
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"data":    resultData,
	})
}

func generateReport(data ResultData, startDate string) string {
	_ = startDate // unused, kept for compat
	target := parseFloat(data.TargetAmount)
	actual := parseFloat(data.TotalSales)

	var categoryLines []string
	for _, c := range data.CategorySales {
		if c.PRODCATEGORY != "" {
			categoryLines = append(categoryLines, fmt.Sprintf("%s%s件  占比%s%%",
				c.PRODCATEGORY, c.QUANTITY, c.SYEZB))
		}
	}
	categoryText := strings.Join(categoryLines, "\n")
	if categoryText == "" {
		categoryText = "毛衫_件  占比_%\n裤子_件  占比_%\n上衣_件  占比_%\n裙子_件  占比_%\n连衣裙_件 占比_%\n单服装_件，占比_%"
	}

	var seasonLines []string
	for _, s := range data.SeasonSales {
		if s.QUARTER != "" {
			name := strings.Replace(s.QUARTER, "装", "", -1)
			seasonLines = append(seasonLines, fmt.Sprintf("%s占比%s%%", name, s.SYEZB))
		}
	}
	seasonText := strings.Join(seasonLines, ",\n")
	if seasonText == "" {
		seasonText = "春装占比_%，\n夏装占比_%\n常青款占比_%"
	}

	// 格式化日期
	parts := strings.Split(startDate, "-")
	if len(parts) == 3 {
		year := parts[0]
		month := parts[1]
		day := parts[2]
		if len(day) > 2 {
			day = day[:2]
		}
		startDate = fmt.Sprintf("%s/%s/%s", year, month, day)
	}

	return fmt.Sprintf(`%s
成都区/蒋静
今日目标：%d
实际达成：%d
达成率：%s
ES占比：%s%%

1️⃣神裤目标：
日目标_，销售件：_，差额：_
周目标_，累计：_，差额：_

2️⃣主推目标
日目标：_，销售：_，差额_
周目标：_件，累计：_，差额_

季节占比
%s

品类销售占比：
%s

会员回店数：8人/金额18643

1.区域完成%s
%s
2.今日会员回店8人，占比36%%，客单2330，3000+产出3张，大悦城回头不理想
3.主推达成，卓锦/和悦有提升，头部深度不够
明日重点
1.区域五一销售复盘，周目标同频
2.跟进区域4个重点款式产出，新同事练货跟进
3.生日及临期券顾客邀约跟进，持续跟进大V资料完善，及店铺学习情况`,
		startDate,
		int(target),
		int(actual),
		data.CompletionRate,
			data.StoreAnalysis,
		data.ESRatio,
		seasonText,
		categoryText,
		data.CompletionRate,
	)
}

func getHTMLTemplate() string {
	return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>完成率看板</title>
	<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-100">
	<div class="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
		<div class="flex items-center justify-between max-w-lg mx-auto">
			<h1 class="text-lg font-bold text-gray-900">完成率看板</h1>
			<div class="flex items-center gap-2">
				<button onclick="copyReport()" class="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800" id="copyBtn">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				</button>
				<button onclick="fetchData()" id="refreshBtn" class="p-2 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div class="p-4 space-y-4 max-w-lg mx-auto">
		<div class="bg-white rounded-xl shadow-sm p-4">
			<div class="text-sm text-gray-500 mb-3">选择日期范围</div>
			<div class="grid grid-cols-2 gap-3 mb-3">
				<div>
					<label class="text-xs text-gray-600 block mb-1">开始日期</label>
					<input type="date" id="startDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
				</div>
				<div>
					<label class="text-xs text-gray-600 block mb-1">结束日期</label>
					<input type="date" id="endDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
				</div>
			</div>
			<div class="grid grid-cols-2 gap-3">
				<button onclick="goToday()" class="py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300">今天</button>
				<button onclick="doQuery()" class="py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800">查询</button>
			</div>
			<div class="mt-3 text-xs text-gray-500 text-center" id="dateDisplay"></div>
		</div>

		<div id="loading" class="bg-white rounded-xl shadow-sm p-8 text-center">
			<div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
			<p class="mt-3 text-gray-500 text-sm">正在获取数据...</p>
		</div>

		<div id="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl hidden">
			<div class="flex items-center">
				<svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
				</svg>
				<span class="text-sm" id="errorMsg"></span>
			</div>
		</div>

		<div id="content" class="hidden space-y-4">
			<div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
				<div class="text-blue-100 text-sm mb-2">完成率</div>
				<div class="text-5xl font-bold" id="completionRate"></div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div class="bg-white rounded-xl shadow-sm p-4">
					<div class="flex items-center text-gray-500 text-xs mb-2">
						<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
						</svg>
						业绩目标
					</div>
					<div class="text-xl font-bold text-gray-900" id="targetAmount"></div>
				</div>
				<div class="bg-white rounded-xl shadow-sm p-4">
					<div class="flex items-center text-gray-500 text-xs mb-2">
						<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						总业绩
					</div>
					<div class="text-xl font-bold text-gray-900" id="totalSales"></div>
				</div>
			</div>

			<div id="seasonSection" class="bg-white rounded-xl shadow-sm p-4 hidden">
				<div class="text-sm font-medium text-gray-700 mb-3">季节占比</div>
				<div class="grid grid-cols-3 gap-2" id="seasonSales"></div>
			</div>

			<div id="categorySection" class="bg-white rounded-xl shadow-sm p-4 hidden">
				<div class="text-sm font-medium text-gray-700 mb-3">品类销售占比</div>
				<div class="space-y-2" id="categorySales"></div>
			</div>

			<div class="bg-white rounded-xl shadow-sm overflow-hidden">
				<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
					<span class="text-sm font-medium text-gray-700">报告内容</span>
					<button onclick="copyReport()" class="text-sm text-green-600 hover:text-green-700 font-medium" id="copyBtn2">复制</button>
				</div>
				<pre class="p-4 text-sm text-gray-800 whitespace-pre-wrap font-mono bg-gray-50" id="reportContent"></pre>
			</div>

			<div class="text-center text-xs text-gray-400 pt-2" id="updateTime"></div>
		</div>
	</div>

	<script>
		var currentReport = '';

		function getLocalToday() {
			var d = new Date();
			var year = d.getFullYear();
			var month = String(d.getMonth() + 1).padStart(2, '0');
			var day = String(d.getDate()).padStart(2, '0');
			return year + '-' + month + '-' + day;
		}

		function initDate() {
			var today = getLocalToday();
			document.getElementById('startDate').value = today;
			document.getElementById('endDate').value = today;
			document.getElementById('dateDisplay').textContent = today + ' ~ ' + today;
		}

		function doQuery() {
			fetchData();
		}

		function goToday() {
			var today = getLocalToday();
			document.getElementById('startDate').value = today;
			document.getElementById('endDate').value = today;
			fetchData();
		}

		async function fetchData() {
			var startDate = document.getElementById('startDate').value;
			var endDate = document.getElementById('endDate').value;
			var dateRange = startDate + ' ~ ' + endDate;
			document.getElementById('dateDisplay').textContent = dateRange;
			document.getElementById('loading').classList.remove('hidden');
			document.getElementById('error').classList.add('hidden');
			document.getElementById('content').classList.add('hidden');
			var refreshBtn = document.getElementById('refreshBtn');
			refreshBtn.classList.add('bg-gray-400', 'cursor-wait');
			refreshBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');

			try {
				var response = await fetch('/api?date=' + encodeURIComponent(dateRange));
				var result = await response.json();
				if (result.success && result.data) {
					renderData(result.data);
				} else {
					showError(result.error || '获取数据失败');
				}
			} catch (err) {
				showError('网络错误: ' + err.message);
			} finally {
				refreshBtn.classList.remove('bg-gray-400', 'cursor-wait');
				refreshBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
			}
		}

		function renderData(data) {
			currentReport = generateReportText(data);
			document.getElementById('loading').classList.add('hidden');
			document.getElementById('content').classList.remove('hidden');
			document.getElementById('completionRate').textContent = data.completionRate || '0%';
			document.getElementById('targetAmount').textContent = data.targetAmount || '0';
			document.getElementById('totalSales').textContent = data.totalSales || '0';
			document.getElementById('reportContent').textContent = currentReport;
			document.getElementById('updateTime').textContent = '更新时间: ' + new Date(data.fetchedAt || new Date()).toLocaleString('zh-CN');

			if (data.seasonSales && data.seasonSales.length > 0) {
				var seasonHtml = '';
				for (var i = 0; i < data.seasonSales.length; i++) {
					var s = data.seasonSales[i];
					seasonHtml += '<div class="text-center p-2 bg-gray-50 rounded-lg">';
					seasonHtml += '<div class="text-xs text-gray-500">' + s.QUARTER + '</div>';
					seasonHtml += '<div class="text-lg font-bold text-gray-900">' + s.SYEZB + '%</div>';
					seasonHtml += '</div>';
				}
				document.getElementById('seasonSales').innerHTML = seasonHtml;
				document.getElementById('seasonSection').classList.remove('hidden');
			} else {
				document.getElementById('seasonSection').classList.add('hidden');
			}

			if (data.categorySales && data.categorySales.length > 0) {
				var categoryHtml = '';
				for (var i = 0; i < data.categorySales.length; i++) {
					var c = data.categorySales[i];
					var bgClass = i === data.categorySales.length - 1 ? 'bg-blue-50 font-bold' : 'bg-gray-50';
					categoryHtml += '<div class="flex items-center justify-between p-2 rounded-lg ' + bgClass + '">';
					categoryHtml += '<span class="text-sm text-gray-700">' + c.PRODCATEGORY + '</span>';
					categoryHtml += '<div class="flex items-center gap-3">';
					categoryHtml += '<span class="text-sm text-gray-500">' + c.QUANTITY + '件</span>';
					categoryHtml += '<span class="text-sm font-bold text-blue-600">' + c.SYEZB + '%</span>';
					categoryHtml += '</div></div>';
				}
				document.getElementById('categorySales').innerHTML = categoryHtml;
				document.getElementById('categorySection').classList.remove('hidden');
			} else {
				document.getElementById('categorySection').classList.add('hidden');
			}
		}

		function generateReportText(data) {
			var target = parseFloat(data.targetAmount || '0');
			var actual = parseFloat(data.totalSales || '0');
			var esRatio = data.esRatio || '0';
			var startDate = document.getElementById('startDate').value;

			var categoryLines = [];
			if (data.categorySales) {
				for (var i = 0; i < data.categorySales.length; i++) {
					var c = data.categorySales[i];
					if (c.PRODCATEGORY) {
						categoryLines.push(c.PRODCATEGORY + c.QUANTITY + '件  占比' + c.SYEZB + '%');
					}
				}
			}
			var categoryText = categoryLines.join('\n');
			if (!categoryText) {
				categoryText = '毛衫_件  占比_%\n裤子_件  占比_%\n上衣_件  占比_%\n裙子_件  占比_%\n连衣裙_件 占比_%\n单服装_件，占比_%';
			}

			var seasonLines = [];
			if (data.seasonSales) {
				for (var i = 0; i < data.seasonSales.length; i++) {
					var s = data.seasonSales[i];
					if (s.QUARTER) {
						var name = s.QUARTER.replace('装', '');
						seasonLines.push(name + '占比' + s.SYEZB + '%');
					}
				}
			}
			var seasonText = seasonLines.join(',\n');
			if (!seasonText) {
				seasonText = '春装占比_%，\n夏装占比_%\n常青款占比_%';
			}

			var dateParts = startDate.split('-');
			var dateStr = dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2];

			return dateStr + '\n成都区/蒋静\n今日目标：' + Math.round(target) + '\n实际达成：' + Math.round(actual) + '\n达成率：' + data.completionRate + '\nES占比：' + esRatio + '%\n\n1️⃣神裤目标：\n日目标_，销售件：_，差额：_\n周目标_，累计：_，差额：_\n\n2️⃣主推目标\n日目标：_，销售：_，差额_\n周目标：_件，累计：_，差额_\n\n季节占比\n' + seasonText + '\n\n品类销售占比：\n' + categoryText + '\n\n会员回店数：8人/金额18643\n\n1.区域完成' + data.completionRate + '\n' + (data.storeAnalysis || '') + '\n2.今日会员回店8人，占比36%，客单2330，3000+产出3张，大悦城回头不理想\n3.主推达成，卓锦/和悦有提升，头部深度不够\n明日重点\n1.区域五一销售复盘，周目标同频\n2.跟进区域4个重点款式产出，新同事练货跟进\n3.生日及临期券顾客邀约跟进，持续跟进大V资料完善，及店铺学习情况';
		}

		function showError(msg) {
			document.getElementById('loading').classList.add('hidden');
			document.getElementById('content').classList.add('hidden');
			document.getElementById('error').classList.remove('hidden');
			document.getElementById('errorMsg').textContent = msg;
		}

		function copyReport() {
			if (!currentReport) return;
			navigator.clipboard.writeText(currentReport.replace(/\n/g, '\n')).then(function() {
				var btn1 = document.getElementById('copyBtn');
				var original1 = btn1.innerHTML;
				btn1.innerHTML = '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
				setTimeout(function() { btn1.innerHTML = original1; }, 2000);
				var btn2 = document.getElementById('copyBtn2');
				var original2 = btn2.textContent;
				btn2.textContent = '已复制';
				setTimeout(function() { btn2.textContent = original2; }, 2000);
			}).catch(function() {
				alert('复制失败，请手动复制');
			});
		}

		initDate();
		fetchData();
	</script>
</body>
</html>`
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, getHTMLTemplate())
}

func main() {
	http.HandleFunc("/", handleIndex)
	http.HandleFunc("/api", handleAPI)

	port := "8080"
	serverURL := "http://localhost:" + port

	fmt.Println("========================================")
	fmt.Println("           蒋静数据看板")
	fmt.Println("========================================")
	fmt.Printf("服务已启动: %s\n", serverURL)
	fmt.Println("按 Ctrl+C 退出")
	fmt.Println("========================================")
	fmt.Println()

	go func() {
		time.Sleep(500 * time.Millisecond)
		openBrowser(serverURL)
	}()

	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func openBrowser(urlStr string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start"}
	case "darwin":
		cmd = "open"
	default:
		cmd = "xdg-open"
	}
	args = append(args, urlStr)
	return exec.Command(cmd, args...).Start()
}
