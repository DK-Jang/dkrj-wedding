//common
AOS.init({
  duration: 2000,
});
const $ = (selecter) => document.querySelector(selecter);

//Name
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-groom][data-bride]").forEach((root) => {
    const groom = root.dataset.groom;
    const bride = root.dataset.bride;

    document.querySelectorAll(".txt-groom").forEach((el) => {
      el.textContent = groom;
    });

    document.querySelectorAll(".txt-bride").forEach((el) => {
      el.textContent = bride;
    });
  });
});

//날짜 포멧
(function () {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function formatDateWithDay(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const day = DAYS[date.getDay()];

    let h = date.getHours();
    const min = String(date.getMinutes()).padStart(2, "0");
    const isPM = h >= 12;

    h = h % 12;
    h = h === 0 ? 12 : h;

    return `${y}. ${m}. ${d}. ${day}. ${h}:${min} ${isPM ? "PM" : "AM"}`;
  }

  function fillTxtDate() {
    const dataEl = document.querySelector("[data-target]");
    if (!dataEl) return;

    const targetStr = dataEl.dataset.target;
    if (!targetStr) return;

    const target = new Date(targetStr);
    if (isNaN(target.getTime())) return;

    const formatted = formatDateWithDay(target);

    document.querySelectorAll(".txt-date").forEach((el) => {
      el.textContent = formatted;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillTxtDate);
  } else {
    fillTxtDate();
  }
})();



//TopButton
function handleClickTop() {
  const topBtn = $(".wrap-top .btn-top");
  if (!topBtn) return;
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > window.innerHeight) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });
  topBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

//Audio
function audioPlay() {
  const contPlay = $(".cont-audio")
  const btnPlay = $(".btn-audio");
  const btnIco = $(".btn-audio .ico-sound");
  const audio = $("#bgm");
  if (!contPlay || !btnPlay || !btnIco || !audio) return;
  let lastScrollY = window.scrollY;
  document.addEventListener("DOMContentLoaded", function() {
    audio.muted = false;
    audio.play().catch(() => {
    });
  });
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      contPlay.style.display = 'none';
    } else {
      contPlay.style.display = 'block';
    }
    lastScrollY = currentScrollY;
    
    if (window.scrollY > 0) {
      contPlay.classList.add("scroll")
    } else {
      contPlay.classList.remove("scroll")
    }
  });
  btnPlay.addEventListener("click", function () {
    if (audio.muted) {
      audio.muted = false;
      audio.play();
      btnIco.classList.add("ico-muted")
    } else {
      audio.muted = true;
      audio.pause();
      btnIco.classList.remove("ico-muted")
    }
  })
}

//PhotoGallery
function galleryIcoAniWhenReady() {
  const observer = new MutationObserver((mutations, obs) => {
    const aniIco = document.querySelector(".pswp--open");
    if (aniIco) {
      const icoVideo = document.createElement("div");
      icoVideo.className = "ico-video";
      aniIco.appendChild(icoVideo);
      obs.disconnect(); // 더 이상 감시 안 함
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

//copy
function handleClickCopy() {
  const copyTexts = document.querySelectorAll(".txt-copy");
  if (!copyTexts || copyTexts.length === 0) return;

  copyTexts.forEach((copyText) => {
    copyText.addEventListener("click", function () {
      const text = this.innerText; // 또는 this.textContent
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert(`"${text}" 복사되었습니다!`);
        })
        .catch((err) => {
          console.error("복사 실패:", err);
          alert("복사에 실패했습니다.");
        });
    });
  });
}
function handleClickCopy2() {
  const copyTexts = document.querySelectorAll(".btn-copy");
  if (!copyTexts || copyTexts.length === 0) return;

  copyTexts.forEach((copyText) => {
    copyText.addEventListener("click", function () {
      const text = this.previousElementSibling.innerText; // 또는 this.textContent
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert(`"${text}" 복사되었습니다!`);
        })
        .catch((err) => {
          console.error("복사 실패:", err);
          alert("복사에 실패했습니다.");
        });
    });
  });
}

//map api
const mapAPI = function (latitude, longitude, customOptions = {}) {
  const mapEl = document.getElementById("map");
  if (!window.naver || !window.naver.maps) {
    if (mapEl) {
      mapEl.innerHTML = `
        <div class="fallback-map">
          <span class="fallback-marker"></span>
          <span class="fallback-place">약현성당</span>
        </div>
      `;
    }
    return;
  }
  var mapOptions = {
    center: new naver.maps.LatLng(latitude, longitude),
    zoom: 17,
    mapDataControl: false,
    mapTypeControl: false,
    scaleControl: false,
    ...customOptions
    // zoomControl: false
    // scrollWheel: false,
  };

  var map = new naver.maps.Map("map", mapOptions);
  var markerOptions = {
    position: new naver.maps.LatLng(latitude, longitude),
    map: map,
    icon: {
      url: 'movie/images/movie_marker.png',
      size: new naver.maps.Size(40, 38),
      scaledSize: new naver.maps.Size(40, 38),
      origin: new naver.maps.Point(0, 0),
    }
  };
  var marker = new naver.maps.Marker(markerOptions);
  naver.maps.Event.addListener(marker, "click", function (e) {
    map.setZoom(16);
    map.setCenter(new naver.maps.LatLng(latitude, longitude));
  });
};

function openNaverMapApp(query) {
  const clickedAt = +new Date();
  location.href = `nmap://search?query=${encodeURIComponent(query)}&appname=your.app.id`;
  setTimeout(function() {
    if (+new Date() - clickedAt < 2000) {
      location.href = `https://map.naver.com/v5/search/${encodeURIComponent(query)}`;
    }
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  const mapLink = document.getElementById("naverMapLink");
  mapLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (mapLink) {
      const placeName = mapLink.textContent.trim();
      openNaverMapApp(placeName);
    }
  });
});

//Tab
function accountTab() {
  document.querySelectorAll(".inner-tab").forEach((actBox) => {
    const tabButtons = actBox.querySelectorAll(".btn-tab");
    const tabBoxes = actBox.querySelectorAll(".tab-box");

    if (tabButtons.length === 0 || tabBoxes.length === 0) return;

    tabButtons.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        // 탭 버튼 스타일 처리
        tabButtons.forEach((b) => b.parentElement.classList.remove("active"));
        this.parentElement.classList.add("active");

        // 콘텐츠 영역 처리
        tabBoxes.forEach((box) => box.classList.remove("active"));
        tabBoxes[index].classList.add("active");
      });
    });

    // 기본으로 첫 번째 탭 표시
    tabButtons[0].parentElement.classList.add("active");
    tabBoxes[0].classList.add("active");
  });
}

//Accodion
function accordionFn() {
  document.querySelectorAll(".tit-acco").forEach((btn) => {
    btn.addEventListener("click", function () {
      const actBox = this.closest(".item-acco");
      if (actBox) {
        actBox.classList.toggle("active");
      }
    });
  });
}

// Account accordion (신랑측 / 신부측 expand/collapse)
function accountAccordion() {
  document.querySelectorAll(".cont-account .tab-accodian .btn-account").forEach((btn) => {
    btn.addEventListener("click", function () {
      const wrap = this.closest(".wrap-account");
      if (!wrap) return;
      const opening = !wrap.classList.contains("active");
      wrap.classList.toggle("active");
      this.setAttribute("aria-expanded", opening ? "true" : "false");
    });
  });
}

// 공유 이벤트 Share
function shareFn() {
  if (document.querySelector(".popup-share")) return;

  fetch("movie/partials/share.html")
    .then(res => res.text())
    .then(html => {
      // body에 share.html 주입
      document.body.insertAdjacentHTML("beforeend", html);

      // 초기화 함수 호출 (필요 시)
      if (typeof initGuestbookModules === "function") {
        initGuestbookModules();
      }

      // 주입된 뒤에 버튼 요소들 가져오기
      const shareBtn = document.querySelector(".list-sns .link-share");
      const popupShare = document.querySelector(".popup-share");
      const btnClose = document.querySelector(".popup-share .btn-close");

      if (!shareBtn || !popupShare || !btnClose) return;

      // 이벤트 바인딩
      shareBtn.addEventListener("click", () => {
        popupShare.classList.add("openModal");
        document.documentElement.style.overflow = 'hidden';
      });
      btnClose.addEventListener("click", () => {
        popupShare.classList.remove("openModal");
        document.documentElement.style.overflow = '';
      });
    })
    .catch(err => console.error("Share popup load error:", err));
}

function copyCurrentUrl() {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      alert('주소가 복사되었습니다!');
    })
    .catch(err => {
      alert('주소 복사에 실패했습니다.');
      console.error(err);
    });
}

// calendar
(function () {
  const pad2 = (n) => String(Math.max(0, n)).padStart(2, "0");

  function initWeddingTimer() {
    // 1️⃣ data 전용 div 찾기
    const dataEl = document.querySelector("[data-groom][data-bride][data-target]");
    if (!dataEl) return;

    const groom = dataEl.dataset.groom || "";
    const bride = dataEl.dataset.bride || "";
    const targetStr = dataEl.dataset.target;

    // 2️⃣ 렌더링 대상
    const root = document.getElementById("wedding-timer");
    if (!root) return;

    const countdownEl = root.querySelector(".countdown");
    const nameEl = root.querySelector(".inner-name");
    if (!countdownEl || !nameEl) return;

    // 3️⃣ countdown 구조 생성
    countdownEl.innerHTML = `
      <div class="card"><div class="num" data-part="d">00</div><div class="label">Days</div></div>
      <div class="dot">:</div>
      <div class="card"><div class="num" data-part="h">00</div><div class="label">Hours</div></div>
      <div class="dot">:</div>
      <div class="card"><div class="num" data-part="m">00</div><div class="label">Min</div></div>
      <div class="dot">:</div>
      <div class="card"><div class="num" data-part="s">00</div><div class="label">Sec</div></div>
    `;

    // 4️⃣ inner-name 구조 생성
    nameEl.innerHTML = `
      <span class="txt-groom">${groom}</span>
      <span class="ico-and"></span>
      <span class="txt-bride">${bride}</span>
      의 결혼식이 <span class="txt-num"></span>일 남았습니다.
    `;

    // 캐시
    const elD = countdownEl.querySelector('[data-part="d"]');
    const elH = countdownEl.querySelector('[data-part="h"]');
    const elM = countdownEl.querySelector('[data-part="m"]');
    const elS = countdownEl.querySelector('[data-part="s"]');
    const elTxtNum = nameEl.querySelector(".txt-num");

    const target = new Date(targetStr);
    if (isNaN(target.getTime())) return;

    function tick() {
      let diff = target.getTime() - Date.now();
      if (diff < 0) diff = 0;

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      elD.textContent = pad2(days);
      elH.textContent = pad2(hours);
      elM.textContent = pad2(mins);
      elS.textContent = pad2(secs);
      elTxtNum.textContent = days;
    }

    tick();
    const offset = 1000 - (Date.now() % 1000);
    setTimeout(() => {
      tick();
      setInterval(tick, 1000);
    }, offset);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWeddingTimer);
  } else {
    initWeddingTimer();
  }
})();



//참석여부
function rsvpFn(SCRIPT_URL) {
  const scriptURL = SCRIPT_URL;
  const popupRSVP = $(".popup-rsvp");
  const popupAttend = $(".popup-attend");
  const form = document.getElementById('rsvpForm');
  if (!popupRSVP || !popupAttend || !form) return;

  const close = document.querySelector('.popup-attend .btn-close');
  const submit = document.querySelector('.popup-attend .btn-submit');

  close.addEventListener('click', () => {
    popupAttend.classList.remove('openModal');
  });
  submit.addEventListener('click', () => {
    popupAttend.classList.remove('openModal');
    popupRSVP.classList.add('openModal');
  });

  const target =
    document.querySelector(".cont-calendar") ||
    document.querySelector(".cont-cast");

  if (target) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          popupAttend.classList.add("openModal");
          obs.disconnect();
        }
      });
    }, { threshold: 1 });
    observer.observe(target);
  }

  const submitButton = document.querySelector('.popup-rsvp .btn-submit');
  const hasRealUrl = scriptURL && scriptURL !== 'about:blank' && /^https?:/.test(scriptURL);
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!hasRealUrl) {
      alert('데모 모드: config.js의 rsvpScriptUrl을 등록하면 실제 전송됩니다.\n현재 입력값:\n' +
        Array.from(new FormData(form).entries()).map(([k,v]) => `${k}: ${v}`).join('\n'));
      return;
    }
    const original = submitButton.textContent;
    submitButton.textContent = '전송 중...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        alert("참석여부가 정상적으로 제출되었습니다!")
        form.reset();
        $(".popup-rsvp").classList.remove("openModal")
      })
      .catch(error => {
        alert("오류가 발생했습니다. 다시 시도해주세요.")
        console.error('Error!', error.message);
      })
      .finally(() => {
        submitButton.textContent = original;
      });
  });
  form.addEventListener('input', () => {
    if (form.checkValidity()) {
      submitButton.classList.add('active'); // 모든 입력 완료 시 클래스 추가
    } else {
      submitButton.classList.remove('active'); // 미완성 시 클래스 제거
    }
  });
  $(".popup-rsvp .btn-close").addEventListener("click", () =>
    popupRSVP.classList.remove("openModal")
  );
}

// GuestBook — Firebase init is handled in index.html using window.WEDDING_CONFIG.firebase.
// guestBook(collection) reads from window.db, which is set by index.html only when the
// Firebase SDK is loaded *and* a real config has been provided in config.js.
var db = window.db || null;

function guestWrite() {
  const inpForm = $("#guestbook-form");
  const popupGuest = $("#guestbook-popup");
  const btnWrite = $(".btn-write");
  const btnApply = $(".form-guestbook .btn-apply");
  const btnClose = $("#guestbook-popup .btn-close");
  if (!inpForm || !popupGuest || !btnWrite || !btnApply || !btnClose) return;
  const inputs = {
    nickname: $("#nickname"),
    content: $("#content"),
  };
  const counters = {
    nickname: inpForm.querySelector(".txt-nick"),
    content: inpForm.querySelector(".txt-cont"),
  };
  const updateUI = () => {
    const nickname = inputs.nickname.value.trim();
    const content = inputs.content.value.trim();

    counters.nickname.textContent = nickname.length;
    counters.content.textContent = content.length;

    const isFilled = nickname && content;
    btnApply.classList.toggle("active", isFilled);
  };
  inpForm.addEventListener("input", updateUI);
  btnWrite.addEventListener("click", () =>
    popupGuest.classList.add("openModal")
  );
  btnClose.addEventListener("click", () =>
    popupGuest.classList.remove("openModal")
  );
}

function galleryImg(imgCount, alwaysStartFromFirst = false) {
  function generateImageList(count) {
    return Array.from({ length: count }, (_, i) => `image${i + 1}.jpg`);
  }
  const imageList = generateImageList(imgCount);
  function getSlideHTML(i) {
    return `
      <div class="swiper-slide">
        <a href="images/${imageList[i - 1]}" data-pswp-index="${i - 1}">
          <span class="swiper-img" style="background-image: url(images/${imageList[i - 1]});"></span>
        </a>
      </div>
    `;
  }
  const wrapper = document.querySelector('#my-gallery .swiper-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  // 슬라이드 추가
  for (let i = 1; i <= imageList.length; i++) {
    wrapper.innerHTML += getSlideHTML(i);
  }
  // Swiper 인스턴스 재생성
  if (window.mySwiper) window.mySwiper.destroy(true, true);

  const letterGalleryOptions = {
    slidesPerView: "auto",
    loop: true,
    speed: 2000,
    centeredSlides: true,
    autoplay: false,
  };

  window.mySwiper = new Swiper(".swiper-gallery", letterGalleryOptions);
  (function setupGalleryAutoplayOnView() {
    const gallerySection = document.querySelector('.cont-gallery');
    if (!gallerySection || !window.mySwiper) return;

    // 이미 autoplay 중이면 다시 설정 안 함
    if (window.mySwiper.autoplay && window.mySwiper.autoplay.running) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (window.mySwiper.autoplay) {
                window.mySwiper.autoplay.start();
              } else {
                window.mySwiper.params.autoplay = {
                  delay: 2000,
                  disableOnInteraction: false,
                };
                window.mySwiper.autoplay.start();
              }
              obs.disconnect(); // 한 번만 실행
            }
          });
        },
        {
          root: null, 
          threshold: 0.2, 
        }
      );

      observer.observe(gallerySection);
    } else {
      // IntersectionObserver 미지원 브라우저는 즉시 시작
      if (!window.mySwiper.autoplay || !window.mySwiper.autoplay.running) {
        window.mySwiper.params.autoplay = {
          delay: 2000,
          disableOnInteraction: false,
        };
        window.mySwiper.autoplay.start();
      }
    }
  })();

  // PhotoSwipeLightbox 인스턴스 재생성 (dataSource로 이미지 배열 직접 지정)
  if (window.myLightbox) window.myLightbox.destroy();

  function createLightbox(gallerySelector, imageList) {
    return new PhotoSwipeLightbox({
      gallery: gallerySelector,
      pswpModule: PhotoSwipe,
      dataSource: imageList.map(filename => ({
        src: `images/${filename}`,
        msrc: `images/${filename}`,
        // width, height 필요시 추가
      }))
    });
  }
  
  function bindLightboxOpener(gallerySelector, lightboxInstance) {
    const galleryEl = document.querySelector(gallerySelector);
    if (!galleryEl) return;

    galleryEl.querySelectorAll('a').forEach((aTag, idx) => {
      aTag.addEventListener('click', function (e) {
        e.preventDefault();

        if (alwaysStartFromFirst) {
          // 옵션이 true면 항상 1번 이미지(인덱스 0)부터
          lightboxInstance.loadAndOpen(0);
        } else {
          // 기본: 클릭한 이미지 인덱스로 열기
          const pswpIndex = aTag.hasAttribute('data-pswp-index')
            ? parseInt(aTag.getAttribute('data-pswp-index'), 10)
            : idx;
          lightboxInstance.loadAndOpen(pswpIndex);
        }
      });
    });
  }
  
  // 기존 인스턴스 파괴
  if (window.myLightbox) window.myLightbox.destroy();
  
  // 새 인스턴스 생성 및 초기화
  window.myLightbox = createLightbox("#my-gallery", imageList);
  window.myLightbox.init();
  
  // 클릭 이벤트 바인딩
  bindLightboxOpener("#my-gallery", window.myLightbox);
}


//ticket
const ticketFn = () => {
  const ticket = document.querySelector(".box-ticket");
  ticket.addEventListener("click", function () {
    this.classList.toggle("fliped");
  });
};
ticketFn();

// Guestbook: writers store nickname/content only. Deletion is operator-only via Firestore Console
// (no client password to avoid plaintext credentials in public storage).
function guestBook(collection) {
  const db = window.db;
  if (!db) return;
  const form = $("#guestbook-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nickname = $("#nickname").value;
    const content = $("#content").value;
    const now = new Date();
    const date = `${now.getFullYear()}. ${
      now.getMonth() + 1
    }. ${now.getDate()}`;

    db.collection(collection)
      .add({ nickname, content, date })
      .then(() => {
        alert("방명록 전송 완료!");
        form.reset();
        document
          .getElementById("guestbook-popup")
          .classList.remove("openModal");
        loadGuestbook();
      })
      .catch(() => {
        alert("방명록 전송 실패");
      });
  });

  function loadGuestbook() {
    const messagesContainer = $("#guestbook-messages");
    messagesContainer.replaceChildren();

    db.collection(collection)
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          const empty = document.createElement("span");
          empty.className = "txt-empty";
          messagesContainer.appendChild(empty);
          return;
        }
        const messagesInner = document.createElement("div");
        messagesInner.classList.add("swiper-wrapper");
        messagesContainer.appendChild(messagesInner);

        snapshot.forEach((doc) => {
          const data = doc.data();
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide");

          const txtCont = document.createElement("strong");
          txtCont.className = "txt-cont";
          txtCont.textContent = data.content || "";

          const titName = document.createElement("span");
          titName.className = "tit-name";
          titName.textContent = data.nickname || "";

          const txtDate = document.createElement("span");
          txtDate.className = "txt-date";
          txtDate.textContent = data.date || "";

          slide.append(txtCont, titName, txtDate);
          messagesInner.appendChild(slide);
        });
        new Swiper("#guestbook-messages", {
          slidesPerView: "auto",
          loop: true,
          spaceBetween: 20,
          speed: 1000,
          centeredSlides: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
        });
      })
      .catch((error) => {
        console.error("Error loading messages: ", error);
      });
  }
  loadGuestbook();
}


galleryIcoAniWhenReady();
accountTab();
accountAccordion();
guestWrite();
audioPlay();
shareFn();
document.addEventListener("DOMContentLoaded", function () {
  handleClickTop();
  handleClickCopy();
  handleClickCopy2();
  accordionFn();
});
