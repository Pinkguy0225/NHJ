/**
 * Natural Harmony Journey — 헤더 이벤트/푸터/장바구니/토스트
 * <body> 끝에서 로드
 */

function _renderHeader() {
  const menuBtn    = document.getElementById('nhj-menu-btn');
  const mobileMenu = document.getElementById('nhj-mobile-menu');
  const menuIcon   = document.getElementById('nhj-menu-icon');
  let menuOpen = false;
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.style.display = 'block';
        requestAnimationFrame(() => { mobileMenu.style.maxHeight = '300px'; });
        menuIcon.textContent = 'close';
      } else {
        mobileMenu.style.maxHeight = '0';
        menuIcon.textContent = 'menu';
        setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
      }
    });
  }
  // 다크모드 토글 버튼 생성 안 함 (완전 제거)
}

/* =========================================================
   모달 (이용약관 / 개인정보처리방침)
========================================================= */
function _openModal(type) {
  const content = {
    terms: {
      title: '이용약관',
      body: `<h3>제1조 (목적)</h3>
<p>본 약관은 Natural Harmony Journey(이하 "회사")가 제공하는 서비스의 이용 조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
<h3>제2조 (정의)</h3>
<p>"서비스"란 회사가 제공하는 식물 관련 상품 판매 및 관련 정보 제공 서비스를 의미합니다.</p>
<h3>제3조 (서비스 이용)</h3>
<p>이용자는 본 약관에 동의함으로써 서비스를 이용할 수 있습니다. 서비스 이용은 회원가입 후 가능하며, 일부 서비스는 비회원도 이용할 수 있습니다.</p>
<h3>제4조 (이용자의 의무)</h3>
<p>이용자는 서비스 이용 시 관련 법령을 준수하여야 하며, 타인의 개인정보를 침해하거나 서비스의 정상적인 운영을 방해하는 행위를 하여서는 안 됩니다.</p>
<h3>제5조 (환불 및 교환)</h3>
<p>상품 수령 후 7일 이내에 환불 또는 교환을 신청할 수 있습니다. 단, 식물의 특성상 고객 과실로 인한 손상은 환불이 불가합니다.</p>
<h3>제6조 (면책조항)</h3>
<p>회사는 천재지변, 전쟁, 기타 불가항력으로 인한 서비스 중단에 대해서는 책임을 지지 않습니다.</p>
<h3>제7조 (준거법 및 관할)</h3>
<p>본 약관의 해석 및 분쟁에 관해서는 대한민국 법률을 적용하며, 관할 법원은 서울중앙지방법원으로 합니다.</p>`
    },
    privacy: {
      title: '개인정보처리방침',
      body: `<h3>1. 개인정보의 수집 및 이용 목적</h3>
<p>Natural Harmony Journey는 다음의 목적을 위하여 개인정보를 수집·이용합니다. 수집한 개인정보는 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
<ul><li>회원 가입 및 관리</li><li>상품 주문 및 배송 처리</li><li>고객 상담 및 불만 처리</li><li>마케팅 및 광고 활용 (동의한 경우)</li></ul>
<h3>2. 수집하는 개인정보의 항목</h3>
<p>필수항목: 이름, 이메일 주소, 비밀번호, 주소, 전화번호</p>
<p>선택항목: 생년월일</p>
<h3>3. 개인정보의 보유 및 이용기간</h3>
<p>회원 탈퇴 시까지 보유하며, 관련 법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>
<h3>4. 개인정보의 제3자 제공</h3>
<p>회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 배송 처리를 위한 택배사 등 필요한 경우 최소한의 정보만 제공합니다.</p>
<h3>5. 개인정보 보호책임자</h3>
<p>이메일: nhj@naturalharmoy.kr<br>전화: 02-000-0000</p>
<h3>6. 이용자의 권리</h3>
<p>이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제 및 처리 정지를 요청할 수 있습니다.</p>`
    }
  };

  const info = content[type];
  if (!info) return;

  // 기존 모달 제거
  document.getElementById('nhj-modal-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'nhj-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99998;display:flex;align-items:center;justify-content:center;padding:20px;';
  overlay.innerHTML = `
    <div id="nhj-modal-box" role="dialog" aria-modal="true" aria-label="${info.title}"
      style="background:#fff;border-radius:16px;width:min(560px,90vw);max-height:80vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.25);overflow:hidden;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(74,101,69,.10);flex-shrink:0;">
        <h2 style="font-size:18px;font-weight:700;color:#4a6545;margin:0;font-family:'Pretendard',sans-serif;">${info.title}</h2>
        <button onclick="document.getElementById('nhj-modal-overlay').remove()" aria-label="닫기"
          style="background:none;border:none;cursor:pointer;color:#73796f;line-height:0;padding:4px;border-radius:6px;transition:background .2s;"
          onmouseover="this.style.background='rgba(74,101,69,.08)'" onmouseout="this.style.background='none'">
          <span class="material-symbols-outlined" style="font-size:22px;">close</span>
        </button>
      </div>
      <div style="overflow-y:auto;padding:24px;flex:1;font-family:'Pretendard',sans-serif;font-size:14px;line-height:1.8;color:#3a3f37;">
        ${info.body}
      </div>
    </div>
    <style>
      #nhj-modal-box h3{font-size:15px;font-weight:700;color:#4a6545;margin:16px 0 6px;font-family:'Pretendard',sans-serif;}
      #nhj-modal-box p,#nhj-modal-box li{margin:0 0 8px;color:#3a3f37;}
      #nhj-modal-box ul{padding-left:20px;margin:0 0 8px;}
    </style>`;

  // 외부 클릭으로 닫기
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);

  // ESC로 닫기
  const escHandler = e => { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);
}

/* =========================================================
   3. 공통 푸터 (리디자인)
========================================================= */
function _renderFooter() {
  const el = document.querySelector('[data-nhj-footer]');
  if (!el) return;
  el.outerHTML = `
<footer style="margin-top:80px;">

  <!-- 상단: 배경 이미지 섹션 -->
  <div style="position:relative;min-height:320px;overflow:hidden;display:flex;align-items:center;justify-content:center;">
    <!-- 배경 이미지 -->
    <div style="position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80') center/cover no-repeat;"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,.55);"></div>

    <!-- 콘텐츠 -->
    <div style="position:relative;z-index:1;text-align:center;padding:48px 24px;">

      <!-- 로고 (헤더와 동일 스타일) -->
      <div style="margin-bottom:32px;">
        <a href="index.html" style="font-size:clamp(18px,2.5vw,28px);font-weight:700;color:rgba(255,255,255,.85)">Natural Harmony Journey</a>
        <div style="font-size:12px;font-weight:400;color:rgba(255,255,255,.7);margin-top:4px;letter-spacing:0.02em;">운명의 식물을 찾아드립니다</div>
      </div>

      <!-- ADDRESS -->
      <div style="margin-bottom:24px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.85)">Address</p>
        <p style="font-size:14px;color:rgba(255,255,255,.85);margin:0;">울산광역시 남구 대학로 93 501</p>
      </div>

      <!-- CONTACT -->
      <div style="margin-bottom:28px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.85)">Contact</p>
        <p style="font-size:14px;color:rgba(255,255,255,.85);margin:0 0 4px;">e-mail ) nhj@naturalharmony.kr</p>
        <p style="font-size:14px;color:rgba(255,255,255,.85);margin:0;">Tel ) 02-000-0000</p>
      </div>

      <!-- SNS 아이콘 -->
      <div style="display:flex;gap:20px;justify-content:center;">
        <a href="#" aria-label="Facebook"
          style="width:44px;height:44px;border-radius:9999px;border:1.5px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:all .25s;"
          onmouseover="this.style.background='#4a6545';this.style.borderColor='#4a6545';"
          onmouseout="this.style.background='transparent';this.style.borderColor='rgba(255,255,255,.4)';">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" aria-label="Instagram"
          style="width:44px;height:44px;border-radius:9999px;border:1.5px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:all .25s;"
          onmouseover="this.style.background='#4a6545';this.style.borderColor='#4a6545';"
          onmouseout="this.style.background='transparent';this.style.borderColor='rgba(255,255,255,.4)';">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
      </div>
    </div>
  </div>

  <!-- 하단 흰 영역 -->
  <div style="background:#fff;padding:40px 24px;text-align:center;border-top:1px solid rgba(74,101,69,.08);">

    <!-- SNS 아이콘 (하단 반복 — 참고 이미지 구조) -->
    <div style="margin-bottom:20px;">
      <a href="#" aria-label="Facebook"
        style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;color:#1b1c1c;text-decoration:none;transition:color .2s;"
        onmouseover="this.style.color='#4a6545'" onmouseout="this.style.color='#1b1c1c'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
    </div>

    <p style="font-size:15px;font-weight:700;color:#1b1c1c;margin:0 0 8px;font-family:'Pretendard',sans-serif;">Natural Harmony Journey</p>
    <p style="font-size:13px;color:#73796f;margin:0 0 4px;font-family:'Pretendard',sans-serif;">보태니컬 순수 미학. 자연과 함께하는 라이프스타일을 제안합니다.</p>
    <p style="font-size:13px;color:#73796f;margin:0 0 20px;font-family:'Pretendard',sans-serif;">Powered by Natural Harmony Journey</p>

    <div style="display:flex;gap:24px;justify-content:center;margin-bottom:20px;">
      <button onclick="_openModal('terms')"
        style="background:none;border:none;cursor:pointer;font-size:13px;color:#73796f;font-family:'Pretendard',sans-serif;padding:0;text-decoration:underline;text-underline-offset:3px;transition:color .2s;"
        onmouseover="this.style.color='#4a6545'" onmouseout="this.style.color='#73796f'">이용약관</button>
      <button onclick="_openModal('privacy')"
        style="background:none;border:none;cursor:pointer;font-size:13px;color:#73796f;font-family:'Pretendard',sans-serif;padding:0;text-decoration:underline;text-underline-offset:3px;transition:color .2s;"
        onmouseover="this.style.color='#4a6545'" onmouseout="this.style.color='#73796f'">개인정보처리방침</button>
    </div>

    <p style="font-size:12px;color:rgba(74,101,69,.45);margin:0;font-family:'Pretendard',sans-serif;">© 2026 Natural Harmony Journey. All rights reserved.</p>
  </div>

  <style>
    @media(max-width:767px){
      footer > div:first-child { min-height:280px; }
    }
  </style>
</footer>`;
}

/* =========================================================
   4. 장바구니
========================================================= */
const NHJCart = (() => {
  const KEY = 'nhj_cart';
  function _load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
  function _save(items) { localStorage.setItem(KEY, JSON.stringify(items)); _updateBadge(); }
  function count() { return _load().reduce((s, i) => s + i.qty, 0); }
  function _updateBadge() {
    const n = count();
    document.querySelectorAll('#nhj-cart-count').forEach(el => { el.textContent = n; });
  }
  function addItem(product) {
    const items = _load();
    const existing = items.find(i => i.id === product.id && i.size === product.size);
    if (existing) existing.qty += 1;
    else items.push({ ...product, qty: 1 });
    _save(items);
  }
  function removeItem(id, size) { _save(_load().filter(i => !(i.id === id && i.size === size))); _renderPopupBody(); }
  function changeQty(id, size, delta) {
    const items = _load();
    const item = items.find(i => i.id === id && i.size === size);
    if (item) { item.qty = Math.max(1, item.qty + delta); _save(items); _renderPopupBody(); }
  }
  function openPopup() {
    let overlay = document.getElementById('nhj-cart-overlay');
    if (!overlay) { _createPopupDOM(); overlay = document.getElementById('nhj-cart-overlay'); }
    _renderPopupBody();
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      const panel = overlay.querySelector('#nhj-cart-panel');
      if (panel) panel.style.transform = 'translateX(0)';
    });
    document.body.style.overflow = 'hidden';
  }
  function closePopup() {
    const overlay = document.getElementById('nhj-cart-overlay');
    if (!overlay) return;
    overlay.style.opacity = '0';
    const panel = overlay.querySelector('#nhj-cart-panel');
    if (panel) panel.style.transform = 'translateX(100%)';
    setTimeout(() => { overlay.style.display = 'none'; document.body.style.overflow = ''; }, 320);
  }
  function _createPopupDOM() {
    const bg = '#fff'; const border = '#efeded'; const text = '#1b1c1c'; const primary = '#4a6545';
    const div = document.createElement('div');
    div.innerHTML = `
<div id="nhj-cart-overlay"
  style="position:fixed;inset:0;z-index:99990;background:rgba(0,0,0,.4);display:none;justify-content:flex-end;opacity:0;transition:opacity .32s ease;"
  onclick="if(event.target===this)NHJCart.closePopup()">
  <div id="nhj-cart-panel"
    style="width:420px;max-width:100vw;height:100%;background:${bg};display:flex;flex-direction:column;transform:translateX(100%);transition:transform .32s cubic-bezier(.22,1,.36,1);box-shadow:-8px 0 40px rgba(0,0,0,.15);">
    <div style="padding:24px;border-bottom:1px solid ${border};display:flex;justify-content:space-between;align-items:center;background:${bg};">
      <h2 style="font-size:18px;font-weight:700;color:${primary};margin:0;font-family:'Pretendard',sans-serif;">장바구니</h2>
      <button onclick="NHJCart.closePopup()" style="background:none;border:none;cursor:pointer;color:#73796f;line-height:0;padding:4px;">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div id="nhj-cart-body" style="flex:1;overflow-y:auto;padding:0 24px;"></div>
    <div id="nhj-cart-footer" style="padding:16px 24px;border-top:1px solid ${border};background:${bg};"></div>
  </div>
</div>`;
    document.body.appendChild(div.firstElementChild);
  }
  function _renderPopupBody() {
    const body   = document.getElementById('nhj-cart-body');
    const footer = document.getElementById('nhj-cart-footer');
    if (!body) return;
    const primary = '#4a6545'; const text = '#1b1c1c';
    const muted = '#73796f'; const divider = '#efeded'; const cardBg = '#f5f3f3';
    const btnBdr = '#c3c8bd'; const disabledBg = '#c3c8bd';
    const items = _load();
    if (items.length === 0) {
      body.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:40px 0;text-align:center;">
          <div style="width:88px;height:88px;background:${cardBg};border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:22px;">
            <span class="material-symbols-outlined" style="font-size:44px;color:${primary};font-variation-settings:'FILL' 0,'wght' 200;">shopping_cart</span>
          </div>
          <p style="font-size:16px;font-weight:700;color:${text};margin-bottom:8px;">담긴 상품이 없어요</p>
          <p style="font-size:13px;color:${muted};line-height:1.7;">관심있는 상품을 장바구니에 담아보세요.<br/>편리하게 한 번에 주문할 수 있어요.</p>
          <button onclick="NHJCart.closePopup()" style="margin-top:28px;display:inline-flex;align-items:center;gap:6px;padding:12px 24px;background:${primary};color:#fff;border:none;border-radius:8px;font-family:'Pretendard',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">
            <span class="material-symbols-outlined" style="font-size:18px;">storefront</span>쇼핑 계속하기
          </button>
        </div>`;
      footer.innerHTML = `
        <div style="display:flex;justify-content:space-between;font-size:13px;color:${muted};margin-bottom:12px;">
          <span>합계</span><span style="font-weight:700;color:${text};">0원</span>
        </div>
        <button disabled style="width:100%;padding:14px;background:${disabledBg};color:${muted};border:none;border-radius:8px;font-family:'Pretendard',sans-serif;font-size:15px;font-weight:600;cursor:not-allowed;">구매하기</button>`;
      return;
    }
    const total = items.reduce((s, i) => s + i.priceNum * i.qty, 0);
    body.innerHTML = `
      <div style="padding:16px 0;">
        ${items.map(item => `
        <div style="display:flex;gap:12px;padding:16px 0;border-bottom:1px solid ${divider};align-items:flex-start;">
          <img src="${item.img}" alt="${item.name}" style="width:72px;height:88px;object-fit:cover;border-radius:8px;flex-shrink:0;background:${cardBg};">
          <div style="flex:1;min-width:0;">
            <p style="font-size:15px;font-weight:700;color:${text};margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</p>
            <p style="font-size:12px;color:${muted};margin-bottom:8px;">${item.size}</p>
            <p style="font-size:14px;font-weight:700;color:${primary};">${(item.priceNum * item.qty).toLocaleString()}원</p>
            <div style="display:flex;align-items:center;gap:8px;margin-top:10px;">
              <button onclick="NHJCart.changeQty(${item.id},'${item.size}',-1)" style="width:28px;height:28px;border:1.5px solid ${btnBdr};border-radius:0.25rem;background:none;cursor:pointer;font-size:16px;color:${text};display:flex;align-items:center;justify-content:center;">−</button>
              <span style="font-size:14px;font-weight:600;min-width:20px;text-align:center;color:${text};">${item.qty}</span>
              <button onclick="NHJCart.changeQty(${item.id},'${item.size}',1)" style="width:28px;height:28px;border:1.5px solid ${btnBdr};border-radius:0.25rem;background:none;cursor:pointer;font-size:16px;color:${text};display:flex;align-items:center;justify-content:center;">+</button>
              <button onclick="NHJCart.removeItem(${item.id},'${item.size}')" style="margin-left:auto;background:none;border:none;cursor:pointer;color:${muted};display:flex;align-items:center;" title="삭제">
                <span class="material-symbols-outlined" style="font-size:18px;">close</span>
              </button>
            </div>
          </div>
        </div>`).join('')}
      </div>`;
    footer.innerHTML = `
      <div style="display:flex;justify-content:space-between;font-size:14px;color:${muted};margin-bottom:6px;">
        <span>상품 합계</span><span style="color:${text};">${total.toLocaleString()}원</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:14px;color:${muted};margin-bottom:14px;">
        <span>배송비</span><span style="color:${text};">${total >= 100000 ? '무료' : '3,000원'}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:${text};margin-bottom:16px;padding-top:12px;border-top:1px solid ${divider};">
        <span>최종 결제금액</span>
        <span style="color:${primary};">${(total >= 100000 ? total : total + 3000).toLocaleString()}원</span>
      </div>
      <a href="index6.html" style="display:flex;align-items:center;justify-content:center;width:100%;padding:14px;background:${primary};color:#fff;border:none;border-radius:8px;font-family:'Pretendard',sans-serif;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;">구매하기</a>`;
  }
  return { count, addItem, removeItem, changeQty, openPopup, closePopup, _updateBadge };
})();

/* =========================================================
   5. 토스트
========================================================= */
const NHJToast = (() => {
  function show(msg, type = 'success') {
    const bgMap  = { success: '#f0f7ee', error: '#fff0f0' };
    const clrMap = { success: '#4a6545', error: '#ba1a1a' };
    const iconMap= { success: 'check_circle', error: 'error' };
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(12px);z-index:99999;display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:8px;background:${bgMap[type]};color:${clrMap[type]};border:1px solid ${clrMap[type]}30;box-shadow:0 8px 24px rgba(0,0,0,0.15);font-family:'Pretendard',sans-serif;font-size:14px;font-weight:600;white-space:nowrap;opacity:0;transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1);`;
    el.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px;font-variation-settings:'FILL' 1;">${iconMap[type]}</span>${msg}`;
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity='1'; el.style.transform='translateX(-50%) translateY(0)'; });
    setTimeout(() => { el.style.opacity='0'; el.style.transform='translateX(-50%) translateY(8px)'; setTimeout(() => el.remove(), 300); }, 2800);
  }
  return { show };
})();

/* =========================================================
   6. 뉴스레터
========================================================= */
const NHJNewsletter = {
  submit() {
    const inp = document.getElementById('nhj-newsletter-input');
    if (!inp || !inp.value.includes('@')) { NHJToast.show('올바른 이메일 주소를 입력해주세요.', 'error'); return; }
    NHJToast.show('구독해주셔서 감사합니다!');
    inp.value = '';
  }
};

/* =========================================================
   7. 초기화
========================================================= */
_renderHeader();
_renderFooter();
NHJCart._updateBadge();

// NHJLightRays 호환성 (nhj-dark.js 없이도 에러 안 남)
if (typeof NHJLightRays !== 'undefined') NHJLightRays.initIfDark();

// 다른 탭 동기화
window.addEventListener('storage', e => {
  NHJCart._updateBadge();
});
