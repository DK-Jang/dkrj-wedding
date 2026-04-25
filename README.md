# Mobile Wedding RSVP

장덕경 ❤️ 엄령주 결혼식 모바일 청첩장. repocu.kr movie 템플릿 기반.

## Run

```sh
python3 -m http.server 5173
```

Open <http://127.0.0.1:5173/index.html>.

## Connect external services

모든 외부 키/URL은 `config.js` 한 곳에서 관리한다. 키 없이도 페이지는 정상 동작하고, 각 기능은 자동으로 fallback 된다.

### 1) Naver Maps — 실제 지도 표시

1. <https://console.ncloud.com/naver-service/application> → Application 등록 → Maps > Web Dynamic Map 활성화.
2. Web 서비스 URL에 `http://127.0.0.1:5173` 과 운영 도메인을 추가.
3. `config.js`의 `naverMapClientId`에 발급된 Client ID를 붙여넣기.
4. 키가 없으면 `약현성당` 텍스트 + 하트 아이콘 fallback 패널이 표시된다.

### 2) Kakao 공유 — 공유하기 버튼

1. <https://developers.kakao.com/console/app> → 내 애플리케이션 > 앱 키 > **JavaScript 키** 복사.
2. Platform > Web에 `http://127.0.0.1:5173` / 운영 도메인 등록.
3. `config.js`의 `kakaoJsKey`에 키를 붙여넣기. (별도 템플릿 ID 없이 `Kakao.Share.sendDefault` 사용)
4. 키가 없으면 공유 버튼은 자동으로 URL을 클립보드에 복사한다.

### 3) RSVP 폼 — Google Apps Script + Sheets

1. 새 Google Sheet 생성, URL에서 `/d/<SHEET_ID>/` 의 ID 복사.
2. <https://script.google.com> → 새 프로젝트 → `apps_script_rsvp.gs` 내용을 붙여넣고 `SHEET_ID` 교체.
3. **배포 > 새 배포 > 유형: 웹 앱**, "다음 사용자로 실행: 나", "액세스: 모든 사용자" 선택.
4. 발급된 Web app URL (`https://script.google.com/macros/s/AKfy.../exec`)을 `config.js`의 `rsvpScriptUrl`에 붙여넣기.
5. URL이 없으면 폼은 데모 모드로 동작 (제출 시 입력값을 alert로 보여준다).

### 4) 방명록 — Firebase Firestore

1. <https://console.firebase.google.com/> 새 프로젝트 → **Firestore Database** 생성 (네이티브 모드).
2. Firestore 보안 규칙 (테스트용, 제출만 허용 + 읽기 전체 허용):

   ```text
   rules_version = '2';
   service cloud.firestore {
     match /databases/{db}/documents {
       match /guestbook/{doc} {
         allow read: if true;
         allow create: if request.resource.data.keys().hasOnly(["nickname","content","password","date"]);
         allow delete: if true;  // 본인 비밀번호 검증은 클라이언트에서 수행
       }
     }
   }
   ```

3. **프로젝트 설정 > 일반 > 내 앱 > Firebase SDK** 의 config 객체를 복사해 `config.js`의 `firebase` 블록에 붙여넣기.
4. 컬렉션 이름은 `guestbookCollection` 키로, 관리자 비밀번호(전체 삭제용)는 `guestbookAdminPassword`로 조정.
5. config가 placeholder면 기본 5개 샘플 메시지가 swiper로 표시된다.

## Edit content

| 영역 | 파일 |
| --- | --- |
| 신랑·신부 이름, 일시, 장소, 인사말, 계좌, 캐스트 | `index.html` |
| 신랑·신부 사진, 갤러리, 필름, 썸네일 | `images/` |
| 영화 테마 그래픽 (타이틀 로고, 뱃지) | `movie/images/` |
| 색상·레이아웃 | `movie/css/movie.css` |
| 카운트다운, 탭, 티켓 플립, 갤러리, 오디오, 팝업 | `movie/js/common.js` |
| 외부 SDK 키/URL | `config.js` |
| RSVP Apps Script | `apps_script_rsvp.gs` |

## Wedding details (current)

- Date: 2026년 7월 4일 토요일 오후 1시 30분
- Venue: 약현성당
- Address: 서울 중구 청파로 447-1
