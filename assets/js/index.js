// ❗ json 데이터 불러오는 부분

// ** .sc-news .swiper 데이터 불러오기
fetch('./assets/data/news_slides.json')
.then(response => response.json())
.then(data => {
  const swiperWrapper = document.getElementById('news-swiper');

  // JSON 데이터를 바탕으로 슬라이드 생성
  data.forEach(slide => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

  // 슬라이드 내부에 들어갈 HTML 구성
  slideElement.innerHTML = `
    <a href="${slide.link}" title="새창" class="news-link">
      <div class="thumb">
        <img src="${slide.image}" alt class="news-img">
      </div>
      <div class="text-wrap">
        <strong class="title">${slide.title}</strong>
        <p class="date">${slide.date}</p>
      </div>
    </a>
  `;

    // 생성된 슬라이드를 swiper-wrapper에 추가
    swiperWrapper.appendChild(slideElement);
  });
  

  const newsSwiper = new Swiper('.sc-news .swiper', {
    loop: true,
    slidesPerView: 1,
    speed: 1500,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: false,
    },
    pagination: {
      el: '.sc-news .swiper .swiper-pagination',
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
                '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y: {
      prevSlideMessage: '이전 보기',
      nextSlideMessage: '다음 보기',
    },
    breakpoints: {
      1100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      360: {
        slidesPerView: 2,
      }
    },
    on: {
      init: function () {
        updateSlideAccessibility(this); // 초기화 시 설정
      },
      slideChange: function () {
        setTimeout(() => {
          if (!this.allowSlideNext && !this.allowSlidePrev) {
            this.slideTo(this.realIndex, 0, false);
          }
          updateSlideAccessibility(this);
        }, 0); // 0ms 지연으로 이벤트 루프에서 실행
      },
      slideChangeTransitionEnd: function () {
        updateSlideAccessibility(this); // 슬라이드 변경 시 업데이트
      },
    }
  });
  // 재생버튼
  let isPlaying = true;
  $('.sc-news .swiper .swiper-button-play').on('click keydown', function(e) {
    if (e.key === 'Enter' || e.which === 13 || e.type === "click") {

      if (isPlaying) {
        newsSwiper.autoplay.stop();
        $(this).addClass('paused');
        $(this).children('span').text('정지');
      } else {
        newsSwiper.autoplay.start();
        $(this).removeClass('paused');
        $(this).children('span').text('재생');
      }
      isPlaying = !isPlaying;
    }
  });

  
})
.catch(error => console.error('Error loading JSON data:', error));

// ** .sc-notice swiper 데이터 불러오기
fetch('./assets/data/notice_slides.json')
.then(response => response.json())
.then(data => {
  const swiperWrapper = document.getElementById('notice-swiper');

  data.forEach(slide => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    slideElement.innerHTML = `
      <a href="${slide.link}" title="새창" class="notice-link">
        <img src="${slide.image}" alt="${slide.title}" class="notice-img">
      </a>
    `;

    swiperWrapper.appendChild(slideElement);
  });

  const noticeSwiper = new Swiper('.sc-notice .swiper', {
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    autoplay: {
      delay: 4000,
    },
    speed: 1500,
    pagination: {
      el: '.sc-notice .swiper .swiper-pagination',
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
                '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y: {
      prevSlideMessage: '이전 보기',
      nextSlideMessage: '다음 보기',
      slideLabelMessage: '',
    },
    breakpoints: {
      360: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      767: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1100: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    on: {
      init: function () {
        updateSlideAccessibility(this);
      },
      slideChange: function () {
        setTimeout(() => {
          if (!this.allowSlideNext && !this.allowSlidePrev) {
            this.slideTo(this.realIndex, 0, false);
          }
          updateSlideAccessibility(this);
        }, 0)
      },
      slideChangeTransitionEnd: function () {
        updateSlideAccessibility(this);
      },
    }
  });
  // 재생버튼
  let isPlaying = true;
  $('.sc-notice .swiper .swiper-button-play').on('click', function(e) {
    if (e.key === 'Enter' || e.which === 13 || e.type === "click") {

      if (isPlaying) {
        noticeSwiper.autoplay.stop();
        $(this).addClass('paused');
        $(this).children('span').text('정지');
      } else {
        noticeSwiper.autoplay.start();
        $(this).removeClass('paused');
        $(this).children('span').text('재생');
      }
      isPlaying = !isPlaying;
    }
  });

  document.querySelectorAll('.swiper-slide a').forEach(link => {
    const img = link.querySelector('img');  
    if (img && img.alt) {
      link.setAttribute('aria-label', img.alt); // a 태그에 img의 alt 적용 스크린리더에서 읽히게
    }
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// notice 모달 팝업
document.addEventListener("DOMContentLoaded", async () => {
  const modalCt = document.querySelector(".sc-notice .modal .content-list");
  const jsonURL = "../assets/data/notice_slides.json";

  try {
    const response = await fetch(jsonURL);
    if (!response.ok) throw new Error("알림존 modal: 데이터를 가져오는데 실패했습니다.");
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) throw new Error("알림존 modal: 유효한 데이터가 없습니다.");

    modalCt.innerHTML = data.map(item => `
      <li class="content-item">
        <a href="${item.link}" class="notice-link" title="새창">
          <img src="${item.image}" alt="${item.title}">
        </a>
      </li>
    `).join("");

    document.querySelectorAll('.sc-notice .modal .content-list .notice-link').forEach(link => {
      const img = link.querySelector('img');  
      if (img && img.alt) {
        link.setAttribute('aria-label', img.alt);
      }
    });
  } catch (error) {
    console.error("🚨 오류 발생:", error.message);
    modalCt.innerHTML = "<p>슬라이드를 불러올 수 없습니다.</p>";
  }
});

// ** 대구는 지금 공지사항 데이터 불러오기
fetch('./assets/data/now_notice_slides.json')
.then(response => response.json())
.then(data => {
  const swiperWrapper = document.getElementById('now-notice-swiper');

  data.forEach(slide => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    slideElement.innerHTML = `
      <a href="${slide.link}" class="now-link">
        <div class="top-wrap">
          <span class="dept">${slide.department}</span>
          <span class="date">${slide.date}</span>
        </div>
        <strong class="title">${slide.title}</strong>
        <p class="desc">${slide.content}</p>
        <span class="go">바로가기</span>
      </a>
    `;

    swiperWrapper.appendChild(slideElement);
  });

  const nowNoticeSwiper = new Swiper('.sc-now .now-notice-swiper-wrap .swiper', {
    loop: false,
    slidesPerView: 4,
    autoplay: {
      delay: 4000,
    },
    speed: 1500,
    keyboard: {
      enabled: false,
    },
    navigation: {
      nextEl: '.sc-now .now-notice-swiper-area .swiper-button-next',
      prevEl: '.sc-now .now-notice-swiper-area .swiper-button-prev',
    },
    a11y: {
      prevSlideMessage: '이전 보기',
      nextSlideMessage: '다음 보기',
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
    on: {
      init: function () {
        updateSlideAccessibility(this);
      },
      slideChange: function () {
        setTimeout(() => {
          if (!this.allowSlideNext && !this.allowSlidePrev) {
            this.slideTo(this.realIndex, 0, false);
          }
          updateSlideAccessibility(this);
        }, 0);
      },
      slideChangeTransitionEnd: function () {
        updateSlideAccessibility(this);
      },
    }
  });

  // nowNoticeSwiper.on('slideChange', function () {
  //   document.querySelectorAll('.swiper-slide[aria-hidden="true"] a').forEach(link => {
  //       link.setAttribute('tabindex', '-1'); // 비활성화된 슬라이드 내 링크 비활성화
  //   });
  // });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** 대구는 지금 시험공지 데이터 불러오기
fetch('./assets/data/now_test_slides.json')
.then(response => response.json())
.then(data => {
  const swiperWrapper = document.getElementById('now-test-swiper');

  data.forEach(slide => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    slideElement.innerHTML = `
      <a href="${slide.link}" class="now-link">
        <div class="top-wrap">
          <span class="dept">${slide.department}</span>
          <span class="date">${slide.date}</span>
        </div>
        <strong class="title">${slide.title}</strong>
        <p class="desc">${slide.content}</p>
        <span class="go">바로가기</span>
      </a>
    `;

    swiperWrapper.appendChild(slideElement);
  });

  const nowTestSwiper = new Swiper('.sc-now .now-test-swiper-wrap .swiper', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    speed: 1500,
    navigation: {
      nextEl: '.sc-now .now-test-swiper-area .swiper-button-next',
      prevEl: '.sc-now .now-test-swiper-area .swiper-button-prev',
    },
    a11y: {
      prevSlideMessage: '이전 보기',
      nextSlideMessage: '다음 보기',
    },
    on: {
      init: function () {
        updateSlideAccessibility(this);
      },
      slideChange: function () {
        setTimeout(() => {
          if (!this.allowSlideNext && !this.allowSlidePrev) {
            this.slideTo(this.realIndex, 0, false);
          }
          updateSlideAccessibility(this);
        }, 0);
      },
      slideChangeTransitionEnd: function () {
        updateSlideAccessibility(this);
      },
    }
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** 대구는 지금 공지사항 모바일 리스트 불러오기
fetch('./assets/data/now_notice_slides.json')
.then(response => response.json())
.then(data => {
  // 데이터를 4개만 선택
  const limitedData = data.slice(0, 4); // 데이터의 상위 4개를 선택

 
  const ulEl = document.getElementById('notice-tab-m');

  limitedData.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('now-m-item');

    li.innerHTML = `
      <a href="${item.link}" class="now-m-link">
        <span class="title">${item.title}</span>
        <span class="date">${item.date}</span>
      </a>
    `;

    ulEl.appendChild(li);
  });
})
.catch(error => {
  console.error('데이터 가져오기 실패:', error);
});

// ** 대구는 지금 시험 모바일 리스트 불러오기
fetch('./assets/data/now_test_slides.json')
.then(response => response.json())
.then(data => {
  // 데이터를 4개만 선택
  const limitedData = data.slice(0, 4); // 데이터의 상위 4개를 선택

 
  const ulEl = document.getElementById('test-tab-m');

  limitedData.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('now-m-item');

    li.innerHTML = `
      <a href="${item.link}" class="now-m-link">
        <span class="title">${item.title}</span>
        <span class="date">${item.date}</span>
      </a>
    `;

    ulEl.appendChild(li);
  });
})
.catch(error => {
  console.error('데이터 가져오기 실패:', error);
});

// ** .sc-service swiper (대구시 운영 서비스) 데이터 불러오기
document.addEventListener("DOMContentLoaded", async () => {
  const swiperWrapper = document.querySelector(".sc-service .swiper-wrapper");
  const jsonURL = "./assets/data/service.json";

  try {
    // 🔹 JSON 데이터 불러오기
    const response = await fetch(jsonURL);
    if (!response.ok) throw new Error("대구시 운영서비스: 데이터를 가져오는데 실패했습니다.");
    const data = await response.json();

    // 🔹 데이터가 올바르게 들어왔는지 확인
    if (!Array.isArray(data) || data.length === 0) throw new Error("대구시 운영서비스: 유효한 데이터가 없습니다.");

    // 🔹 JSON 데이터로 슬라이드 생성
    swiperWrapper.innerHTML = data.map(item => `
      <div class="swiper-slide">
        <a href="${item.link}" class="service-link" title=""새창>
          <div class="img-wrap">
            <img src="${item.src}" alt>
          </div>
          <span class="title">${item.title}</span>
        </a>
      </div>
    `).join("");

    // 🔹 Swiper 초기화
    const serviceSwiper = new Swiper(".sc-service .swiper", {
      loop: false,
      slidesPerView: 4,
      spaceBetween: 10,
      grid: {
        rows: 2,
        fill: "row"
      },
      autoplay: {
        delay: 3000,
      },
      speed: 1000,
      keyboard: { enabled: true },
      navigation: {
        nextEl: ".sc-service .nav .swiper-button-next",
        prevEl: ".sc-service .nav .swiper-button-prev"
      },
      a11y: {
        prevSlideMessage: '이전 보기',
        nextSlideMessage: '다음 보기',
      },
      breakpoints: {
        767: {
          slidesPerView: 6,
          spaceBetween: 16,
          grid: {
            rows: 1,
          },
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 28,
          grid: {
            rows: 2,
          }
        }
      },
      on: {
        init: function () {
          updateSlideAccessibility(this); // 초기화 시 설정
        },
        slideChange: function () {
          setTimeout(() => {
            if (!this.allowSlideNext && !this.allowSlidePrev) {
              this.slideTo(this.realIndex, 0, false);
            }
            updateSlideAccessibility(this);
          }, 0); // 0ms 지연으로 이벤트 루프에서 실행
        },
        slideChangeTransitionEnd: function () {
          updateSlideAccessibility(this); // 슬라이드 변경 시 업데이트
        },
      }
    });

    let isPlaying = true;
    $('.sc-service .swiper-button-play').on('click keydown', function(e) {
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") {
        return;
      }

      if (isPlaying) {
        serviceSwiper.autoplay.stop();
        $(this).addClass('paused');
        $(this).children('span').text('정지');
      } else {
        serviceSwiper.autoplay.start();
        $(this).removeClass('paused');
        $(this).children('span').text('재생');
      }
      isPlaying = !isPlaying;
    });
  } catch (error) {
    console.error("🚨 오류 발생:", error.message);
    swiperWrapper.innerHTML = "<p>슬라이드를 불러올 수 없습니다.</p>"; // 오류 발생 시 안내 메시지
  }
});


document.addEventListener("DOMContentLoaded", async () => {
  const modalCt = document.querySelector(".sc-service .modal .content-list");
  const jsonURL = "../assets/data/service.json";

  try {
    const response = await fetch(jsonURL);
    if (!response.ok) throw new Error("대구시 운영서비스: 데이터를 가져오는데 실패했습니다.");
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) throw new Error("대구시 운영서비스: 유효한 데이터가 없습니다.");

    modalCt.innerHTML = data.map(item => `
      <li class="content-item">
        <a href="${item.link}" class="service-link" title="새창">
          <div class="img-wrap">
            <img src="${item.src}" alt="${item.title}">
          </div>
          <span class="title">${item.title}</span>
        </a>
      </li>
    `).join("");


  } catch (error) {
    console.error("🚨 오류 발생:", error.message);
    modalCt.innerHTML = "<p>슬라이드를 불러올 수 없습니다.</p>";
  }
});
// ** 데이터 불러오는 영역 끝 **


// 분기점 설정
const pcMediaQuery = window.matchMedia('(min-width: 768px)');
const mMediaQuery = window.matchMedia('(max-width: 767px)');


// ❗ header 영역 **
// gnb
$('#header #gnb').on('mouseenter focusin', function() {
  $('#header').addClass('on');
}).on('mouseleave focusout', function() {
  $('#header').removeClass('on');
});
// select
$('#header .util-area .btn-select').on('mousedown', function(e) {
  e.stopPropagation();
  $(this).siblings().toggleClass('on').parent().siblings().find('.select-list').removeClass('on');
})
$('#header .util-area .btn-select').on('keydown', function(e) { 
  if (e.key === 'Enter' || e.which === 13) {
    $(this).siblings().addClass('on').parent().siblings().find('.select-list').removeClass('on');
  }
});
$('#header .util-area .select-list').on('focusout', function(e) {
  if (!$(this).has(e.relatedTarget).length) {
    $(this).removeClass('on');
  }
})
$(document).on('click', function(e) {
  if (!$(e.target).closest('#header .util-area .btn-select').length) {
    $('#header .util-area .select-list').removeClass('on');
  }
});

// 모바일 검색 부분
$('#header .util-area .search-wrap .btn-search').on('click', function() {
  $(this).parent().addClass('on');
  $('#header .search-field').addClass('on');
})
$('#header .util-area .search-wrap .btn-close').on('click', function() {
  $(this).parent().removeClass('on');
  $('#header .search-field').removeClass('on');
})


// 모바일 gnb
// 모바일 메뉴 열기
$('#header .all-menu-link').on('click', function(e) {
  e.preventDefault();
  console.log('눌림')
  if (mMediaQuery.matches) {
    $('body').css({ 'overflow': 'hidden' });
    $('#header .m-gnb-wrap').addClass('on');
    console.log('눌리리리리릴ㅁ')
  }
});
// 모바일 메뉴 닫기
$('#header .m-gnb-wrap .m-gnb-top .btn-close').on('click', function(e) {
  e.preventDefault();

  $('body').css({'overflow':'visible'});
  $('#header .m-gnb-wrap').removeClass('on');
})

// gnb 탭 매뉴
$('#header .m-gnb-wrap .m-gnb-item').on('click', function(e) {
  e.preventDefault();

  $(this).addClass('active').siblings().removeClass('active');
  $(this).children('.depth-wrap').addClass('active').parent().siblings().children('.depth-wrap').removeClass('active');
})
// m-depth03 열기
$('#header .m-gnb-wrap .m-depth02-item').on('click', function(e) {
  e.preventDefault();

  $(this).toggleClass('active').siblings().removeClass('active');
  $(this).children('.m-depth03-list').toggleClass('active').parent().siblings().children('.m-depth03-list').removeClass('active');
})
// m-depth04 열기
$('#header .m-gnb-wrap .m-depth03-link').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $(this).toggleClass('active').siblings().toggleClass('active').parent().siblings().children().removeClass('active');
})
// m-depth05 열기
$('#header .m-gnb-wrap .m-depth04 > li > a').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $(this).toggleClass('active').siblings().toggleClass('active').parent().siblings().children().removeClass('active');
})
// m-depth06 열기
$('#header .m-gnb-wrap .m-depth05 > li > a').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $(this).toggleClass('active').siblings().toggleClass('active').parent().siblings().children().removeClass('active');
})


// ** header 영역 끝 **


// ** .sc-guide 영역 **
// spot-swiper 컨트롤
const spotSwiper = new Swiper('.sc-guide .spot-swiper .swiper', {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 5000,
  },
  keyboard: { enabled: true },
  pagination: {
    el: '.sc-guide .spot-swiper .swiper-pagination',
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' +
              '<span class="' + totalClass + '"></span>';
    }
  },
  navigation: {
    nextEl: '.sc-guide .spot-swiper .swiper-button-next',
    prevEl: '.sc-guide .spot-swiper .swiper-button-prev',
  },
  a11y: {
    prevSlideMessage: '이전 보기',
    nextSlideMessage: '다음 보기',
  },
  on: {
    init: function () {
      updateSlideAccessibility(this);
    },
    slideChange: function () {
      setTimeout(() => {
        if (!this.allowSlideNext && !this.allowSlidePrev) {
          this.slideTo(this.realIndex, 0, false);
        }
        updateSlideAccessibility(this);
      }, 0); 
    },
    slideChangeTransitionEnd: function () {
      updateSlideAccessibility(this);
    },
  }
});
// 재생버튼
let spotIsPlaying = true;
$('.sc-guide .spot-swiper .swiper-button-play').on('click keydown', function(e) {
  if (e.key === 'Enter' || e.which === 13 || e.type === "click") {

    if (spotIsPlaying) {
      spotSwiper.autoplay.stop();
      $(this).addClass('paused');
      $(this).children('span').text('정지');
    } else {
      spotSwiper.autoplay.start();
      $(this).removeClass('paused');
      $(this).children('span').text('재생');
    }
    spotIsPlaying = !spotIsPlaying;
  }
  
});


$('.sc-guide .search-area .weather-wrap .weather-link').on('focusin', function() {
  $(this).children('.tooltip').addClass('on');
})
$('.sc-guide .search-area .weather-wrap .weather-link').on('focusout', function() {
  $(this).children('.tooltip').removeClass('on');
})

// .weather-swiper 컨트롤
const weatherDetailSwiper = new Swiper('.sc-guide .weather-detail-box .swiper', {
  loop: true,
  direction: "vertical",
  autoplay: {
    delay: 2500,
  },
});

// 날씨 select-list
$('.sc-guide .weather-wrap .btn-select').on('mousedown', function() {
  $(this).siblings().toggleClass('on');
})
// enter 키 눌렀을 때 on 클래스 적용
$('.sc-guide .weather-wrap .btn-select').on('keydown', function(e) { 
  if (e.key === 'Enter' || e.which === 13) {
    $(this).siblings().addClass('on');
  }
});
// focusout 시 on 클래스 제거
$('.sc-guide .weather-wrap .select-weather').on('focusout', function (e) {
  // 포커스가 ul 내부의 다른 요소로 이동한 경우를 제외
  if (!$(this).has(e.relatedTarget).length) {
    $(this).removeClass('on');
  }
});

$(document).on('click', function(e) {
  if (!$(e.target).closest('.sc-guide .weather-wrap .btn-select').length) {
    $('.sc-guide .weather-wrap .select-list').removeClass('on');
  }
});
// ** .sc-guide 영역 끝 **


// ** .sc-notice 영역 **
$('.sc-notice .group-content .nav .more-link').on('click keydown', function(e) {
  if (e.key === 'Enter' || e.witch === 13 || e.type === 'click') {
    e.preventDefault();
    $('body').css({'overflow':'hidden'});
    $('.sc-notice .modal').addClass('on');
    setTimeout(() => {
      $('.sc-notice .modal').attr('tabindex', '-1').focus();
    }, 100); // 약간의 딜레이를 주면서 더 안정적으로 작동되게
  }
})
$('.sc-notice .modal .btn-close').on('click', function() {
  $('body').css({'overflow':'visible'});
  $('.sc-notice .modal').removeClass('on');
  // 원래 위치로 포커스 이동
  $('.sc-notice .group-content .nav .more-link').focus();
})
// ** .sc-notice 영역 끝 **


// ** .sc-quick-tab 영역 **
// .sc-quick-tab 탭메뉴
$('.sc-quick-tab .tab-list .tab-item').on('click keydown', function (e) {
  if (e.type === 'click' || (e.type === 'keydown' && (e.key === 'Enter' || e.which === 13))) {
    e.preventDefault();

    const tabName = $(this).children().data('tab');

    $(this).addClass('on').siblings().removeClass('on');
    $('#' + tabName).addClass('on').siblings().removeClass('on');
  }

  // title 속성 업데이트
  $('.tab-link').attr('title', '비활성'); // 모든 링크의 title을 '비활성'으로 변경
  $(this).find('.tab-link').attr('title', '활성');
});
// ** .sc-quick-tab 영역 끝 **


// ** .sc-now 대구는 지금 영역 **
// 탭메뉴
$('.sc-now .group-tab .tab-list .tab-item').on('click keydown', function(e) {
  if (e.type === 'click' || (e.type === 'keydown' && (e.key === 'Enter' || e.which === 13))) {
    e.preventDefault();

    tabName = $(this).children().data('tab');
    mTabName = $(this).children().data('mo');

    if (pcMediaQuery.matches) {
      $(this).addClass('active').siblings().removeClass('active');
      $('#'+tabName).addClass('active').siblings().removeClass('active');
    }
  
    if (mMediaQuery.matches) {
      $(this).addClass('active').siblings().removeClass('active');
      $('#'+mTabName).addClass('active').siblings().removeClass('active');
    }
  }
})
// ** .sc-now 대구는 지금 영역 끝 **



// ** .sc-blog 영역 **
// 블로그 swiper
const blogSwiper = new Swiper('.sc-sns .swiper', {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 2500,
  },
  speed: 500,
  pagination: {
    el: '.sc-sns .swiper-pagination',
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' +
              '<span class="' + totalClass + '"></span>';
    }
  },
  navigation: {
    nextEl: '.sc-sns .swiper-button-next',
    prevEl: '.sc-sns .swiper-button-prev',
  },
  a11y: {
    prevSlideMessage: '이전 보기',
    nextSlideMessage: '다음 보기',
  },
  on: {
    init: function () {
      updateSlideAccessibility(this);
    },
    slideChange: function () {
      setTimeout(() => {
        if (!this.allowSlideNext && !this.allowSlidePrev) {
          this.slideTo(this.realIndex, 0, false);
        }
        updateSlideAccessibility(this);
      }, 0);
    },
    slideChangeTransitionEnd: function () {
      updateSlideAccessibility(this);
    },
  }
});
// 재생버튼
let blogIsPlaying = true;
$('.sc-sns .swiper .swiper-button-play').on('click keydown', function(e) {
  if (e.key === 'Enter' || e.witch === 13 || e.type === 'click') {
    e.preventDefault();

    if (blogIsPlaying) {
      blogSwiper.autoplay.stop();
      $(this).addClass('paused');
      $(this).children('span').text('정지')
    } else {
      blogSwiper.autoplay.start();
      $(this).removeClass('paused');
      $(this).children('span').text('재생')
    }
    blogIsPlaying = !blogIsPlaying;
  }
});
// ** .sc-blog 영역 끝 **


// ** .sc-service 영역 **
$('.sc-service .nav .button-open').on('click keydown', function(e) {
  if (e.key === 'Enter' || e.witch === 13 || e.type === 'click') {
    e.preventDefault();
    $('body').css({'overflow':'hidden'});
    $('.sc-service .modal').addClass('on');
    setTimeout(() => {
      $('.sc-service .modal').attr('tabindex', '-1').focus();
    }, 100);
  }
})
$('.sc-service .modal .btn-close').on('click keydown', function(e) {
  if (e.key === 'Enter' || e.witch === 13 || e.type === 'click') {
    e.preventDefault();
    $('body').css({'overflow':'visible'});
    $('.sc-service .modal').removeClass('on');
    $('.sc-service .nav .button-open').attr('tabindex', '-1').focus();
  }
})
// ** .sc-service 영역 끝 **



// ** footer 영역 **
// select btn 클릭이벤트
$('#footer .top .btn-select-basic').on('mousedown', function() {
  $(this).toggleClass('on');
  $(this).siblings().toggleClass('on');
})
$('#footer .top .btn-select-basic').on('keydown', function(e) { 
  if (e.key === 'Enter' || e.which === 13) {
    $(this).addClass('on');
    $(this).siblings().addClass('on');
  }
});
$('#footer .top .select-list').on('focusout', function(e) {
  if (!$(this).has(e.relatedTarget).length) {
    $(this).removeClass('on');
    $(this).siblings().removeClass('on');
  }
})

$('#footer .top .btn-select-point').on('click', function() {
  if (pcMediaQuery.matches) {
    $(this).toggleClass('on');
    $('#footer .top .user-menu-list').toggleClass('on');
  }
  if (mMediaQuery.matches) {
    $('body').css({'overflow':'hidden'});
    $('#footer .top .user-menu-list').toggleClass('on');
  }
})
$('#footer .top .btn-select-point').on('keydown', function(e) { 
  if (pcMediaQuery.matches) {
    if (e.key === 'Enter' || e.which === 13) {
      e.preventDefault();
      $(this).toggleClass('on');
      $('#footer .top .user-menu-list').toggleClass('on');
    }
  }
});
$('#footer .top .user-menu-list').on('focusout', function(e) {
  if (pcMediaQuery.matches) {
    if (!$(this).has(e.relatedTarget).length) {
      $(this).removeClass('on');
      $('#footer .top .btn-select-point').removeClass('on')
    }
  }
})

// 모바일
$('#footer .user-menu-list .btn-close').on('click', function() {
  if (mMediaQuery.matches) {
    $('body').css({'overflow':'visible'});
    $('#footer .user-menu-list').removeClass('on');
  }
});
$('#footer .user-menu-list .user-menu-item').on('click', function() {
  if (mMediaQuery.matches) {
    $(this).toggleClass('active').children('.depth02').toggleClass('active').parent().siblings().removeClass('active').children('.depth02').removeClass('active');
  }
})


// ** footer 영역 끝 **



// swiper slide 포커스 관련
function updateSlideAccessibility(swiper) {
  swiper.slides.forEach((slide) => {
    slide.setAttribute("aria-hidden", "true");
    slide.querySelectorAll("a, button, input, textarea, select").forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.removeEventListener("focus", handleFocus);
      el.removeEventListener("blur", handleBlur);
    });
  });

  // 현재 화면에 보이는 슬라이드 활성화
  swiper.slides.forEach((slide) => {
    const slideRect = slide.getBoundingClientRect();
    const swiperRect = swiper.el.getBoundingClientRect();

    if (slideRect.left >= swiperRect.left && slideRect.right <= swiperRect.right) {
      slide.setAttribute("aria-hidden", "false");
      slide.querySelectorAll("a, button, input, textarea, select").forEach((el) => {
        el.setAttribute("tabindex", "0");

        // 포커스 이동 시 슬라이드 강제 이동 방지
        el.addEventListener("focus", (event) => {
          event.target.focus({ preventScroll: true });
          handleFocus(swiper);
        });

        el.addEventListener("blur", () => handleBlur(swiper));
      });
    }
  });
}

// 포커스 이벤트 핸들러
function handleFocus(swiper) {
  swiper.autoplay.stop(); // 포커스 시 자동 재생 멈춤
  swiper.allowSlideNext = false; // 오른쪽 이동 방지
  swiper.allowSlidePrev = false; // 왼쪽 이동 방지
}

// 포커스 해제 시 원래 상태 복원
function handleBlur(swiper) {
  swiper.autoplay.start(); // 포커스 해제 시 자동 재생 다시 시작
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
}


