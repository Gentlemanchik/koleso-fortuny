const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const modal = document.getElementById('modal');
const modalDescription = document.getElementById('modalDescription'); 
const closeModalBtn = document.getElementById('closeModalBtn');
const modalImage = document.getElementById('modalImage');
const fireEffect = document.getElementById('fireEffect');
const redOverlay = document.getElementById('redOverlay');
const clickSound = new Audio('click.mp3');
const spinSound = new Audio('spin.mp3');
const winSound = new Audio('win.mp3');
const vaipSound = new Audio('vaip.mp3');
const jakpotSound = new Audio('jackpot.mp3');
const minus500Sound = new Audio('500propil.mp3');
const minus300Sound = new Audio('300minus.mp3');
const plus500Sound = new Audio('500plus.mp3');
const thiefSound = new Audio('thief.mp3');
const plus300Sound = new Audio('300plusSound.mp3');
const minus100Sound = new Audio('100minussound.mp3');
const plus100Sound = new Audio('100plussound.mp3');
const swapSound = new Audio('svapSound.mp3');
const lightBeams = document.getElementById('lightBeams');

plus500Sound.volume = 0.6;
jakpotSound.volume = 0.8;
clickSound.volume = 0.5;
spinSound.volume = 0.4;
winSound.volume = 0.6;
vaipSound.volume = 0.6;
minus500Sound.volume = 0.6;
minus300Sound.volume = 0.15;
thiefSound.volume = 0.5;
plus300Sound.volume = 0.5;
minus100Sound.volume = 0.7;
plus100Sound.volume = 0.7;
swapSound.volume = 0.9;
spinSound.loop = true;

//Функции для лучей
function showLightBeams() {
    lightBeams.style.display = 'block';
}

function hideLightBeams() {
    lightBeams.style.display = 'none';
}

// Функция для остановки музыки вращения
function stopSpinMusic() {
    spinSound.pause();
    spinSound.currentTime = 0;  // перематываем на начало
}

//
function stopAllSound() {
    plus500Sound.pause();
    plus500Sound.currentTime = 0;
    jakpotSound.pause();
    jakpotSound.currentTime = 0;
    winSound.pause();
    winSound.currentTime = 0;
    vaipSound.pause();
    vaipSound.currentTime = 0;
    minus500Sound.pause();
    minus500Sound.currentTime = 0;
    minus300Sound.pause();
    minus300Sound.currentTime = 0;
    thiefSound.pause();
    thiefSound.currentTime = 0;
    plus300Sound.pause();
    plus300Sound.currentTime = 0;
    minus100Sound.pause();
    minus100Sound.currentTime = 0;
    plus100Sound.pause();
    plus100Sound.currentTime = 0;
    swapSound.pause();
    swapSound.currentTime = 0;
}

//-------------------------------------------------------
// Функции для воспроизведения звуков выпавших секторов
//-------------------------------------------------------
function playStishok() {
    winSound.currentTime = 0;
    winSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playVaip() {
    vaipSound.currentTime = 0;
    vaipSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playJackpot() {
    jakpotSound.currentTime = 0;
    jakpotSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playMinus500() {
    minus500Sound.currentTime = 0;
    minus500Sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playMinus300() {
    minus300Sound.currentTime = 0;
    minus300Sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playPlus500() {
    plus500Sound.currentTime = 0;
    plus500Sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playThief500() {
    thiefSound.currentTime = 0;
    thiefSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playPlus300() {
    plus300Sound.currentTime = 0;
    plus300Sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playMinus100() {
    minus100Sound.currentTime = 0;
    minus100Sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playPlus100() {
    plus100Sound.currentTime = 0;
    plus100Sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

function playSwap() {
    swapSound.currentTime = 0;
    swapSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

//-------------------------------------------------------

function startJackpotEffects() {
    fireEffect.style.display = 'block';
    redOverlay.style.display = 'block';
    
    // Трясём только модальное окно
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('shake');
}

function stopJackpotEffects() {
    fireEffect.style.display = 'none';
    redOverlay.style.display = 'none';
    
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.remove('shake');
}

//Цввета для конфети

const confettiColors = [
    '#FF0000',  // Красный
    '#FF4500',  // Оранжево-красный
    '#FF6600',  // Оранжевый
    '#FF9900',  // Золотисто-оранжевый
    '#FFCC00',  // Жёлтый
    '#FFD700',  // Золотой
    '#FFFF00',  // Ярко-жёлтый
    '#ADFF2F',  // Жёлто-зелёный
    '#00FF00',  // Зелёный
    '#32CD32',  // Лаймово-зелёный
    '#00FF7F',  // Весенне-зелёный
    '#00FFFF',  // Циан (голубой)
    '#00BFFF',  // Глубокий голубой
    '#1E90FF',  // Синий
    '#0000FF',  // Ярко-синий
    '#4B0082',  // Индиго
    '#8A2BE2',  // Сине-фиолетовый
    '#9400D3',  // Тёмно-фиолетовый
    '#FF00FF',  // Пурпурный
    '#FF1493',  // Глубокий розовый
    '#FF69B4',  // Розовый
    '#FFB6C1',  // Светло-розовый
    '#FFC0CB',  // Розовый (пастель)
    '#FFFFFF',  // Белый
    '#E0E0E0'   // Светло-серый
];

// Своя функция для конфети
function fireConfettiOverModal() {
    // Создаём холст поверх всего
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.width = '300%';
    canvas.style.height = '300%';
    canvas.style.zIndex = '2000';
    canvas.style.pointerEvents = 'none';
    canvas.style.background = 'transparent';
    document.body.appendChild(canvas);
    
    const myConfetti = confetti.create(canvas, { 
        resize: true  
    });
    //1
    myConfetti({
    particleCount: 300,
    spread: 360,
    shapes: ['star'],           
    colors: confettiColors
    });
//2
    setTimeout(() => {
        myConfetti({
        particleCount: 300,
        spread: 360,
        angle: 45,
        origin: { x: 0.55, y: 0.55 },
        shapes: ['star'],           
        colors: confettiColors
        });
//3
    }, 1200);
    setTimeout(() => {
        myConfetti({
        particleCount: 300,
        spread: 360,
        angle: 45,
        origin: { x: 0.45, y: 0.7 },
        shapes: ['star'],           
        colors: confettiColors
        });
//4
    }, 2400);
    setTimeout(() => {
        myConfetti({
        particleCount: 300,
        spread: 360,
        angle: 45,
        origin: { x: 0.425, y: 0.40 },
        shapes: ['star'],           
        colors: confettiColors
        });
//5
    }, 3600);
    setTimeout(() => {
        myConfetti({
        particleCount: 300,
        spread: 360,
        angle: 45,
        origin: { x: 0.53, y: 0.45 },
        shapes: ['star'],           
        colors: confettiColors
        });
//6
    }, 4800);
    setTimeout(() => {
        myConfetti({
        particleCount: 300,
        spread: 360,
        angle: 45,
        origin: { x: 0.59, y: 0.4 },
        shapes: ['star'],           
        colors: confettiColors
        });
//7
    }, 6000);
    setTimeout(() => {
        myConfetti({
        particleCount: 300,
        spread: 360,
        angle: 45,
        origin: { x: 0.44, y: 0.36 },
        shapes: ['star'],           
        colors: confettiColors
        });

    }, 7000);
}

// --------------------------------------------------------------
// НАСТРОЙКИ СЕКТОРОВ (меняйте здесь!)
// --------------------------------------------------------------
// Каждый объект: { name: "Название приза", weight: вес }
// Чем больше weight, тем шире сектор
const segmentsData = [
    { name: "Рассказать стишок", weight: 1, description: "Рассказывайт стишок, дорогой. За это получишь баллы!" },      //++
    { name: "-500", weight: 1, description: "Ты пропил 500 очков. Увы." },   //++
    { name: "ДЖЕКПОТ", weight: 1, description: "+1500"},    //++
    { name: "-300", weight: 1, description: "От тебя уходят 300 очков. Какая жалость(" },    //++
    { name: "+500", weight: 1, description: "Лови 500 очков!" }, //++
    { name: "ДЕРЖИ ВОРА", weight: 1, description: "Тебе удалось украсть у лидера стола 500 очков!" }, //++
    { name: "+300 ", weight: 1, description: "Котейка принёс тебе 300 очков." },     //++
    { name: "ВАЙП", weight: 1, description: "ПРИЧИНА ТРЯСКИ: ВАЙП! ОЧКИ ВСЕХ ИГРОКОВ ОБНУЛЯЮТСЯ!" }, //++
    { name: "-100", weight: 1, description: "Внезапная плата за участие. Ты отдаёшь 100 очков." }, //++   
    { name: "СВАП", weight: 1, description: "Свапнись очками с любым игроком стола на выбор."},     //
    { name: "+100", weight: 1, description: "А нет, это не чирик. Это 100 очков!" }     // 
];

// Цвета для секторов (можно добавить больше)
const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF9F1C", "#B5E2FA", "#F7C548", "#A8E6CF", "#FF8B94", "#C44569", "#F3A683"];

// --------------------------------------------------------------
// РАСЧЁТ УГЛОВ СЕКТОРОВ (автоматический)
// --------------------------------------------------------------
let segments = [];       // массив названий (для совместимости)
let segmentAngles = [];  // массив с углами начала каждого сектора

// Вычисляем общий вес и углы
let totalWeight = 0;
for (let s of segmentsData) {
    totalWeight += s.weight;
}

let currentStart = 0;
for (let i = 0; i < segmentsData.length; i++) {
    const angleSize = (segmentsData[i].weight / totalWeight) * Math.PI * 2;
    segmentAngles.push({
        start: currentStart,
        end: currentStart + angleSize,
        name: segmentsData[i].name,
        weight: segmentsData[i].weight
    });
    segments.push(segmentsData[i].name);
    currentStart += angleSize;
}

let currentRotation = 0;  // текущий поворот колеса
let spinning = false;

// --------------------------------------------------------------
// РИСОВАНИЕ КОЛЕСА (адаптировано под разные размеры секторов)
// --------------------------------------------------------------
function drawWheel(rotationAngle) {
    const size = canvas.width;
    const center = size / 2;
    const radius = size / 2 - 10;

    for (let i = 0; i < segmentAngles.length; i++) {
        const seg = segmentAngles[i];
        const start = seg.start + rotationAngle;
        const end = seg.end + rotationAngle;
        
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, end);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        // Рисуем текст
        ctx.save();
        ctx.translate(center, center);
        const midAngle = start + (seg.end - seg.start) / 2;
        ctx.rotate(midAngle);
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = "26px 'MyCustomFont'";
        ctx.fillText(seg.name, radius * 0.65, 10);
        ctx.restore();
        
        // Обводка сектора
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, end);
        ctx.lineTo(center, center);
        ctx.stroke();
    }
    
    // Стрелка справа
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.moveTo(center + 35, center - 20);
    ctx.lineTo(center + 35, center + 20);
    ctx.lineTo(center + 120, center);
    ctx.fill();

    // Центральное изображение (вместо жёлтого кружка)
    const centerImg = new Image();
    centerImg.src = "circle.png";  // имя вашего файла
    
    // Немного ждём загрузки картинки, чтобы она появилась
    if (centerImg.complete) {
        drawCenterImage();
    } else {
        centerImg.onload = drawCenterImage;
    }
    
    function drawCenterImage() {
        const imgSize = 150;  // размер картинки в пикселях (можно менять)
        ctx.drawImage(centerImg, center - imgSize/2, center - imgSize/2, imgSize, imgSize);
    }
}

// --------------------------------------------------------------
// ОПРЕДЕЛЕНИЕ ВЫИГРЫША (с учётом разных углов)
// --------------------------------------------------------------
function determineResult(finalRotation) {
    // Стрелка справа (угол 0)
    const pointerWorldAngle = 0;
    
    let rawAngle = finalRotation % (Math.PI * 2);
    const angleUnderPointer = (pointerWorldAngle - rawAngle + 2 * Math.PI) % (2 * Math.PI);
    
    // Находим сектор и запоминаем и название, и описание
    for (let i = 0; i < segmentAngles.length; i++) {
        const seg = segmentAngles[i];
        if (angleUnderPointer >= seg.start && angleUnderPointer < seg.end) {
            // Ищем описание в исходных данных
            const segmentData = segmentsData.find(s => s.name === seg.name);
            const description = segmentData ? segmentData.description : "";
            showResult(seg.name, description);
            return;
        }
    }
    
    // Если не нашли — показываем первый
    const firstData = segmentsData[0];
    showResult(firstData.name, firstData.description);
}
// --------------------------------------------------------------
// ВРАЩЕНИЕ КОЛЕСА
// --------------------------------------------------------------
function spinWheel() {
    if (spinning) return;
    spinning = true;

    // ЗАПУСКАЕМ МУЗЫКУ ВРАЩЕНИЯ
    spinSound.currentTime = 0;
    spinSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
    
    const spinAngle = 25 + Math.random() * 25; // Кол-во оборотов
    const duration = 200; //Время, в течении которого крутится колесо
    const startTime = performance.now();
    const startRotation = currentRotation;
    
    function animateSpin(now) {
        const elapsed = now - startTime;
        let t = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - t, 2.5); // Функция, отвечающая за замедление
        
        const newRotation = startRotation + spinAngle * easeOut;
        currentRotation = newRotation;
        drawWheel(currentRotation);
        
        if (t < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            spinning = false;
            stopSpinMusic();  // ОСТАНАВЛИВАЕМ МУЗЫКУ ВРАЩЕНИЯ
            determineResult(currentRotation);
        }
    }
    
    requestAnimationFrame(animateSpin);
}

// --------------------------------------------------------------
// ПОКАЗ РЕЗУЛЬТАТА
// --------------------------------------------------------------
function showResult(prize, description) {
    modalDescription.textContent = description || "Поздравляем!";
    let imagePath = "circle.png";
    modalImage.style.width = "320px";
    modalImage.style.height = "320px";
    modalDescription.style.maxWidth = "500px";
    modalDescription.style.fontSize = "38px";
    if (prize.includes("Рассказать")) {
        imagePath = "stishokYakubovich.png";
        playStishok();
    } 
    else if (prize.includes("ВАЙП")) {
        imagePath = "vaip.png";
        modalDescription.style.fontSize = "58px";
        modalImage.style.width = "1300px"; 
        modalImage.style.height = "600px";
        modalDescription.style.maxWidth = "90vw";
        startJackpotEffects();
        playVaip();
    }
    else if (prize.includes("ДЖЕКПОТ")) {
        modalImage.style.width = "700px"; 
        modalImage.style.height = "450px";
        modalDescription.style.fontSize = "148px";
        modalDescription.classList.add('jackpot');
        showLightBeams();  // ← ВКЛЮЧАЕМ ЛУЧИ
        imagePath = "jakpotgif.gif";
        playJackpot();
        fireConfettiOverModal();
    }
    else if (prize.includes("-500")) {
        modalImage.style.width = "700px"; 
        modalImage.style.height = "450px";
        imagePath = "500propil.png";
        playMinus500();
    }
    else if (prize.includes("-300")) {
        modalImage.style.width = "600px"; 
        modalImage.style.height = "450px";
        imagePath = "minus300.gif";
        playMinus300();
    }
    else if (prize.includes("+500")) {
        modalImage.style.width = "600px"; 
        modalImage.style.height = "450px";
        imagePath = "500plus.gif";
        playPlus500();
    }
    else if (prize.includes("ВОРА")) {
        modalImage.style.width = "500px"; 
        modalImage.style.height = "500px";
        imagePath = "500thief.gif";
        playThief500();
    }
    else if (prize.includes("+300")) {
        modalImage.style.width = "500px"; 
        modalImage.style.height = "500px";
        imagePath = "300plus.gif";
        playPlus300();
    }
    else if (prize.includes("-100")) {
        modalImage.style.width = "500px"; 
        modalImage.style.height = "500px";
        imagePath = "100minus.png";
        playMinus100();
    }
    else if (prize.includes("+100")) {
        modalImage.style.width = "500px"; 
        modalImage.style.height = "500px";
        imagePath = "100plus.png";
        playPlus100();
    }
    else if (prize.includes("СВАП")) {
        modalImage.style.width = "300px"; 
        modalImage.style.height = "500px";
        imagePath = "svap.gif";
        playSwap();
    }
    modalImage.src = imagePath;
    modal.style.display = "flex";
}

function hideModal() {
    modal.style.display = "none";
    modalDescription.classList.remove('jackpot');
    hideLightBeams();  // ← ВЫКЛЮЧАЕМ ЛУЧИ
    stopJackpotEffects(); // ← выключаем эффекты
    stopAllSound();
    if (e.target === modal) {
    hideModal();
    }
}

closeModalBtn.addEventListener('click', hideModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        hideModal();
    }
});

// --------------------------------------------------------------
// ЗАПУСК
// --------------------------------------------------------------
drawWheel(currentRotation);
spinBtn.addEventListener('click', function() {
    clickSound.currentTime = 0;  // перематываем на начало
    clickSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
    spinWheel();
});

