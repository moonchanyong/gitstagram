# gitstagram
2018_summer_internship_week2_making_SPA_using_githubAPI


## 구상

* 사용자 액션을 시작으로 DOM을 렌더링까지 연결 된 플로우로 작성한다.

* DOM을 렌더링 할때 virtual DOM을 사용하여 달라진 점만 렌더링 할 수있을지 확인(내가 할 수있는지 확인)하여 작성한다.

* 가능하면 커스텀 컴포넌트를 만들 수 있는지 확인한다.

* 리스트 클릭이벤트는 이벤트 위임 패턴

* input은 debounce

* 따로 요청을 보내지 않는다면 메모제이션이용

## 대략적인 구현순서

입력_서치바 => 리스트 렌더링 => 토글화면


## Trouble shooting

* import
  + 웹팩 안쓰고 import하고 있었다.
  + 우선 스크립트로 태그하고 어느정도 선이 그려지면 추후 웹팩환경으로 수정

* 고민중인것: css와 DOM Element의 추가삭제 무엇이 빠를까.
![rendering critical path](https://blog.asamaru.net/res/img/post/2017/05/understanding-the-critical-rendering-path.png)
  + display: none
    - 0.1767578125ms
    - 0.127197265625ms
    - 0.132080078125ms

  + Element 삭제
    - 0.331787109375ms
    - 0.3349609375ms
    - 0.337158203125ms

```javascript
// display: none
console.time()
$$('custom-item').forEach((item) => item.style = "display: none")
console.timeEnd()

// element.remove()
console.time()
$$('custom-item').forEach((item) => item.remove())
console.timeEnd()
```
- display: none은 renderer Tree에서 제거 되긴 하지만, DOM자체는 없어지지 않아서 더 빠른 것 같다. 그리고 개수가 최대개수가 10개로 한정 되어있어서 메모리에도 이슈가 없을 것 같아서 css로 숨기는것이 나을 것 같다.(hidden도 display none이랑 시간 측면에서는 차이가 얼마 없었다.)


* 사용자 이미지 비동기적 로드
  + 체감성능 향상을 위한 UI가 필요하다.
  + 선택지
    - placeholder image
    - loading icon

* before


![before](https://oss.navercorp.com/chanyong-moon/gitstagram/blob/master/assets/before.gif?raw=true)
