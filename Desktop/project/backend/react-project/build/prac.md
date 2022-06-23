# 프젝트 생성
- npx create-react-app 프로젝트명

# 데이터 바인딩
- x = '진병언'
- ```<div> {x}</div>```
- ```<div className ='[x]'></div>```
  

# html에 직접 스타일 넣기
- ```<div style={{스타일:'값'}}>```


# state : 변수대신 얘를 사용하는게 좋을 듯
- 이유: 변수가 변경될 때 자동으로 관련된 html을 재렌더링 되게 만들어줌 / 일반변수는 변경이 발생해도 재렌더링 해주지 않음
- 사용방법
1. 임포트 해줌
  - import React ,{useState} from 'react';
2. useState() 함수 사용
  - App() 함수 안/ 리턴 밖에서
  - let [x,y] = useState('가나다라마바사')

# useState() 함수
- 리턴값(?): array로 값 2개를 넘겨줌
- 그래서 구조 분해 할당 문으로 값을 받음
  - let [x,y] = useState('가나다라마바사')   
  - x: 변수에 실제 저장할 데이터
  - y: 저장할 데이터를 변경시 킬때 사용해야하는 함수


# useState() 함수 활용
- state에는 배열, 객체등 사용 가능
- let[title,titleChane] = useState(['profile','현지학기제','QnA']);
- title[0] , title[1] 이렇게 사용가능
- 
# useState() 값 변경해 주기
- ```let[x,x값변경]=useState(0);```
- ```<div onClick={ ()=>{x값변경(x+1)} }> {} </div>```
- 리스트에서 값변경 해줄때는 주의 해야 됨
- 기존 state == 신규state의 경우 변경 안함
  - 객체, 리스트에서 usestate사용할 때 주의 해야함
  - deep카피해서 사용하든가 해야함

# 컴포넌트 만드는 법
1. 함수만들기
2. return()안에 html 담기
3. <함수명/>
- 주의: 다름 함수 밖에서 짤 것 / 함수명은 대괄호가 좋음
- 단점
  - state 가져다 쓸때 문제가 있음
```js
    fuction 컴포넌트명(){
        return(
            <div>내용물</div>
        )
    }
```
```js
function App(){
    <컴포넌트명/>
}
```
# 동적 ui 만들기
1. html css 미리 디자인 완성
2. ui의 현재 상태를 state로 저장
3. state에 따라 ui가 어떻게 보일지 작성 (조건문 활용)

# 조건문 대용 삼항연산자
- jsx상에서 if문 사용 불가 
```
{
    조건식 ? 참일경우 : 거짓일경우
}
```

# 반복문 대용 map
```js
{
    리스트를가진스테이트.map(fuction(){
        return ~~~
    })
}

```
- 리스트 크기 만큼 반복
- map의 파라미터fuction(a,b)
  - a: 리스트의 값
  - b: index
- 반복문 돌릴 때 리턴되는 각 요소에 key ={index} 지정 해주기


# props
- app컴포넌트(부모)에서 사용하고 있는 변수를 nav컴포넌트(자식)에서도 사용 할 수 있도록 하기위해서 사용
- 사용방법
1. 부모 컴포넌트에서 자식 컴포넌트를 부를 때 변수를 같이 전송
```js
function App(){
    <Nav 변수명={state이름}/>
}
```
2. 자식 컴포넌트에서 매개변수로 받아서 사용
```js
fucntion Nav(props){
    return(
        <div>props.변수명</div>
    )
}
```
- 주의 : 컴포넌트가 많아 지면 프롭스 불편 할거임
- 프롭스로는 변수 뿐만아니라 함수도 가능함


------------------------------

# import / export
- import {name,nema2} from './fasdfdas';
- export{name,name2}

------------------------------

# router
- 페이지를 나누기 위해서 사용
- 라우터의 종류: 2가지 (hash vs browser)
- 설치: npm install react-router-dom@5
- 초기 세팅
  - index.js에서 import {BrowserRouter} from 'react-router-dom';
  - <BrowserRouter> 태그로 <App> 감싸 주기
- 사용 법
1. app.js에서 import {Link,Route,Switch} from 'react-router-dom';
2. 
   - ```<Route path='/경로'> html작성 </Route>```
   - ```<Route path='/경로' component={Nav}></Route>```
   - ```<Route exact path='/경로' component={Nav}></Route>```
- 컴포넌트가 많거나 길면 다른 파일로 저장해서 import export해서 사용가능 (모듈화)
1. src 폴더내에 Nav.js 파일 생성
2. Nav파일에 import React,{useState} from 'react'; 하기
3. Nav파일의 컴포넌트를 export하기
4. App.js에서 import Nav from './Nav.js' 해주기
5. ```<Route path='/경로'> <Nav/> </Route>```

# route - Link
- a태그 대신 ```<Link to="경로">aaa<Link>```

# route - switch
- 스위치로 라우트를 감싸면 여러개가 한번에 보여지는 일이 없음

# route - parameter 이용하기
- import {useParams} from 'react-router-dom'; 하기
- let {id} = useParams();
- ```<Route path='/경로/:id'> html작성 </Route>```

# useEffect/ lifecycle
- lifecycle 종류: mount- 장착/ update 업뎃/ unmount 제거
- lifecycle에 따라 간섭할 수 있음 -> hook 이라함(useEffect)
- import {useEffect} from 'react';
```js
useEffect(()=>{

})
```
- 두번 나옴 --> 배포할 때 하나로 될거임
- 사용하는 이유: 동작원리: useEffect 안에 있는 코드는 html렌더링 후에 동작
- 어려운 연산, 서버에서 데이터가져오는 작업, 타이머로 사용할때 많이 사용

# useffect 종류
```js
useEffect(()=>{
  return()={
    //코드들 // useEffect 동작전에 실행// clean up function이라고 함// ex 기존타이머 제거/ 마운트될때는 실행 x/ unmount일때는 실행됨
  }
},[])
//[] : 실행족건 넣을 수있는 곳 / depnendency/변수나 스테이트를 넣을 수 있음// 안에변수가 변할 때마다 실행 / []  빈것일때는 마운트 될때 1번만 실행
```