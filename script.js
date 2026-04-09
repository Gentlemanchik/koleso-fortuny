const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const modal = document.getElementById('modal');
const modalResult = document.getElementById('modalResult');
const modalDescription = document.getElementById('modalDescription');  // НОВАЯ СТРОЧКА
const closeModalBtn = document.getElementById('closeModalBtn');
const clickSound = new Audio('click.mp3');
const spinSound = new Audio('spin.mp3');
const winSound = new Audio('win.mp3');

clickSound.volume = 0.5;
spinSound.volume = 0.4;
winSound.volume = 0.6;
spinSound.loop = true;

// Функция для остановки музыки вращения
function stopSpinMusic() {
    spinSound.pause();
    spinSound.currentTime = 0;  // перематываем на начало
}

// Функция для воспроизведения звука выигрыша
function playWinSound() {
    winSound.currentTime = 0;
    winSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
}

// --------------------------------------------------------------
// НАСТРОЙКИ СЕКТОРОВ (меняйте здесь!)
// --------------------------------------------------------------
// Каждый объект: { name: "Название приза", weight: вес }
// Чем больше weight, тем шире сектор
const segmentsData = [
    { name: "Рассказать стишок", weight: 2, description: "Рассказывайт стишок, дорогой. За это получишь баллы!" }, 
    { name: "+500", weight: 2, description: "Лови 500 очков!" },      
    { name: "+300 ", weight: 3, description: "На тебе 300 очков." },        
    { name: "+100", weight: 5, description: "Под ногами валалось 100 очков." },     
    { name: "ДЖЕКПОТ!", weight: 1, description: "У-ЛЯ-ЛЯЯЯЯ!! +1500 ЭТОМУ ЧЕЛОВЕКУ!!!"},
    { name: "-500", weight: 2, description: "-500 очков. Увы." },      
    { name: "-300", weight: 3, description: "Не повезло, -300 очков." },       
    { name: "-100", weight: 5, description: "-100 очков. Ну, могло быть хуже." },       
    { name: "ДЕРЖИ ВОРА!", weight: 2, description: "Вам удалось украсть у лидера стола 500 очков!" },
    { name: "ВАЙП", weight: 1, description: "ЭТО ВАЙП НАХУЙ! ОЧКИ ВСЕХ ИГРОКОВ ОБНУЛЯЮТСЯ!" }, 
    { name: "СВАП!", weight: 2, description: "Свапмнись очками с ЛЮБЫМ игроком стола."}      
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
    
    const spinAngle = 25 + Math.random() * 25;
    const duration = 25000;
    const startTime = performance.now();
    const startRotation = currentRotation;
    
    function animateSpin(now) {
        const elapsed = now - startTime;
        let t = Math.min(1, elapsed / duration);
        
        // Плавное замедление (степень 4 для эффекта "доворачивания")
        const easeOut = 1 - Math.pow(1 - t, 4);
        
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
    modalResult.textContent = prize;
    modalDescription.textContent = description;
    modal.style.display = "flex";
    playWinSound();
}

function hideModal() {
    modal.style.display = "none";
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

