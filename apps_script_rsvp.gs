/**
 * Google Apps Script — RSVP receiver for the mobile wedding invitation.
 *
 * Setup (one-time):
 *   1. Create a Google Sheet. Copy its URL.
 *   2. https://script.google.com → "새 프로젝트" → 이 파일 내용 그대로 붙여넣기.
 *   3. SHEET_ID 상수에 위 시트의 ID(URL의 /d/ 다음 토큰)를 넣어주세요.
 *   4. 첫 행은 자동으로 헤더가 입력됩니다 (timestamp, attend, side, name, phone, count, meal, message).
 *   5. 상단 메뉴 → "배포(Deploy)" → "새 배포" → 유형: "웹 앱"
 *      • 다음 사용자로 실행: 나
 *      • 액세스: 모든 사용자
 *      "배포"를 누르면 https://script.google.com/macros/s/AKfy.../exec 형태의 URL이 나옵니다.
 *   6. 그 URL을 config.js 의 rsvpScriptUrl 에 그대로 붙여넣고 페이지 새로고침.
 *
 * Front-end가 보내는 multipart FormData를 그대로 받아 시트의 다음 빈 행에 추가합니다.
 */
const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "RSVP";
const HEADERS = ["timestamp", "attend", "side", "name", "phone", "count", "meal", "message"];

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const params = e.parameter || {};
    const row = HEADERS.map((key) => {
      if (key === "timestamp") return new Date();
      return params[key] || "";
    });
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}
