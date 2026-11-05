const TYPE_EN = { "카페·식당": "Cafe & Dining", "오피스": "Office", "병원·클리닉": "Clinic", "매장·스튜디오": "Retail & Studio" };

// 시공사례 데이터 (가상 사례)
const WORKS = [
  { id: "mangwon-cafe", type: "카페·식당", title: "망원동 스페셜티 카페", img: "cafe", area: "24평", period: "4주", cost: "6,800만 원", loc: "서울 마포구",
    points: ["바 전면을 다크그린 타일로 마감해 매장 첫인상을 정리", "로스팅 기계 배기·전기 증설을 설계 단계에서 함께 진행", "야간 시공으로 오픈 일정 3일 앞당김"] },
  { id: "seongsu-office", type: "오피스", title: "성수동 IT 스타트업 사무실", img: "office", area: "65평", period: "5주", cost: "1억 4,000만 원", loc: "서울 성동구",
    points: ["직원 40명 기준 좌석·회의실 4개 배치", "유리 회의실에 흡음 패널을 더해 소음 문제 해결", "주말 집중 시공으로 기존 업무 중단 없이 이전"] },
  { id: "pangyo-derma", type: "병원·클리닉", title: "판교 피부과 의원", img: "clinic", area: "48평", period: "6주", cost: "1억 9,000만 원", loc: "경기 성남시",
    points: ["접수-대기-상담-시술 동선을 한 방향으로 정리", "의료기기 전기 용량·급배수 위치를 기기 업체와 사전 협의", "보건소 개설 신고 서류 준비 지원"] },
  { id: "hannam-boutique", type: "매장·스튜디오", title: "한남동 의류 편집숍", img: "boutique", area: "18평", period: "3주", cost: "4,200만 원", loc: "서울 용산구",
    points: ["트래버틴 진열대를 제작해 상품이 돋보이도록 구성", "트랙 조명으로 시즌마다 진열 변경 가능", "외부 간판·파사드 디자인까지 함께 진행"] },
  { id: "yeonnam-restaurant", type: "카페·식당", title: "연남동 한식 다이닝", img: "restaurant", area: "32평", period: "5주", cost: "9,500만 원", loc: "서울 마포구",
    points: ["주방 동선과 덕트 경로를 먼저 확정한 뒤 홀 디자인 진행", "벤치 좌석으로 좌석 수 20% 확보", "소방 완비증명 취득까지 대행"] },
  { id: "suwon-dental", type: "병원·클리닉", title: "수원 광교 치과", img: "dental", area: "55평", period: "7주", cost: "2억 3,000만 원", loc: "경기 수원시",
    points: ["진료실 6개 체어 배치와 석션·컴프레서 배관 설계", "유리 파티션으로 개방감을 유지하면서 진료 공간 분리", "X-ray실 방사선 차폐 시공"] },
  { id: "bundang-bakery", type: "카페·식당", title: "분당 베이커리 카페", img: "bakery", area: "28평", period: "4주", cost: "7,600만 원", loc: "경기 성남시",
    points: ["오븐·발효기 열부하를 고려한 냉난방 설계", "테라조 쇼케이스 상판으로 내구성 확보", "포장 고객 대기 동선 별도 구성"] },
  { id: "gangnam-lounge", type: "오피스", title: "강남 마케팅 에이전시 라운지", img: "lounge", area: "40평", period: "4주", cost: "8,900만 원", loc: "서울 강남구",
    points: ["탕비실과 라운지를 합쳐 직원 휴게·미팅 공간으로 활용", "노출 천장 설비를 정리하고 도장 마감", "가구·조명 구매 대행 포함"] },
  { id: "ilsan-showroom", type: "매장·스튜디오", title: "일산 가구 쇼룸", img: "showroom", area: "80평", period: "6주", cost: "1억 2,000만 원", loc: "경기 고양시",
    points: ["제품이 잘 보이도록 바닥·벽을 무채색으로 통일", "우드 슬랫 월로 브랜드 존 구분", "대형 창 단열 필름·블라인드 시공"] },
  { id: "mapo-pilates", type: "매장·스튜디오", title: "마포 필라테스 스튜디오", img: "pilates", area: "30평", period: "3주", cost: "5,300만 원", loc: "서울 마포구",
    points: ["리포머 8대 배치 기준 바닥 보강", "아래층 소음 민원 대비 차음재 시공", "탈의실·샤워실 방수 공사"] }
];

document.addEventListener("DOMContentLoaded", () => {
  // 모바일 메뉴
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const header = document.querySelector(".header");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      menuBtn.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
      nav.classList.toggle("is-open", !open);
      header && header.classList.toggle("menu-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });
  }

  // 시공사례 렌더링
  const grid = document.getElementById("workGrid");
  if (grid) {
    const limit = Number(grid.dataset.limit) || WORKS.length;
    grid.innerHTML = WORKS.slice(0, limit).map((w) => `
      <button type="button" class="work reveal" data-id="${w.id}" data-type="${w.type}">
        <div class="work__img"><img src="assets/img/${w.img}.jpg" alt="${w.title} 시공 사진" loading="lazy" width="800" height="600"></div>
        <div class="work__meta">${TYPE_EN[w.type]}</div>
        <h3>${w.title}</h3>
        <p>${w.area} · ${w.period} 시공</p>
      </button>`).join("");
  }

  // 필터: 사라졌다가 하나씩 다시 나타나는 전환
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    if (btn.getAttribute("aria-pressed") === "true") return;
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const t = btn.dataset.filter;
    const apply = () => {
      let i = 0;
      grid.querySelectorAll(".work").forEach((card) => {
        const show = t === "전체" || card.dataset.type === t;
        card.hidden = !show;
        card.classList.remove("pop");
        if (show) {
          card.classList.add("is-in");
          card.style.setProperty("--stagger", `${Math.min(i++, 8) * 0.07}s`);
          void card.offsetWidth;
          card.classList.add("pop");
        }
      });
      grid.classList.remove("is-filtering");
    };
    if (reduce) return apply();
    grid.classList.add("is-filtering");
    setTimeout(apply, 260);
  }));

  // 상세 팝업
  const modal = document.getElementById("workModal");
  if (modal && grid) {
    const panel = modal.querySelector(".modal__panel");
    let lastFocus = null;
    const close = () => { modal.classList.remove("is-open"); document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".work");
      if (!card) return;
      const w = WORKS.find((x) => x.id === card.dataset.id);
      lastFocus = card;
      panel.innerHTML = `
        <img src="assets/img/${w.img}.jpg" alt="${w.title} 시공 사진">
        <div class="modal__body">
          <div class="work__meta">${TYPE_EN[w.type]} · ${w.type}</div>
          <h3 id="modalTitle">${w.title}</h3>
          <dl><dt>위치</dt><dd>${w.loc}</dd><dt>면적</dt><dd>${w.area}</dd><dt>공사 기간</dt><dd>${w.period}</dd><dt>공사비</dt><dd>${w.cost} (VAT 별도)</dd></dl>
          <ul>${w.points.map((p) => `<li>${p}</li>`).join("")}</ul>
          <a class="btn btn--dark" href="contact.html?type=${encodeURIComponent(w.type)}">비슷한 공간 견적 문의</a>
        </div>
        <button type="button" class="modal__close" aria-label="닫기">×</button>`;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      panel.querySelector(".modal__close").focus();
    });
    modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".modal__close")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("is-open")) close(); });
  }

  // 문의 폼: URL의 업종 값 자동 선택 + 데모 제출
  const form = document.getElementById("quoteForm");
  if (form) {
    const type = new URLSearchParams(location.search).get("type");
    if (type) {
      const radio = form.querySelector(`input[name="type"][value="${CSS.escape(type)}"]`);
      if (radio) radio.checked = true;
    }
    const date = form.querySelector("#openDate");
    if (date) date.min = new Date().toISOString().slice(0, 10);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add("is-done");
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // 순차 등장: 같은 부모 안의 .reveal 형제끼리 0.12초씩 늦게
  const items = document.querySelectorAll(".reveal");
  items.forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const i = sibs.indexOf(el);
    if (sibs.length > 1 && i > 0) el.style.setProperty("--stagger", `${Math.min(i, 6) * 0.12}s`);
  });

  // 숫자 카운트업
  const countUp = (el) => {
    const end = Number(el.dataset.count), suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = end + suffix; return; }
    const dur = 1600, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // 스크롤 등장 감지
  const onIn = (el) => {
    el.classList.add("is-in");
    el.querySelectorAll("[data-count]").forEach(countUp);
  };
  if ("IntersectionObserver" in window && !reduce) {
    document.querySelectorAll("[data-count]").forEach((el) => { el.textContent = "0" + (el.dataset.suffix || ""); });
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { onIn(en.target); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  // 스크롤 진행 바 · 헤더 상태 · 패럴랙스
  const bar = document.createElement("div");
  bar.className = "progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  const parallax = reduce ? [] : [...document.querySelectorAll("[data-parallax]")];
  let lastY = window.scrollY, ticking = false;
  const update = () => {
    const y = window.scrollY, vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (header) {
      header.classList.toggle("is-solid", y > 40);
      const menuOpen = header.classList.contains("menu-open");
      header.classList.toggle("is-hidden", !menuOpen && y > 400 && y > lastY + 2);
      if (y < lastY - 2) header.classList.remove("is-hidden");
    }
    parallax.forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const offset = (r.top + r.height / 2 - vh / 2) * -0.12;
      img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    lastY = y;
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", update);
  update();

  // 맨 위로
  document.querySelectorAll(".to-top").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }));
});
