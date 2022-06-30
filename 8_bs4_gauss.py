import requests
from bs4 import BeautifulSoup   # 1. pip install beautifulsoup4 2. pip install lxml

url = "https://comic.naver.com/webtoon/list?titleId=675554"
res = requests.get(url)
res.raise_for_status()  # 문제 생길 경우 프로그램 종료

soup = BeautifulSoup(res.text, "lxml")  # res.text로 가져온 문서를 lxml parser를 통해 BeautifulSoup 객체로 만듬
# cartoons = soup.find_all("td", attrs={"class":"title"})
# title = cartoons[0].a.get_text()
# link = cartoons[0].a["href"]
# print(title)
# -> 후기 + 10년 후 가우스
# print("https://comic.naver.com" + link)
# link -> /webtoon/detail?titleId=675554&no=911&weekday=mon

# 만화 제목 + 링크 가져오기(10 ~ 15 활용)
# for cartoon in cartoons:
#     title = cartoon.a.get_text()
#     link = "https://comic.naver.com" + cartoon.a["href"]
#     print(title, link)
"""
->
후기 + 10년 후 가우스 https://comic.naver.com/webtoon/detail?titleId=675554&no=911&weekday=mon
시즌4 430화 내일 봐요 https://comic.naver.com/webtoon/detail?titleId=675554&no=910&weekday=mon 
시즌4 429화 잠행 https://comic.naver.com/webtoon/detail?titleId=675554&no=909&weekday=mon      
시즌4 428화 추억 https://comic.naver.com/webtoon/detail?titleId=675554&no=908&weekday=mon      
시즌4 427화 섬세한사람 https://comic.naver.com/webtoon/detail?titleId=675554&no=907&weekday=mon
시즌4 426화 적응 https://comic.naver.com/webtoon/detail?titleId=675554&no=906&weekday=mon      
시즌4 425화 대견 https://comic.naver.com/webtoon/detail?titleId=675554&no=905&weekday=mon      
시즌4 424화 초빙강사 https://comic.naver.com/webtoon/detail?titleId=675554&no=904&weekday=mon
시즌4 423화 추억의 물건 https://comic.naver.com/webtoon/detail?titleId=675554&no=903&weekday=mon
시즌4 422화 아니요 https://comic.naver.com/webtoon/detail?titleId=675554&no=902&weekday=mon
"""

# 평점 구하기
total_rates = 0
cartoons = soup.find_all("div", attrs={"class":"rating_type"})
for cartoon in cartoons:
    rate = cartoon.find("strong").get_text()
    print(rate)
    total_rates += float(rate)
print("전체 점수 : ", total_rates)
print("평균 점수 : ", total_rates / len(cartoons))
"""
->
9.98
9.98
9.97
9.97
9.97
9.98
9.97
9.97
9.97
9.97
전체 점수 :  99.72999999999999
평균 점수 :  9.972999999999999
"""