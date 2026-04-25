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
  rsvpScriptUrl: "YOUR_GOOGLE_APPS_SCRIPT_URL",

  // 4) Firebase project (Firestore in native mode).
  //    https://console.firebase.google.com/ > Project settings > 일반 > 내 앱 > SDK 설정
  //    Firestore rules can be public-read while you only collect text (see README).
  firebase: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
  },
  guestbookCollection: "guestbook",
  guestbookAdminPassword: "0000",
};
