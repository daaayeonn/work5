document.addEventListener("DOMContentLoaded", async () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const jsonURL = "../assets/data/service.json";

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
            <img src="${item.src}" alt="${item.title}">
          </div>
          <span class="title">${item.title}</span>
        </a>
      </div>
    `).join("");

    // 🔹 Swiper 초기화
    const serviceSwiper = new Swiper(".sc-service .swiper", {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 28,
      grid: {
        rows: 2,
        fill: "row"
      },
      keyboard: { enabled: true },
      navigation: {
        nextEl: ".sc-service .nav .swiper-button-next",
        prevEl: ".sc-service .nav .swiper-button-prev"
      },
    });

  } catch (error) {
    console.error("🚨 오류 발생:", error.message);
    swiperWrapper.innerHTML = "<p>슬라이드를 불러올 수 없습니다.</p>"; // 오류 발생 시 안내 메시지
  }
});



