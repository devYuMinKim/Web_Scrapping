import requests
from bs4 import BeautifulSoup   # 1. pip install beautifulsoup4 2. pip install lxml

url = "https://comic.naver.com/webtoon/weekday"
res = requests.get(url)
res.raise_for_status()  # 문제 생길 경우 프로그램 종료

soup = BeautifulSoup(res.text, "lxml")  # res.text로 가져온 문서를 lxml parser를 통해 BeautifulSoup 객체로 만듬

# 네이버 웹툰 전체 목록 가져오기
cartoons = soup.find_all("a", attrs={"class":"title"})  # 조건에 해당하는 모든 element 를 찾음
# class 속성이 title 인 모든 "a" element 를 반환
for cartoon in cartoons:
    print(cartoon.get_text())
    # -> 모든 웹툰명 출력 -> 참교육 신의 탑 ...

