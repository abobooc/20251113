// 簡易問答題 (multiple-choice) + p5.js 視覺化分數

let finalScore = 0;
let maxScore = 0;
let scoreText = "";

// 是非題題庫（防災主題，共 26 題，來自使用者提供）
let questions = [
    { q: '看到外面刮大風下大雨，就是有颱風來了。', answer: false },
    { q: '全球暖化會使地球溫度越來越高。', answer: true },
    { q: '天然災害是指大自然力量威脅到人類生活環境、生命財產安全。', answer: true },
    { q: '台灣的海岸地區不會發生海嘯。', answer: false },
    { q: '看到大樓有大量濃煙冒出，表示該大樓很可能發生火災。', answer: true },
    { q: '台灣常常發生地震大多是因為地殼釋放出多餘的能量。', answer: true },
    { q: '每年 7~9 月颱風特別容易侵襲台灣，這時容易出現強風並伴隨著大雨。', answer: true },
    { q: '在家中聞到怪怪的味道時，可能是瓦斯味，應趕緊打開門窗，讓空氣流通。', answer: true },
    { q: '全球暖化不會對人類造成危害，只是溫度會上升一點點而已。', answer: false },
    { q: '穿著濕衣服或身體沾了水，應該避免觸碰任何電器和插座，以免被電到。', answer: true },
    { q: '發生火災的時候，有煙霧產生，會讓人出現呼吸困難的狀況。', answer: true },
    { q: '全球暖化影響下，疾病等問題會越來越嚴重。', answer: true },
    { q: '全球暖化會使海平面上升並淹沒城市。', answer: true },
    { q: '使用電熱器要遠離木頭、紙張、布料等容易燃燒的物品，以防火災。', answer: true },
    { q: '如果在海邊看到水位突然下跌，露出大片沙灘，可能是海嘯快要來了。', answer: true },
    { q: '坡面出現一排一排的裂縫，而且這些裂縫的方向相同，並有一些地方陷落下去，可能是地形改變的徵兆。', answer: true },
    { q: '山坡上，原本垂直生長的樹木和直立的電線桿，出現傾斜的現象，表示這個斜坡有滑動的歷史紀錄。', answer: true },
    { q: '海嘯只會發生在東南亞或日本等國家，台灣並不會發生。', answer: false },
    { q: '燃燒紙錢會產生大量二氧化碳，而使地球變得更熱。', answer: true },
    { q: '暑假期間到戶外旅遊時，遇到下雨不應該躲到樹下，因為有可能遭到雷擊。', answer: true },
    { q: '火箭炮、沖天炮與雙響炮等爆竹又刺激又好玩，過年過節施放可增加熱鬧氣氛，該找親朋友一起玩。', answer: false },
    { q: '上下樓梯不可以奔跑。', answer: true },
    { q: '上下學搭乘機車時，自己可以坐或站在機車前方的踏板。', answer: false },
    { q: '吃東西前，確實將手洗乾淨，可以預防腸病毒。', answer: true },
    { q: '使用微波爐來爆米花時，為了確定好了沒，可以把耳朵靠近聽一聽爆米花「啵啵」的聲音。', answer: false },
    { q: '野外教學，當天不必穿制服，我要換上鮮豔亮麗的衣服參加，以便讓別人看得清楚我。', answer: false }
];

let currentIndex = 0;
let finished = false;
let roundQuestions = []; // 本次回合要使用的題目清單（隨機抽取）
// 鼓勵與動畫系統
let confetti = [];
let confettiMax = 0;
let finalMessage = '';
let finalSubtitle = '';

// --- 第三單元（拖曳式選擇題）題庫 ---
let unit3Questions = [
    { q: '有時候大雨後山區道路會中斷，是因為', choices: ['旱災 (太久沒下雨)','山崩','風太大'], answer: 2 },
    { q: '北極熊快要從地球上消失了，是因為', choices: ['全球暖化','水災','海嘯'], answer: 1 },
    { q: '下大雨過後，山區會有石塊滾下來，有可能會發生', choices: ['風災','土石流','地震'], answer: 2 },
    { q: '途中被很多石頭擋住，請問發生了什麼災害?', choices: ['水災','山崩','火災'], answer: 2 },
    { q: '乳牛的排泄物所產生的甲烷，會造成什麼災害?', choices: ['狂牛症','全球暖化','火災'], answer: 2 },
    { q: '台灣常發生的天災不包括哪一個？', choices: ['地震','颱風','龍捲風'], answer: 3 },
    { q: '每年暑假期間，台灣最容易發生什麼天然災害，常導致農產損失', choices: ['地震','颱洪','火災'], answer: 2 },
    { q: '看到教室牆壁或地板出現嚴重裂縫，最有可能是什麼災害', choices: ['地震','颱風','水災'], answer: 1 },
    { q: '站在潮濕地板上使用電器，最可能發生什麼情形？', choices: ['觸電','水災','火災'], answer: 1 },
    { q: '日常生活出現的高溫物品，靠近或接觸時可能會發生什麼危險？', choices: ['感冒','中毒','燙傷'], answer: 3 },
    { q: '颱風不會造成下列哪一種災害？', choices: ['洪水','土石流','地震'], answer: 3 },
    { q: '地震可能造成的災害包括', choices: ['房屋倒塌','停水停電','以上皆是'], answer: 3 },
    { q: '在火災現場，會先有什麼感覺?', choices: ['被電到','呼吸困難','身體刺痛'], answer: 2 },
    { q: '地震主要會造成什麼傷害?', choices: ['房子倒塌','淹水','觸電'], answer: 1 },
    { q: '被虎頭蜂螫傷嚴重時，會產生什麼傷害?', choices: ['昏迷、死亡','沒影響','刺傷'], answer: 1 },
    { q: '下列哪一項不是地震發生的原因？', choices: ['火山爆發','地殼的板塊運動','地牛翻身'], answer: 3 }
];

let roundUnit3 = [];
let unit3CurrentIndex = 0;
let unit3Score = 0;
let unit3Max = 0;

function setup() {
    // 在指定容器中建立 canvas
    console.log('[quiz] setup() start, document.readyState=', document.readyState);
    const holder = document.getElementById('canvasHolder');
    const w = Math.min(window.innerWidth - 40, 700);
    const h = 260;
    let cnv = createCanvas(w, h);
    if (holder) cnv.parent('canvasHolder');
    // 初始化時先隱藏 canvasHolder，只有進入單元 2 時顯示
    if (holder) holder.classList.add('hidden');
    noLoop();

    // 初始化題目與分數
    maxScore = questions.length;
    finalScore = 0;
    scoreText = `得分: ${finalScore}/${maxScore}`;

    // 在 DOM 準備好後建立題目 UI 並綁定單元按鈕
    function bindUnitButtons(){
        createQuizUI();
        bindTFButtons();
        const unit1 = document.getElementById('unit1Btn');
        const unit2 = document.getElementById('unit2Btn');
        const unit3 = document.getElementById('unit3Btn');
        const videoBack = document.getElementById('videoBackBtn');
        if (unit1) unit1.addEventListener('click', ()=>{
            const startScreen = document.getElementById('startScreen');
            const videoUnit = document.getElementById('videoUnit');
            const quiz = document.getElementById('quiz');
            if (startScreen) startScreen.classList.add('hidden');
            if (quiz) quiz.classList.add('hidden');
            if (videoUnit) videoUnit.classList.remove('hidden');
            // pause any quiz animation
                noLoop();
                // hide canvas while watching video
                const holder = document.getElementById('canvasHolder');
                if (holder) holder.classList.add('hidden');
        });
            if (unit2) unit2.addEventListener('click', ()=> startQuiz());
            if (unit3) unit3.addEventListener('click', ()=> startUnit3());
        if (videoBack) videoBack.addEventListener('click', ()=>{
            const startScreen = document.getElementById('startScreen');
            const videoUnit = document.getElementById('videoUnit');
            if (videoUnit) videoUnit.classList.add('hidden');
            if (startScreen) startScreen.classList.remove('hidden');
                // hide canvas when back to menu
                const holder = document.getElementById('canvasHolder');
                if (holder) holder.classList.add('hidden');
        });
        updateScoreDisplay();
    }

    if (!document.getElementById('question')){
        console.error('[quiz] DOM element #question not found when setup ran.');
        // 若尚未有 DOM，等 DOMContentLoaded
        window.addEventListener('DOMContentLoaded', ()=>{
            console.log('[quiz] DOMContentLoaded fired, initializing UI');
            bindUnitButtons();
        });
    } else {
        bindUnitButtons();
    }
}

function startQuiz(){
    // 隨機抽取 10 題（若題庫少於 10 題則全部使用）
    roundQuestions = getRandomQuestions(10);
    maxScore = roundQuestions.length;
    finalScore = 0;
    currentIndex = 0;

    // 顯示 quiz，隱藏 start
    const startScreen = document.getElementById('startScreen');
    const quiz = document.getElementById('quiz');
    if (startScreen) startScreen.classList.add('hidden');
    if (quiz) quiz.classList.remove('hidden');
    // 若影片區塊正在顯示，隱藏它
    const videoUnit = document.getElementById('videoUnit');
    if (videoUnit) videoUnit.classList.add('hidden');

    // 顯示 canvas 以便在完成時呈現成績視覺化
    const holder = document.getElementById('canvasHolder');
    if (holder) holder.classList.remove('hidden');

    // 隱藏 unit3（拖曳題）區塊若存在
    const unit3 = document.getElementById('unit3');
    if (unit3) unit3.classList.add('hidden');

    // 停止畫布的持續動畫（只在完成時動畫）
    noLoop();

    showQuestion(currentIndex);
    updateScoreDisplay();
}

function getRandomQuestions(n){
    const copy = questions.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(n, copy.length));
}

// 通用：從指定陣列隨機抽 n 題
function getRandomFromArray(arr, n){
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(n, copy.length));
}

function startUnit3(){
    roundUnit3 = getRandomFromArray(unit3Questions, 10);
    unit3Max = roundUnit3.length;
    unit3Score = 0;
    unit3CurrentIndex = 0;

    // 顯示 unit3，隱藏其他
    const startScreen = document.getElementById('startScreen');
    const videoUnit = document.getElementById('videoUnit');
    const quiz = document.getElementById('quiz');
    const unit3 = document.getElementById('unit3');
    if (startScreen) startScreen.classList.add('hidden');
    if (videoUnit) videoUnit.classList.add('hidden');
    if (quiz) quiz.classList.add('hidden');
    if (unit3) unit3.classList.remove('hidden');

    // 隱藏 canvas（成績只在單元2顯示）
    const holder = document.getElementById('canvasHolder');
    if (holder) holder.classList.add('hidden');

    showUnit3Question(unit3CurrentIndex);
    updateUnit3ScoreDisplay();
}

function showUnit3Question(index){
    const list = roundUnit3.length ? roundUnit3 : unit3Questions;
    const q = list[index];
    const qEl = document.getElementById('unit3Question');
    const optsEl = document.getElementById('unit3Options');
    const dropBox = document.getElementById('unit3DropBox');
    const nextBtn = document.getElementById('unit3NextBtn');
    if (!qEl || !optsEl || !dropBox || !nextBtn) return console.error('[unit3] Missing UI elements');

    qEl.textContent = `第 ${index + 1} 題 / 共 ${list.length} 題： ${q.q}`;
    // 清空選項與 dropbox
    optsEl.innerHTML = '';
    dropBox.textContent = '把你的答案拖到這裡';
    nextBtn.disabled = true;

    // 建立可拖曳選項
    q.choices.forEach((text, i)=>{
        const d = document.createElement('div');
        d.className = 'draggable choice';
        d.setAttribute('draggable','true');
        d.dataset.choiceIndex = i + 1; // 1-based
        d.textContent = `${i+1}. ${text}`;
        d.style.padding = '8px 10px';
        d.style.border = '1px solid #ccc';
        d.style.borderRadius = '6px';
        d.style.background = '#fff';
        d.style.cursor = 'grab';
        d.addEventListener('dragstart', (ev)=>{
            ev.dataTransfer.setData('text/plain', d.dataset.choiceIndex);
        });
        optsEl.appendChild(d);
    });

    // drop handlers
    dropBox.ondragover = function(ev){ ev.preventDefault(); dropBox.classList.add('drop-over'); };
    dropBox.ondragleave = function(ev){ dropBox.classList.remove('drop-over'); };
    dropBox.ondrop = function(ev){
        ev.preventDefault();
        dropBox.classList.remove('drop-over');
        const choiceIndex = parseInt(ev.dataTransfer.getData('text/plain'), 10);
        // 檢查答案
        const correct = (choiceIndex === q.answer);
        if (correct) unit3Score++;
        // 顯示回饋
        dropBox.textContent = (correct ? '答對！' : `答錯，正確答案：${q.answer}. ${q.choices[q.answer-1]}`);
        // disable dragging for this round
        const children = optsEl.querySelectorAll('.draggable');
        children.forEach(ch=> ch.setAttribute('draggable','false'));
        nextBtn.disabled = false;
        updateUnit3ScoreDisplay();
    };
}

function updateUnit3ScoreDisplay(){
    const el = document.getElementById('unit3ScoreDisplay');
    if (el) el.textContent = `得分: ${unit3Score}/${unit3Max}`;
}

// 下一題按鈕處理
document.addEventListener('click', (e)=>{
    if (e.target && e.target.id === 'unit3NextBtn'){
        const list = roundUnit3.length ? roundUnit3 : unit3Questions;
        if (unit3CurrentIndex < list.length - 1){
            unit3CurrentIndex++;
            showUnit3Question(unit3CurrentIndex);
        } else {
            finishUnit3();
        }
    }
    if (e.target && e.target.id === 'unit3BackBtn'){
        // 回到單元選單
        const unit3 = document.getElementById('unit3');
        const startScreen = document.getElementById('startScreen');
        if (unit3) unit3.classList.add('hidden');
        if (startScreen) startScreen.classList.remove('hidden');
        // hide canvas if any
        const holder = document.getElementById('canvasHolder');
        if (holder) holder.classList.add('hidden');
    }
});

function finishUnit3(){
    // 顯示小結（但不啟動 canvas）
    const qEl = document.getElementById('unit3Question');
    if (qEl) qEl.textContent = `已完成所有題目。 最終成績: ${unit3Score}/${unit3Max}`;
    // 顯示操作按鈕（再試一次 / 回到單元選單 已在 UI）
}

function windowResized() {
    // 保持 canvas 寬度合理
    const w = Math.min(window.innerWidth - 40, 700);
    resizeCanvas(w, height);
    if (finished) redraw();
}

function createQuizUI() {
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', () => {
        const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
        if (currentIndex < list.length - 1) {
            currentIndex++;
            showQuestion(currentIndex);
        } else {
            finishQuiz();
        }
    });
}

function bindTFButtons(){
    const t = document.getElementById('trueBtn');
    const f = document.getElementById('falseBtn');
    t.addEventListener('click', ()=> selectTF(true));
    f.addEventListener('click', ()=> selectTF(false));
}

function showQuestion(index) {
    finished = false;
    const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
    const q = list[index];
    const questionEl = document.getElementById('question');
    if (!questionEl) { console.error('[quiz] showQuestion: #question element missing'); return; }
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const trueBtn = document.getElementById('trueBtn');
    const falseBtn = document.getElementById('falseBtn');
    const total = list.length;
    questionEl.textContent = `第 ${index + 1} 題 / 共 ${total} 題： ${q.q}`;
    q.answered = false;

    // 重置按鈕狀態
    trueBtn.disabled = false; trueBtn.classList.remove('correct','wrong');
    falseBtn.disabled = false; falseBtn.classList.remove('correct','wrong');

    // 更新進度（顯示已完成題數比例）
    const pct = Math.round((index) / total * 100);
    progressFill.style.width = pct + '%';

    console.log(`[quiz] showQuestion idx=${index}, pct=${pct}%, question="${q.q}"`);

    // 更新下一題按鈕文字
    nextBtn.textContent = (index < total - 1) ? '下一題' : '完成並顯示成績';
    nextBtn.disabled = true; // 要先答題才能下一題
    updateScoreDisplay();
}

function selectTF(value){
    const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
    const q = list[currentIndex];
    if (!q || q.answered) return;
    q.answered = true;
    const trueBtn = document.getElementById('trueBtn');
    const falseBtn = document.getElementById('falseBtn');

    // disable both
    trueBtn.disabled = true; falseBtn.disabled = true;

    const correct = q.answer === value;
    if (correct) finalScore++;

    // 標示顏色
    if (q.answer === true){
        trueBtn.classList.add('correct');
        if (value === false) falseBtn.classList.add('wrong');
    } else {
        falseBtn.classList.add('correct');
        if (value === true) trueBtn.classList.add('wrong');
    }

    updateScoreDisplay();

    // 啟用下一題按鈕
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = false;

}

function updateScoreDisplay() {
    const scoreEl = document.getElementById('scoreDisplay');
    if (scoreEl) scoreEl.textContent = `得分: ${finalScore}/${maxScore}`;
}

function finishQuiz() {
    finished = true;
    scoreText = `最終成績: ${finalScore}/${maxScore}`;
    // 將進度條置為 100%
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.width = '100%';

    // 在題目區顯示總結
    const questionEl = document.getElementById('question');
    if (questionEl) questionEl.textContent = `已完成所有題目。 ${scoreText}。`;
    // 根據分數選擇鼓勵內容與動畫強度
    const percentage = maxScore > 0 ? Math.round((finalScore / maxScore) * 100) : 0;
    if (percentage >= 90) {
        finalMessage = '太棒了！你是防災小達人！🎉';
        finalSubtitle = '保持警覺，繼續學習可得更完美的準備！';
        confettiMax = 160;
    } else if (percentage >= 70) {
        finalMessage = '很棒！你有不錯的防災知識！🌟';
        finalSubtitle = '再接再厲，熟悉更多技巧會更好。';
        confettiMax = 100;
    } else if (percentage >= 50) {
        finalMessage = '不錯，繼續努力！👍';
        finalSubtitle = '溫習重點可幫助你做得更好。';
        confettiMax = 60;
    } else {
        finalMessage = '別灰心，你可以的！💪';
        finalSubtitle = '建議重試或閱讀防災資料，安全最重要。';
        confettiMax = 40;
    }

    // 生成 confetti 粒子
    confetti = [];
    for (let i = 0; i < confettiMax; i++) {
        confetti.push(createConfetti());
    }

    // 顯示重試/回到開始按鈕
    appendFinishButtons();

    // 啟動 draw 的動畫循環以播放 confetti
    loop();
}

function createConfetti(){
    const colors = ['#ff4d4d','#ffb84d','#ffd24d','#4dff88','#4dd0ff','#8c4dff'];
    return {
        x: random(0, width),
        y: random(-height * 0.5, 0),
        vx: random(-1.5, 1.5),
        vy: random(1, 4),
        size: random(6, 14),
        color: random(colors),
        rot: random(0, TWO_PI),
        rotSpeed: random(-0.1, 0.1)
    };
}

function appendFinishButtons(){
    // 移除舊的容器
    const meta = document.querySelector('.meta');
    if (!meta) return;
    let container = document.getElementById('finishActions');
    if (container) container.remove();
    container = document.createElement('div');
    container.id = 'finishActions';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.marginTop = '10px';

    const retryBtn = document.createElement('button');
    retryBtn.id = 'retryBtn';
    retryBtn.textContent = '再試一次';
    retryBtn.className = 'next';
    retryBtn.addEventListener('click', ()=>{
        // 直接重新開始新回合
        // 隱藏 finish actions
        container.remove();
        finished = false;
        confetti = [];
        finalMessage = '';
        finalSubtitle = '';
        startQuiz();
    });

    const backBtn = document.createElement('button');
    backBtn.id = 'backBtn';
    backBtn.textContent = '回到開始';
    backBtn.className = 'next';
    backBtn.addEventListener('click', ()=>{
        container.remove();
        // 顯示開始畫面、隱藏 quiz
        const startScreen = document.getElementById('startScreen');
        const quiz = document.getElementById('quiz');
        if (quiz) quiz.classList.add('hidden');
        if (startScreen) startScreen.classList.remove('hidden');
        finished = false;
        confetti = [];
        finalMessage = '';
        finalSubtitle = '';
        noLoop();
        // 隱藏成績畫布，因為回到單元選單
        const holder = document.getElementById('canvasHolder');
        if (holder) holder.classList.add('hidden');
    });

    container.appendChild(retryBtn);
    container.appendChild(backBtn);
    meta.appendChild(container);
}

function draw() {
    background(250);
    stroke(200);
    noFill();
    rect(8, 8, width - 16, height - 16, 8);

    textAlign(CENTER);
    if (!finished) {
        fill(80);
        textSize(20);
        text('答題中，請在上方介面作答；完成後在此顯示成績。', width / 2, height / 2);
        return;
    }

    // 顯示最終成績
    const percentage = maxScore > 0 ? Math.round((finalScore / maxScore) * 100) : 0;
    // 大標題與顏色
    textSize(32);
    if (percentage >= 90) fill(0, 140, 80);
    else if (percentage >= 70) fill(40, 120, 200);
    else if (percentage >= 50) fill(255, 170, 30);
    else fill(200, 0, 0);

    text(finalMessage, width / 2, height / 2 - 50);

    // 子標
    textSize(16);
    fill(80);
    text(finalSubtitle, width / 2, height / 2 - 20);

    // 顯示分數和百分比
    textSize(22);
    fill(60);
    text(scoreText + `  （正確率: ${percentage}%）`, width / 2, height / 2 + 10);

    // 畫徽章
    push();
    const badgeX = width / 2;
    const badgeY = height - 70;
    translate(badgeX, badgeY);
    noStroke();
    if (percentage >= 90) {
        fill(255, 215, 0);
        ellipse(0, 0, 110, 110);
        fill(255);
        textSize(36);
        text('🏅', 0, 10);
    } else if (percentage >= 70) {
        fill(200, 230, 255);
        ellipse(0, 0, 90, 90);
        fill(80);
        textSize(32);
        text('🌟', 0, 10);
    } else if (percentage >= 50) {
        fill(240, 240, 200);
        ellipse(0, 0, 80, 80);
        fill(80);
        textSize(28);
        text('👍', 0, 10);
    } else {
        fill(255, 220, 220);
        ellipse(0, 0, 80, 80);
        fill(80);
        textSize(28);
        text('💪', 0, 10);
    }
    pop();

    // 更新並繪製 confetti
    for (let i = confetti.length - 1; i >= 0; i--) {
        const p = confetti[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.rot += p.rotSpeed;

        push();
        translate(p.x, p.y);
        rotate(p.rot);
        noStroke();
        fill(p.color);
        rectMode(CENTER);
        rect(0, 0, p.size, p.size * 0.6);
        pop();

        // 移除超出畫布的粒子
        if (p.y > height + 50) confetti.splice(i, 1);
    }

    // 若 confetti 已清空，停止動畫循環以節省資源
    if (confetti.length === 0) {
        noLoop();
    }
}