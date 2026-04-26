// Wedding invitation runtime config.
// Replace placeholder values with your own credentials and reload the page.
// Each block also has a usage hint at the top.
window.WEDDING_CONFIG = {
  // 1) Naver Cloud Platform > Application > Maps > Web Dynamic Map
  //    https://console.ncloud.com/naver-service/application
  //    Add http://127.0.0.1:5173 (and your prod domain) to the allowed Web Service URLs.
  naverMapClientId: "30nwdr9v30",

  // 2) Kakao Developers > 내 애플리케이션 > 앱 키 > JavaScript 키
  //    https://developers.kakao.com/console/app
  //    Plus: Platform > Web에 도메인 등록 (http://127.0.0.1:5173 / 본인 도메인).
  kakaoJsKey: "b558478d0be978478905744cfc72f8c5",

  // 3) Google Apps Script Web App URL for RSVP submissions.
  //    Deploy the script in apps_script_rsvp.gs (see README) as "Web app", access = Anyone.
  //    Paste the resulting "Web app URL" (https://script.google.com/macros/s/AKfy.../exec).
  rsvpScriptUrl: "https://script.google.com/macros/s/AKfycbwsj7fxOnvfjfH9VbAJhSDKgyA9MselrdvHLVKHYT7YAP7qsl4CRuhoijS-A7cW1Yb8xQ/exec",

  // 4) Firebase project (Firestore in native mode).
  //    https://console.firebase.google.com/ > Project settings > 일반 > 내 앱 > SDK 설정
  //    Firestore rules can be public-read while you only collect text (see README).
  firebase: {
    apiKey: "AIzaSyBs3SDrDeqWycGlackNooBmpOrIuFRM0Nw",
    authDomain: "dkrj-wedding.firebaseapp.com",
    projectId: "dkrj-wedding",
    storageBucket: "dkrj-wedding.firebasestorage.app",
    messagingSenderId: "50367259286",
    appId: "1:50367259286:web:859e4ba0a6c3d3ba2a98b7",
  },
  guestbookCollection: "guestbook",
  // Guestbook entries are operator-deleted only (Firebase Console).
  // No client-side admin password — keeping secrets out of the public bundle.

  // 5) KakaoPay 송금링크 (선택)
  //    카카오페이 앱 > 송금 > 받기 > "송금받기 링크 공유" 에서 생성된 URL 을 그대로 붙여넣기.
  //    형식 예: "https://qr.kakaopay.com/Ej8xxxxxxxxx" 또는 "https://link.kakaopay.com/_xxxxxxxx".
  //    값이 비어있으면 pay 버튼은 안내 alert 로 fallback 됩니다.
  kakaoPayLinks: {
    groom: "https://qr.kakaopay.com/Ej7nkavi0",
    bride: "https://qr.kakaopay.com/Ej7qS12QD",
  },
};
