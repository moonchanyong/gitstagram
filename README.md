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
