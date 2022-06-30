import requests
url = "https://nadocoding.tistory.com/"
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"}
res = requests.get(url, headers=headers)   # 나중에 수정, 200 나옴
res.raise_for_status()  # 문제가 생겼을 때, error 발생시키고 프로그램 종료
with open("nadocoding.html", "w", encoding="utf8") as f:  # w: 쓰기 모드
    f.write(res.text)