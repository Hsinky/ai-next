# 蒋静数据看板

## 本地预览

```bash
go run jiangjing.go
```

启动后浏览器自动打开 http://localhost:8080

## 打包为 Windows exe

```bash
GOOS=windows GOARCH=amd64 go build -o jiangjing.exe jiangjing.go
```

生成的 `jiangjing.exe` 可直接在 Windows 双击运行。
