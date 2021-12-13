import './styles/index.css';

function slider() {
    const slider = document.querySelector('.slider-container'),
        slides = Array.from(document.querySelectorAll('.slide'))

    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        currentIndex = 0

    slides.forEach((slide, index) => {
        slide.addEventListener('touchstart', touchStart(index))
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)
    })

    function touchStart(index) {
        return function (event) {
            currentIndex = index
            startPos = getPositionX(event)
            isDragging = true
            slider.classList.add('grabbing')
        }
    }

    function touchEnd() {
        isDragging = false
        const movedBy = currentTranslate - prevTranslate
        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
        setPositionByIndex()
        slider.classList.remove('grabbing')
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event)
            currentTranslate = prevTranslate + currentPosition - startPos
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth
        prevTranslate = currentTranslate
        setSliderPosition()
    }
}
slider()

function generateSquares() {
    const btnGenerateSquares = document.querySelector('#btn__generate-squares')
    const addSquares = () => {
        const squares = document.querySelector('.squares')
        squares.innerHTML = ''

        const generateRandomNumber = (number) => {
            return (Math.random() * number).toFixed(0)
        }

        const numberOfSquares = generateRandomNumber(100)

        for (let i = 10; i < numberOfSquares; i++) {
            const pTop = generateRandomNumber(100)
            const pLeft = generateRandomNumber(100)
            const colors = {red: '', green: '', blue: ''}
            for (let key in colors) {
                colors[key] = generateRandomNumber(255)
            }
            const square = `<div class="square" style="bottom: ${pTop}%; right: ${pLeft}%;background-color:rgb(${colors.red},${colors.green},${colors.blue})"> </div>`
            squares.insertAdjacentHTML('afterbegin', square)
        }
    }

    btnGenerateSquares.addEventListener('click', addSquares)

}
generateSquares()

function showHiddenBlocks() {
    const btnShowBlock = document.querySelector('#btn__show-blocks')
    const blocks = document.querySelectorAll('.block')
    function debounce(f, ms) {
        let isCooldown = false;
        return function () {
            if (isCooldown) return;
            f.apply(this, arguments);
            isCooldown = true;
            setTimeout(() => isCooldown = false, ms);
        };

    }
    const toggleBlock = () => {
        blocks.forEach((block) => {
            block.classList.toggle('block_active')
        })
    }
    btnShowBlock.addEventListener('click', debounce(toggleBlock, 1000))
}
showHiddenBlocks()
function setCentralBlock(){
    const parentBlock = document.querySelector('.block__parent_js'),
        relativeBlock = parentBlock.querySelector('.block__relative')
    relativeBlock.style.margin = '0 auto';
}
setCentralBlock()

function canvas() {
    let canv = document.querySelector('#canvas'),
        rectangle = canv.getContext('2d'),
        square = canv.getContext('2d'),
        round = canv.getContext('2d'),
        triangle = canv.getContext('2d')

    canv.width = 800;
    canv.height = 600;

    let rectWidth =0

    setInterval(function (){
        rectangle.fillStyle = 'magenta';
        rectangle.clearRect(0,0,100,200)
        rectangle.fillRect(0,0, rectWidth, rectWidth*2)
        rectWidth++
        if (rectWidth > 100){
            rectWidth = 0
        }

    },30)

    rectangle.fillRect(0, 0, 100, 200)


    square.lineWidth = 10
    square.strokeStyle = 'cyan'
    square.strokeRect(745, 5, 50, 50)

    round.fillStyle = 'yellow'
    round.arc(50, canv.height - 50, 50, 0, Math.PI * 2, true)
    round.fill()

    triangle.strokeStyle = 'black'
    triangle.lineWidth = 5
    triangle.beginPath()
    triangle.moveTo(800, 600)
    triangle.lineTo(750, 500)
    triangle.lineTo(700, 600)
    triangle.closePath()
    triangle.stroke()


}
canvas()

function videoControl() {
    const videoElement = document.querySelector('#video')
    let videoDuration = document.querySelector('.video-duration')

    videoElement.addEventListener('loadedmetadata', (event) => {
        let getVideoDuration = String(videoElement.duration)
        videoDuration.textContent = 'Duration: ' + getVideoDuration.replace('.', ':')
    });

    videoElement.addEventListener('click', () => {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    })
}
videoControl()

function httpRequest() {
    let url = 'https://reqres.in/api/users'
    fetch(url)
        .then(response => response.json())
        .then(json => {
            json.data.forEach((item) => {
                console.log(item)
            })
        })
        .catch(err => console.log(err))
}
httpRequest()

function webSocket() {
    let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

    socket.onopen = function (e) {
        socket.send("TestMessage");
    };

    socket.onmessage = function (event) {
        console.log(`[message] Данные получены с сервера: ${event.data}`);
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
            console.log('[close] Соединение прервано');
        }
    };

    socket.onerror = function (error) {
        alert(`[error] ${error.message}`);
    };
}
webSocket()
