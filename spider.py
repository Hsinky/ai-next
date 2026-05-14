# -*- coding: utf-8 -*-
import os
import requests
from bs4 import BeautifulSoup
import json

# ===== 改这里：你要爬的网页 =====
TARGET_URL = "https://nn205047mp34.vicp.fun/jiangjing"

# ===== 改这里：你要提取的内容（CSS选择器） =====
# 比如要取 class="title" 的文字，就写 ".title"
SELECTOR = ".font-mono"

# PushPlus 配置
PUSHPLUS_TOKEN = os.environ.get("PUSHPLUS_TOKEN")
PUSHPLUS_API = "http://www.pushplus.plus/send"


def scrape():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    resp = requests.get(TARGET_URL, headers=headers, timeout=15)
    resp.encoding = resp.apparent_encoding
    soup = BeautifulSoup(resp.text, "html.parser")

    # 按选择器提取内容
    elements = soup.select(SELECTOR)
    results = [el.get_text(strip=True) for el in elements[:5]]  # 取前5条

    return "\n".join(results) if results else "没抓到内容"


def push(content):
    if not PUSHPLUS_TOKEN:
        print("❌ 没设置 PUSHPLUS_TOKEN")
        return

    data = {
        "token": PUSHPLUS_TOKEN,
        "title": "📰 网页监控推送",
        "content": content,
        "template": "markdown"
    }
    resp = requests.post(PUSHPLUS_API, json=data, timeout=10)
    print(resp.json())


if __name__ == "__main__":
    content = scrape()
    print("抓到的内容：", content)
    push(content)
