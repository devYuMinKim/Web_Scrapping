import requests

res = requests.get("http://google.com")
res.raise_for_status()  # 문제가 생겼을 때, error 발생시키고 프로그램 종료
# 4번 코드와 동일
"""
# print("응답코드 : ", res.status_code)   # 200이면 정상
print("응답코드 : ", res.status_code)   # 403인 경우에는 스크래핑 불가능 -> 다른 방법으로

if res.status_code == requests.codes.ok:    # requests.codes.ok == 200
    print("정상입니다")
else :
    print("문제가 생겼습니다. [에러코드 ", res.status_code, "]")

print("웹 스크래핑을 진행합니다")
"""
print(len(res.text))    # 페이지 텍스트 길이
print(res.text) # 페이지 텍스트

with open("mygoogle.html", "w", encoding="utf8") as f:  # w: 쓰기 모드
    f.write(res.text)