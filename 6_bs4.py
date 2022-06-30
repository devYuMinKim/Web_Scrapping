import requests
from bs4 import BeautifulSoup   # 1. pip install beautifulsoup4 2. pip install lxml

url = "https://comic.naver.com/webtoon/weekday"
res = requests.get(url)
res.raise_for_status()  # 문제 생길 경우 프로그램 종료

soup = BeautifulSoup(res.text, "lxml")  # res.text로 가져온 문서를 lxml parser를 통해 BeautifulSoup 객체로 만듬

# print(soup.title)   # <title>네이버 웹툰 &gt; 요일별  웹툰 &gt; 전체웹툰</title>
# print(soup.title.get_text())    # 네이버 웹툰 > 요일별  웹툰 > 전체웹툰

# print(soup.a)   # soup 객체(가져온 html 문서)에서 처음으로 발견되는 a element 출력
# -> <a href="#menu" onclick="document.getElementById('menu').tabIndex=-1;document.getElementById('menu').focus();return false;"><span>메인 메뉴로 바로가기</span></a>

# print(soup.a.attrs) # a element 의 속성 정보를 출력
# -> {'href': '#menu', 'onclick': "document.getElementById('menu').tabIndex=-1;document.getElementById('menu').focus();return false;"}

# print(soup.a["href"])   # a element 의 href 속성 '값' 정보를 출력
# -> #menu

# --> 위 코드들은 우리가 사이트를 잘 알고 있을 때 사용 가능

# print(soup.find("a", attrs={"class":"Nbtn_upload"}))   # class="Nbtn_upload" 인 a element 를 찾아줘
# -> <a class="Nbtn_upload" href="/mypage/myActivity" onclick="nclk_v2(event,'olk.upload');">웹툰 올리기</a>

# print(soup.find(attrs={"class":"Nbtn_upload"})) # class="Nbtn_upload" 인 어떤 element 를 찾아줘. 해당 코드도 가능하나, 24번 코드의 경우가 정확도 up

# print(soup.find("li", attrs={"class":"rank01"}))
"""
-> 
<li class="rank01">
<a href="/webtoon/detail?titleId=570503&amp;no=413" onclick="nclk_v2(event,'rnk*p.cont','570503','1')" title="연애혁명-409. 워터파크에서 생긴 일 (4)  &lt;밀물&gt;">연애
혁명-409. 워터파크에서 생긴 일 (4)  &lt;밀물&gt;</a>
<span class="rankBox">
<img alt="변동없음" height="10" src="https://ssl.pstatic.net/static/comic/images/migration/common/arrow_no.gif" title="변동없음" width="7"/> 0


                                </span>
</li>
"""

# rank1 = soup.find("li", attrs={"class":"rank01"})
# print(rank1.a)  # a element 만 가져옴
"""
->
<a href="/webtoon/detail?titleId=570503&amp;no=413" onclick="nclk_v2(event,'rnk*p.cont','570503','1')" title="연애혁명-409. 워터파크에서 생긴 일 (4)  &lt;밀물&gt;">연애
혁명-409. 워터파크에서 생긴 일 (4)  &lt;밀물&gt;</a>
"""

# rank1 = soup.find("li", attrs={"class":"rank01"})
# print(rank1.a.get_text())

# rank2 = rank1.next_sibling.next_sibling # 다음다음 element 로
# rank3 = rank2.next_sibling.next_sibling
# print(rank3.a.get_text())
# -> 현실퀘스트-36화

# rank2 = rank3.previous_sibling.previous_sibling # 이전이전 element 로
# print(rank2.a.get_text())
# -> 독립일기-시즌2 77화 제주여행 3일차

# print(rank1.parent) # 부모로

# rank2 = rank1.find_next_sibling("li")   # li 에 해당하는 다음 sibling 으로 이동
# print(rank2.a.get_text())
# -> 독립일기-시즌2 77화 제주여행 3일차
# rank3 = rank2.find_next_sibling("li")
# print(rank3.a.get_text())
# -> 현실퀘스트-36화
# rank2 = rank3.find_previous_siblig("li")  # 이전 li 에 해당하는 sibling 으로 이동

# print(rank1.find_next_siblings("li"))  # rank1 을 기준으로 li 에 해당하는 모든 sibling 가져옴

# webtoon = soup.find("a", text="독립일기-시즌2 77화 제주여행 3일차") # text 에 해당하는 a 태그를 가져옴
# print(webtoon)
""" -> 
<a href="/webtoon/detail?titleId=748105&amp;no=180" onclick="nclk_v2(event,'rnk*p.cont','748105','2')" title="독립일기-시즌2 77화 제주여행 3일차">독립일기-시즌2 77화 제
주여행 3일차</a>
"""