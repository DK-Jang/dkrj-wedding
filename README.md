# Mobile Wedding RSVP

Local clone of the reference mobile wedding invitation, updated for 장덕경 and 엄령주.

## Run

```sh
python3 -m http.server 5173
```

Open:

```text
http://127.0.0.1:5173/index.html
```

## Edit Content

- Main text, names, date, venue, phone links, and account rows: `index.html`
- Cover, gallery, film strip, poster, and thumbnail images: `images/`
- Shared movie-style UI assets: `movie/images/`
- Layout and visual styling: `movie/css/movie.css`
- Countdown, tabs, ticket flip, gallery, copy, audio, and popup behavior: `movie/js/common.js`

The page is configured to keep working locally without the original Firebase, Kakao, and Naver SDKs. The map area falls back to a static local map-style panel if the Naver map SDK is not loaded.

Current wedding details:

- Date: 2026년 7월 4일 토요일 오후 1시 30분
- Venue: 약현성당
- Address: 서울 중구 청파로 447-1
