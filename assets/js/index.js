// **json 데이터 불러오는 부분

// ** .sc-news .swiper 데이터 불러오기
fetch('/assets/data/news_slides.json')
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
        <img src="${slide.image}" alt="${slide.title}" class="news-img">
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
    }
  });

  // 재생버튼
  let isPlaying = true;
  $('.sc-news .swiper .swiper-button-play').on('click', function() {
    if (isPlaying) {
      newsSwiper.autoplay.stop();
      $(this).addClass('paused');
    } else {
      newsSwiper.autoplay.start();
      $(this).removeClass('paused');
    }
    isPlaying = !isPlaying;
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** .sc-notice swiper 데이터 불러오기
fetch('/assets/data/notice_slides.json')
.then(response => response.json())
.then(data => {
  const swiperWrapper = document.getElementById('notice-swiper');

  data.forEach(slide => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    slideElement.innerHTML = `
      <a href="${slide.link}" title="새창" class="notice-link">
        <div class="thumb">
          <img src="${slide.image}" alt="${slide.title}" class="notice-img">
        </div>
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
    }
  });
  // 재생버튼
  let isPlaying = true;
  $('.sc-notice .swiper .swiper-button-play').on('click', function() {
    if (isPlaying) {
      noticeSwiper.autoplay.stop(); // 자동 재생 멈춤
      $(this).addClass('paused');
    } else {
      noticeSwiper.autoplay.start(); // 자동 재생 시작
      $(this).removeClass('paused');
    }
    isPlaying = !isPlaying;
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// notice 모달 팝업
fetch('/assets/data/notice_slides.json')
.then(response => response.json())
.then(data => {
  const noticeModal = document.getElementById('notice-modal');

  data.forEach(modal => {
    const modalEl = document.createElement('a');
    modalEl.classList.add('notice-link');
    modalEl.href = modal.link;
    modalEl.title = "새창";

    modalEl.innerHTML = `
      <div class="thumb">
        <img src="${modal.image}" alt="${modal.title}" class="thumb-img">
      </div>
    `;

    noticeModal.appendChild(modalEl);
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** 대구는 지금 공지사항 데이터 불러오기
fetch('/assets/data/now_notice_slides.json')
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

  const nowNoticeSwiper = new Swiper('.sc-now .now-notice-swiper-area .swiper', {
    loop: true,
    slidesPerView: 4,
    // spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    speed: 1500,
    navigation: {
      nextEl: '.sc-now .now-notice-swiper-area .swiper-button-next',
      prevEl: '.sc-now .now-notice-swiper-area .swiper-button-prev',
    },
    breakpoints: {
      1440: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 2,
      }
    }
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** 대구는 지금 시험공지 데이터 불러오기
fetch('/assets/data/now_test_slides.json')
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

  const nowTestSwiper = new Swiper('.sc-now .now-test-swiper-area .swiper', {
    loop: true,
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
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** 대구는 지금 공지사항 모바일 리스트 불러오기
fetch('/assets/data/now_notice_slides.json')
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
fetch('/assets/data/now_test_slides.json')
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
fetch('/assets/data/favorites_service.json')
.then(response => response.json())
.then(data => {
  const swiperWrapper = document.getElementById('service-swiper');

  data.forEach(slide => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    slideElement.innerHTML = `
      <a href="${slide.link}" title="새창" class="service-link">
        <div class="thumb">
          <img src="${slide.image}" alt="${slide.title}" class="service-img">
        </div>
        <span class="title">${slide.title}</span>
      </a>
    `;

    swiperWrapper.appendChild(slideElement);
  });

  const serviceSwiper = new Swiper('.sc-service .swiper', {
    loop: true,
    slidesPerView: 2,
    grid: {
      rows: 1
    },
    autoplay: {
      delay: 4000,
    },
    speed: 1000,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      360: {
         grid: {
          rows: 1
        },
        slidesPerView: 4,
      },
      767: {
         grid: {
          rows: 1
        },
        slidesPerView: 6,
      },
      1100: {
        slidesPerView: 4,
        grid: {
          rows: 2
        },
        loopAdditionalSlides: 3,
      },
    },
  });
  // 재생버튼
  let isPlaying = true;
  $('.sc-service .swiper .swiper-button-play').on('click', function() {
    if (isPlaying) {
      serviceSwiper.autoplay.stop();
      $(this).addClass('paused');
    } else {
      serviceSwiper.autoplay.start();
      $(this).removeClass('paused');
    }
    isPlaying = !isPlaying;
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** .sc-service 모달팝업 데이터 불러오기
fetch('/assets/data/favorites_service.json')
.then(response => response.json())
.then(data => {
  const serviceModal = document.getElementById('service-modal');

  data.forEach(modal => {
    const modalEl = document.createElement('a');
    modalEl.classList.add('service-link');
    modalEl.href = modal.link;
    modalEl.title = "새창";

    modalEl.innerHTML = `
      <div class="ic-wrap">
        <img src="${modal.image}" alt="${modal.title}" class="icon-img">
      </div>
      <span class="title">${modal.title}</span>
    `;

    serviceModal.appendChild(modalEl);
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** footer 자주찾는 메뉴 리스트 데이터 불러오기
fetch('/assets/data/user_favorite_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('user-favorite-list');

  data.forEach(item => {
    const liEl = document.createElement('li');
    liEl.classList.add('user-menu-item');

    if (item.liClass) {
      liEl.classList.add('user-menu-item', item.liClass);
    } else {
      liEl.classList.add('user-menu-item');
    }
    
    if (item.liClass === 'title') {
      liEl.innerHTML = `
        <span>${item.title}</span>
      `;
    } else {
      item.links.forEach(link => {
        const aEl = document.createElement('a');
        aEl.href = link.href;

        if (link.linkClass) {
          aEl.classList.add('user-menu-link', link.linkClass);
        } else {
          aEl.classList.add('user-menu-link');
        }
        aEl.title = link.linkTitle;
        aEl.textContent = link.text;

        liEl.appendChild(aEl);
      });
    }

    ulEl.appendChild(liEl);
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** footer 시민 리스트 데이터 불러오기
fetch('/assets/data/user_citizen_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('user-citizen-list');

  data.forEach(item => {
    const liEl = document.createElement('li');
    liEl.classList.add('user-menu-item');

    if (item.liClass) {
      liEl.classList.add('user-menu-item', item.liClass);
    } else {
      liEl.classList.add('user-menu-item');
    }
    
    if (item.liClass === 'title') {
      // liEl.classList.add(item.liClass);
      liEl.innerHTML = `
        <span>${item.title}</span>
      `;
    } else {
      item.links.forEach(link => {
        const aEl = document.createElement('a');
        aEl.href = link.href;

        if (link.linkClass) {
          aEl.classList.add('user-menu-link', link.linkClass);
        } else {
          aEl.classList.add('user-menu-link');
        }
        aEl.title = link.linkTitle;
        aEl.textContent = link.text;

        liEl.appendChild(aEl);
      });
    }

    ulEl.appendChild(liEl);
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** footer 사업자 리스트 데이터 불러오기
fetch('/assets/data/user_business_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('user-business-list');

  data.forEach(item => {
    const liEl = document.createElement('li');
    liEl.classList.add('user-menu-item');

    if (item.liClass) {
      liEl.classList.add('user-menu-item', item.liClass);
    } else {
      liEl.classList.add('user-menu-item');
    }
    
    if (item.liClass === 'title') {
      // liEl.classList.add(item.liClass);
      liEl.innerHTML = `
        <span>${item.title}</span>
      `;
    } else {
      item.links.forEach(link => {
        const aEl = document.createElement('a');
        aEl.href = link.href;

        if (link.linkClass) {
          aEl.classList.add('user-menu-link', link.linkClass);
        } else {
          aEl.classList.add('user-menu-link');
        }
        aEl.title = link.linkTitle;
        aEl.textContent = link.text;

        liEl.appendChild(aEl);
      });
    }

    ulEl.appendChild(liEl);
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** footer 관광객 리스트 데이터 불러오기
fetch('/assets/data/user_tour_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('user-tour-list');

  data.forEach(item => {
    const liEl = document.createElement('li');
    liEl.classList.add('user-menu-item');

    if (item.liClass) {
      liEl.classList.add('user-menu-item', item.liClass);
    } else {
      liEl.classList.add('user-menu-item');
    }
    
    if (item.liClass === 'title') {
      // liEl.classList.add(item.liClass);
      liEl.innerHTML = `
        <span>${item.title}</span>
      `;
    } else {
      item.links.forEach(link => {
        const aEl = document.createElement('a');
        aEl.href = link.href;

        if (link.linkClass) {
          aEl.classList.add('user-menu-link', link.linkClass);
        } else {
          aEl.classList.add('user-menu-link');
        }
        aEl.title = link.linkTitle;
        aEl.textContent = link.text;

        liEl.appendChild(aEl);
      });
    }

    ulEl.appendChild(liEl);
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** footer 유용한 정보 리스트 데이터 불러오기
fetch('/assets/data/user_info_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('user-info-list');

  data.forEach(item => {
    const liEl = document.createElement('li');
    liEl.classList.add('user-menu-item');

    if (item.liClass) {
      liEl.classList.add('user-menu-item', item.liClass);
    } else {
      liEl.classList.add('user-menu-item');
    }
    
    if (item.liClass === 'title') {
      // liEl.classList.add(item.liClass);
      liEl.innerHTML = `
        <span>${item.title}</span>
      `;
    } else {
      item.links.forEach(link => {
        const aEl = document.createElement('a');
        aEl.href = link.href;

        if (link.linkClass) {
          aEl.classList.add('user-menu-link', link.linkClass);
        } else {
          aEl.classList.add('user-menu-link');
        }
        aEl.title = link.linkTitle;
        aEl.textContent = link.text;

        liEl.appendChild(aEl);
      });
    }

    ulEl.appendChild(liEl);
  });
})
.catch(error => console.error('Error loading JSON data:', error));

// ** footer m favorite
fetch('/assets/data/user_favorite_list.json')
  .then(response => response.json())
  .then(data => {
    const ulEl = document.getElementById('m-user-favorite-list');

    const li = document.createElement('li');
    li.classList.add('m-user-menu-item');

    const ulDepth02 = document.createElement('ul');
    ulDepth02.classList.add('depth02-list');

    data.forEach(item => {
      
      if (item.liClass === 'title') {

        const a = document.createElement('a');
        a.href = "#";
        a.classList.add('m-user-menu-link');
        a.textContent = item.title;

        li.appendChild(a);
      } else {


        li.appendChild(ulDepth02);

        const liDepth02 = document.createElement('li');
        if (item.liClass) {
          liDepth02.classList.add('depth02-item', item.liClass);
        } else {
          liDepth02.classList.add('depth02-item');
        }

        item.links.forEach(link => {
          const aDepth02 = document.createElement('a');
          aDepth02.href = link.href;
          aDepth02.title = link.linkTitle;
          if (link.linkClass) {
            aDepth02.classList.add('depth02-link', link.linkClass);
          } else {
            aDepth02.classList.add('depth02-link');
          }
          aDepth02.textContent = link.text;

          liDepth02.appendChild(aDepth02);
        });

        ulDepth02.appendChild(liDepth02);
      }
      
      ulEl.appendChild(li);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));

// footer m 시민 데이터 불러오기
fetch('/assets/data/user_citizen_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('m-user-citizen-list');

  const li = document.createElement('li');
  li.classList.add('m-user-menu-item');

  const ulDepth02 = document.createElement('ul');
  ulDepth02.classList.add('depth02-list');
  
  data.forEach(item => {
    
    if (item.liClass === 'title') {

      const a = document.createElement('a');
      a.href = "#";
      a.classList.add('m-user-menu-link');
      a.textContent = item.title;

      li.appendChild(a);
    } else {


      li.appendChild(ulDepth02);

      const liDepth02 = document.createElement('li');
      if (item.liClass) {
        liDepth02.classList.add('depth02-item', item.liClass);
      } else {
        liDepth02.classList.add('depth02-item');
      }

      item.links.forEach(link => {
        const aDepth02 = document.createElement('a');
        aDepth02.href = link.href;
        aDepth02.title = link.linkTitle;
        if (link.linkClass) {
          aDepth02.classList.add('depth02-link', link.linkClass);
        } else {
          aDepth02.classList.add('depth02-link');
        }
        aDepth02.textContent = link.text;

        liDepth02.appendChild(aDepth02);
      });

      ulDepth02.appendChild(liDepth02);
    }
    
    ulEl.appendChild(li);
  });
})
.catch(error => console.error('Error loading JSON:', error));

// footer m 사업자 데이터 불러오기
fetch('/assets/data/user_business_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('m-user-business-list');

  const li = document.createElement('li');
  li.classList.add('m-user-menu-item');

  const ulDepth02 = document.createElement('ul');
  ulDepth02.classList.add('depth02-list');

  data.forEach(item => {
    
    if (item.liClass === 'title') {

      const a = document.createElement('a');
      a.href = "#";
      a.classList.add('m-user-menu-link');
      a.textContent = item.title;

      li.appendChild(a);
    } else {


      li.appendChild(ulDepth02);

      const liDepth02 = document.createElement('li');
      if (item.liClass) {
        liDepth02.classList.add('depth02-item', item.liClass);
      } else {
        liDepth02.classList.add('depth02-item');
      }

      item.links.forEach(link => {
        const aDepth02 = document.createElement('a');
        aDepth02.href = link.href;
        aDepth02.title = link.linkTitle;
        if (link.linkClass) {
          aDepth02.classList.add('depth02-link', link.linkClass);
        } else {
          aDepth02.classList.add('depth02-link');
        }
        aDepth02.textContent = link.text;

        liDepth02.appendChild(aDepth02);
      });

      ulDepth02.appendChild(liDepth02);
    }
    
    ulEl.appendChild(li);
  });
})
.catch(error => console.error('Error loading JSON:', error));

  // footer m 관광객 데이터 불러오기
fetch('/assets/data/user_tour_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('m-user-tour-list');

  const li = document.createElement('li');
  li.classList.add('m-user-menu-item');

  const ulDepth02 = document.createElement('ul');
  ulDepth02.classList.add('depth02-list');
  
  data.forEach(item => {
    
    if (item.liClass === 'title') {

      const a = document.createElement('a');
      a.href = "#";
      a.classList.add('m-user-menu-link');
      a.textContent = item.title;

      li.appendChild(a);
    } else {


      li.appendChild(ulDepth02);

      const liDepth02 = document.createElement('li');
      if (item.liClass) {
        liDepth02.classList.add('depth02-item', item.liClass);
      } else {
        liDepth02.classList.add('depth02-item');
      }

      item.links.forEach(link => {
        const aDepth02 = document.createElement('a');
        aDepth02.href = link.href;
        aDepth02.title = link.linkTitle;
        if (link.linkClass) {
          aDepth02.classList.add('depth02-link', link.linkClass);
        } else {
          aDepth02.classList.add('depth02-link');
        }
        aDepth02.textContent = link.text;

        liDepth02.appendChild(aDepth02);
      });

      ulDepth02.appendChild(liDepth02);
    }
    
    ulEl.appendChild(li);
  });
})
.catch(error => console.error('Error loading JSON:', error));

// footer m 유용한 정보 데이터 불러오기
fetch('/assets/data/user_info_list.json')
.then(response => response.json())
.then(data => {
  const ulEl = document.getElementById('m-user-info-list');

  const li = document.createElement('li');
  li.classList.add('m-user-menu-item');

  const ulDepth02 = document.createElement('ul');
  ulDepth02.classList.add('depth02-list');
  
  data.forEach(item => {
    
    if (item.liClass === 'title') {

      const a = document.createElement('a');
      a.href = "#";
      a.classList.add('m-user-menu-link');
      a.textContent = item.title;

      li.appendChild(a);
    } else {


      li.appendChild(ulDepth02);

      const liDepth02 = document.createElement('li');
      if (item.liClass) {
        liDepth02.classList.add('depth02-item', item.liClass);
      } else {
        liDepth02.classList.add('depth02-item');
      }

      item.links.forEach(link => {
        const aDepth02 = document.createElement('a');
        aDepth02.href = link.href;
        aDepth02.title = link.linkTitle;
        if (link.linkClass) {
          aDepth02.classList.add('depth02-link', link.linkClass);
        } else {
          aDepth02.classList.add('depth02-link');
        }
        aDepth02.textContent = link.text;

        liDepth02.appendChild(aDepth02);
      });

      ulDepth02.appendChild(liDepth02);
    }
    
    ulEl.appendChild(li);
  });
})
.catch(error => console.error('Error loading JSON:', error));
// ** 데이터 불러오는 영역 끝 **


// 분기점
const pcMediaQuery = window.matchMedia('(min-width: 768px)');
const mMediaQuery = window.matchMedia('(max-width: 767px)');


// ** header 영역 **
// header 고정
$(window).on('scroll', function() {
  let scrollTop = $(this).scrollTop();

  if (scrollTop > 0) {
    $('.egov').addClass('active');
    $('#header').addClass('active');
  } else {
    $('.egov').removeClass('active');
    $('#header').removeClass('active');
  }
});

// gnb
$('#header #gnb').on('mouseenter focusin', function() {
  $('#header').addClass('on');
}).on('mouseleave focusout', function() {
  $('#header').removeClass('on');
});
// select
$('#header .util-area .btn-select').on('click', function(e) {
  e.stopPropagation();
  $(this).siblings().toggleClass('on').parent().siblings().find('.select-list').removeClass('on');
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

  $('body').css({'overflow':'hidden'});
  $('#header .m-gnb-wrap').addClass('on');
})
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

  $(this).addClass('active').siblings().removeClass('active');
  $(this).children('.m-depth03-list').toggleClass('active').parent().siblings().children('.m-depth03-list').removeClass('active');
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
});
// 재생버튼
let spotIsPlaying = true;
$('.sc-guide .spot-swiper .swiper-button-play').on('click', function() {
  if (spotIsPlaying) {
    spotSwiper.autoplay.stop(); //
    $(this).addClass('paused');
  } else {
    spotSwiper.autoplay.start();
    $(this).removeClass('paused');
  }
  spotIsPlaying = !spotIsPlaying;
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
$('.sc-guide .weather-wrap .btn-select').on('click focusin', function() {
  $(this).siblings().toggleClass('on');
})
$('.sc-guide .weather-wrap .select-weather').on('focusout', function() {
  $(this).removeClass('on');
})

$(document).on('click', function(e) {
  if (!$(e.target).closest('.sc-guide .weather-wrap .btn-select').length) {
    $('.sc-guide .weather-wrap .select-list').removeClass('on');
  }
});
// ** .sc-guide 영역 끝 **


// ** .sc-notice 영역 **
$('.sc-notice .group-header .more-link').on('click', function(e) {
  e.preventDefault();
  $('body').css({'overflow':'hidden'});
  $('.sc-notice .group-modal').addClass('on');
})
$('.sc-notice .group-modal .btn-close').on('click', function() {
  $('body').css({'overflow':'visible'});
  $('.sc-notice .group-modal').removeClass('on');
})
// ** .sc-notice 영역 끝 **


// ** .sc-quick-tab 영역 **
// .sc-quick-tab 탭메뉴
$('.sc-quick-tab .tab-list .tab-item').on('click focusin', function (e) {
  e.preventDefault();

  tabName = $(this).children().data('tab');

  $(this).addClass('on').siblings().removeClass('on');
  $('#'+tabName).addClass('on').siblings().removeClass('on');
})
// ** .sc-quick-tab 영역 끝 **


// ** .sc-now 대구는 지금 영역 **
// 탭메뉴
$('.sc-now .group-tab .tab-list .tab-item').on('click focusin', function(e) {
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
});
// 재생버튼
let blogIsPlaying = true;
$('.sc-sns .swiper .swiper-button-play').on('click', function() {
  if (blogIsPlaying) {
    blogSwiper.autoplay.stop(); //
    $(this).addClass('paused');
  } else {
    blogSwiper.autoplay.start();
    $(this).removeClass('paused');
  }
  blogIsPlaying = !blogIsPlaying;
});
// ** .sc-blog 영역 끝 **


// ** .sc-service 영역 **
$('.sc-service .group-content .swiper-nav .service-more-link').on('click', function(e) {
  e.preventDefault();
  $('body').css({'overflow':'hidden'});
  $('.sc-service .group-modal').addClass('on');
})
$('.sc-service .group-modal .btn-close').on('click', function() {
  $('body').css({'overflow':'visible'});
  $('.sc-service .group-modal').removeClass('on');
})
// ** .sc-service 영역 끝 **



// ** footer 영역 **
// select btn 클릭이벤트
$('#footer .top .btn-select-basic').on('click', function() {
  $(this).toggleClass('on');
  $(this).siblings().toggleClass('on');
})

$('#footer .top .btn-select-point').on('click focusin', function() {
  if (pcMediaQuery.matches) {
    $(this).toggleClass('on');
    $('#footer .top .user-menu-wrap').toggleClass('on');
  }
})

// 버튼 클릭 이벤트
$('#footer .top .btn-select-point').on('click focusin', function() {
  if (mMediaQuery.matches) {
    $('body').css({'overflow':'hidden'});
    $('#footer .m-user-menu').addClass('on');
  }
});
$('#footer .m-user-menu .btn-close').on('click focusin', function() {
  if (mMediaQuery.matches) {
    $('body').css({'overflow':'visible'});
    $('#footer .m-user-menu').removeClass('on');
  }
});

$(document).on("click",".m-user-menu-link",function(){
  $(this).addClass('on').next().slideDown();
})


// ** footer 영역 끝 **





