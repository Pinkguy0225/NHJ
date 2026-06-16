/**
 * Natural Harmony Journey — 식물 관리 AI 상담 챗봇
 * Gemini API 기반. <body> 끝에서 로드.
 *
 * ⚠️ 사용법: 아래 GEMINI_API_KEY 에 발급받은 키를 넣으세요.
 *    키 발급:
 */
const NHJChat = (() => {
  // ════════════════════════════════════════════
  //  여기에 Gemini API 키를 넣으세요 (AIza... 형태)
  const GEMINI_API_KEY = 'AIzaSyAW8anLKaV2sdo6QAdEtZOq1dIVu_FR2jo';
  // ════════════════════════════════════════════

  // 여러 모델 순서대로 시도 (앞에서 실패하면 다음 것)
  const MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
  const _apiUrl = (m) => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;

  const SYSTEM_PROMPT = `당신은 'Natural Harmony Journey'라는 식물 쇼핑몰의 친절한 식물 관리 상담사입니다.
역할:
- 식물 키우기, 병충해, 물주기, 분갈이, 햇빛, 잎 상태 등 식물 관리 질문에 답합니다.
- 따뜻하고 다정한 말투로, 초보자도 이해하기 쉽게 설명합니다.
- 답변은 3~5문장으로 간결하게. 너무 길지 않게.
- 식물과 무관한 질문(정치, 코딩 등)에는 "저는 식물 관리 상담만 도와드릴 수 있어요 🌿"라고 정중히 안내합니다.
- 적절할 때 이모지(🌿🌱💧☀️)를 자연스럽게 사용합니다.
- 한국어로 답변합니다.`;

  const FALLBACK = [
    { kw: ['노래', '노랗', '누렇'],         a: '잎이 노래지는 건 보통 과습이 원인이에요 💧 흙이 마르지 않았는데 물을 자주 주면 뿌리가 숨을 못 쉬어요. 겉흙이 바싹 마른 뒤에 물을 주고, 배수가 잘 되는지 확인해보세요.' },
    { kw: ['시들', '축 처', '늘어'],         a: '잎이 축 처지면 물 부족이거나 반대로 과습일 수 있어요. 흙을 만져보고 바싹 말랐다면 충분히 물을 주고, 축축한데도 처졌다면 며칠 말려주세요 🌱' },
    { kw: ['벌레', '깍지', '응애', '진딧'],   a: '벌레가 보이면 먼저 물티슈로 닦아내고, 잎 뒷면까지 살펴보세요. 심하면 물에 중성세제를 살짝 섞어 분무하거나 전용 살충제를 쓰면 돼요 🐛' },
    { kw: ['물', '급수', '관수'],             a: '물주기는 식물마다 다르지만, 기본은 "겉흙이 마르면 듬뿍"이에요 💧 화분 바닥으로 물이 빠져나올 만큼 주고, 받침대에 고인 물은 버려주세요.' },
    { kw: ['햇빛', '광', '빛', '조도'],        a: '대부분의 실내식물은 직사광선보다 밝은 그늘을 좋아해요 ☀️ 창가 근처 레이스 커튼 너머 정도가 이상적이에요. 잎이 타거나 색이 바래면 빛이 너무 강한 거예요.' },
    { kw: ['분갈이', '화분', '옮'],           a: '분갈이는 보통 1~2년에 한 번, 뿌리가 화분에 꽉 찼을 때 해요 🪴 지금보다 한 치수 큰 화분에, 배수가 잘 되는 흙으로 옮겨주세요. 봄이 가장 좋은 시기예요.' },
    { kw: ['비료', '영양'],                   a: '비료는 봄~여름 성장기에 2~4주 간격으로 묽게 주면 충분해요 🌿 겨울엔 식물이 쉬는 시기라 거의 안 줘도 돼요. 과하면 오히려 뿌리가 상해요.' },
  ];

  let history = [];
  let isOpen = false;
  let isLoading = false;

  function _fallbackAnswer(text) {
    for (const f of FALLBACK) {
      if (f.kw.some(k => text.includes(k))) return f.a;
    }
    return '음, 좀 더 자세히 알려주시겠어요? 어떤 식물인지, 어떤 증상인지 말씀해주시면 도와드릴게요 🌿\n(예: "잎 끝이 갈색으로 말라요", "물은 얼마나 줘야 해요?")';
  }

  async function _askGemini(text) {
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: '네, 식물 관리 상담을 도와드릴게요 🌿' }] },
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text }] },
    ];

    let lastErr = '';
    for (const model of MODELS) {
      try {
        const res = await fetch(`${_apiUrl(model)}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 500 } }),
        });
        if (!res.ok) {
          const errText = await res.text();
          console.error(`[${model}] Gemini 오류 ${res.status}:`, errText);
          lastErr = `${res.status}: ${errText.slice(0, 200)}`;
          continue; // 다음 모델 시도
        }
        const data = await res.json();
        const out = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (out) return out;
        lastErr = '빈 응답';
      } catch (e) {
        console.error(`[${model}] 네트워크 오류:`, e);
        lastErr = e.message;
      }
    }
    throw new Error(lastErr);
  }

  async function _send() {
    const input = document.getElementById('nhj-chat-input');
    const text = input.value.trim();
    if (!text || isLoading) return;
    input.value = '';
    _addMessage('user', text);
    isLoading = true;
    _addTyping();

    let answer;
    try {
      if (GEMINI_API_KEY && GEMINI_API_KEY.trim()) {
        answer = await _askGemini(text);
      } else {
        await new Promise(r => setTimeout(r, 600));
        answer = _fallbackAnswer(text);
      }
    } catch (e) {
      console.error('NHJChat 최종 실패:', e.message);
      if (String(e.message).includes('429')) {
        answer = _fallbackAnswer(text) + '\n\n💬 (지금 AI 상담 요청이 많아 잠시 후 다시 시도해주세요. 우선 기본 답변을 드렸어요!)';
      } else {
        answer = _fallbackAnswer(text);
      }
    }

    _removeTyping();
    _addMessage('model', answer);
    history.push({ role: 'user', text });
    history.push({ role: 'model', text: answer });
    if (history.length > 12) history = history.slice(-12);
    isLoading = false;
  }

  function _addMessage(role, text) {
    const body = document.getElementById('nhj-chat-body');
    const isUser = role === 'user';
    const el = document.createElement('div');
    el.className = 'nhj-msg ' + (isUser ? 'nhj-msg-user' : 'nhj-msg-bot');
    el.innerHTML = `<div class="nhj-bubble">${text}</div>`;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function _addTyping() {
    const body = document.getElementById('nhj-chat-body');
    const el = document.createElement('div');
    el.id = 'nhj-chat-typing';
    el.className = 'nhj-msg nhj-msg-bot';
    el.innerHTML = `<div class="nhj-bubble nhj-typing"><span class="nhj-dot"></span><span class="nhj-dot"></span><span class="nhj-dot"></span></div>`;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function _removeTyping() {
    document.getElementById('nhj-chat-typing')?.remove();
  }

  function toggle() {
    const panel = document.getElementById('nhj-chat-panel');
    isOpen = !isOpen;
    if (isOpen) {
      panel.style.display = 'flex';
      requestAnimationFrame(() => {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0) scale(1)';
      });
      document.getElementById('nhj-chat-input')?.focus();
    } else {
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(20px) scale(0.96)';
      setTimeout(() => { panel.style.display = 'none'; }, 250);
    }
  }

  function _injectCSS() {
    if (document.getElementById('nhj-chat-css')) return;
    const style = document.createElement('style');
    style.id = 'nhj-chat-css';
    style.textContent = `
      @keyframes nhjBounce { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }

      #nhj-chat-fab {
        position:fixed;bottom:28px;left:28px;z-index:9990;
        width:56px;height:56px;border-radius:9999px;border:none;cursor:pointer;
        background:#4a6545;color:#fff;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 6px 24px rgba(74,101,69,.4);
        transition:transform .25s cubic-bezier(.34,1.56,.64,1);
      }
      #nhj-chat-fab:hover { transform: scale(1.08); }
      html.dark #nhj-chat-fab { background:#6a9464; box-shadow:0 6px 24px rgba(106,148,100,.45); }

      #nhj-chat-panel {
        position:fixed;bottom:96px;left:28px;z-index:9991;
        width:360px;max-width:calc(100vw - 56px);height:520px;max-height:calc(100vh - 140px);
        background:#fff;
        border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.25);
        display:none;flex-direction:column;overflow:hidden;
        opacity:0;transform:translateY(20px) scale(0.96);
        transition:opacity .25s ease, transform .25s cubic-bezier(.34,1.56,.64,1);
        border:1px solid rgba(74,101,69,.1);
      }
      html.dark #nhj-chat-panel { background:#181f19; border-color:rgba(106,148,100,.15); }

      .nhj-chat-header {
        padding:16px 20px;background:#4a6545;color:#fff;display:flex;align-items:center;gap:10px;
      }
      html.dark .nhj-chat-header { background:#1c2a1e; }

      #nhj-chat-body {
        flex:1;overflow-y:auto;padding:20px;background:#fbf9f8;
      }
      html.dark #nhj-chat-body { background:#111712; }

      .nhj-msg { display:flex; margin-bottom:12px; }
      .nhj-msg-user { justify-content:flex-end; }
      .nhj-msg-bot  { justify-content:flex-start; }

      .nhj-bubble {
        max-width:80%;padding:10px 14px;border-radius:14px;
        font-size:14px;line-height:1.6;white-space:pre-wrap;
      }
      .nhj-msg-user .nhj-bubble {
        background:#4a6545;color:#fff;border-bottom-right-radius:4px;
      }
      .nhj-msg-bot .nhj-bubble {
        background:#f0f4ee;color:#1b1c1c;border-bottom-left-radius:4px;
      }
      html.dark .nhj-msg-user .nhj-bubble { background:#6a9464;color:#0e140f; }
      html.dark .nhj-msg-bot  .nhj-bubble { background:#253028;color:#d4ddd0; }

      .nhj-typing { display:flex;gap:4px;padding:12px 16px; }
      .nhj-dot { width:7px;height:7px;border-radius:50%;background:#6a9464;animation:nhjBounce 1.2s infinite; }
      .nhj-dot:nth-child(2){animation-delay:.2s}
      .nhj-dot:nth-child(3){animation-delay:.4s}

      .nhj-chat-input-bar {
        padding:12px 16px;border-top:1px solid rgba(74,101,69,.1);
        background:#fff;display:flex;gap:8px;align-items:center;
      }
      html.dark .nhj-chat-input-bar { background:#181f19;border-top-color:rgba(106,148,100,.15); }

      #nhj-chat-input {
        flex:1;border:1px solid #d8e0d4;border-radius:9999px;
        padding:10px 16px;font-size:14px;font-family:'Pretendard',sans-serif;
        background:#f5f8f3;color:#1b1c1c;
      }
      #nhj-chat-input:focus { outline:none;border-color:#4a6545; }
      html.dark #nhj-chat-input { background:#1a221b;color:#d4ddd0;border-color:rgba(106,148,100,.25); }

      .nhj-chat-send {
        width:40px;height:40px;border-radius:9999px;border:none;
        background:#4a6545;color:#fff;cursor:pointer;
        display:flex;align-items:center;justify-content:center;flex-shrink:0;
      }
      html.dark .nhj-chat-send { background:#6a9464; }
    `;
    document.head.appendChild(style);
  }

  function _build() {
    if (document.getElementById('nhj-chat-fab')) return;
    _injectCSS();

    const fab = document.createElement('button');
    fab.id = 'nhj-chat-fab';
    fab.setAttribute('aria-label', '식물 상담 챗봇');
    fab.innerHTML = `<span class="material-symbols-outlined" style="font-size:26px;">forum</span>`;
    fab.onclick = toggle;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'nhj-chat-panel';
    panel.innerHTML = `
      <div class="nhj-chat-header">
        <div style="width:36px;height:36px;border-radius:9999px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;">
          <span class="material-symbols-outlined" style="font-size:22px;">eco</span>
        </div>
        <div style="flex:1;">
          <p style="font-size:15px;font-weight:700;margin:0;">식물 상담사</p>
          <p style="font-size:11px;opacity:.85;margin:0;display:flex;align-items:center;gap:4px;">
            <span style="width:6px;height:6px;border-radius:50%;background:#7dff9e;display:inline-block;"></span>
            언제든 물어보세요
          </p>
        </div>
        <button onclick="NHJChat.toggle()" style="background:none;border:none;color:#fff;cursor:pointer;line-height:0;opacity:.8;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='.8'">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div id="nhj-chat-body"></div>
      <div class="nhj-chat-input-bar">
        <input id="nhj-chat-input" type="text" placeholder="잎이 노래졌어요..."/>
        <button class="nhj-chat-send" onclick="NHJChat.send()">
          <span class="material-symbols-outlined" style="font-size:20px;">send</span>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    document.getElementById('nhj-chat-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); _send(); }
    });

    setTimeout(() => {
      _addMessage('model', '안녕하세요! 식물 관리 상담사예요 🌿\n잎이 노래지거나, 물주기, 햇빛, 벌레 등 식물 키우면서 궁금한 점을 편하게 물어보세요!');
    }, 300);
  }

  function init() {
    if (document.body) _build();
    else document.addEventListener('DOMContentLoaded', _build);
  }

  return { init, toggle, send: _send };
})();

NHJChat.init();
