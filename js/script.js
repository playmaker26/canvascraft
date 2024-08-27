function resizeCanvas() {
    const canvas = document.querySelector('#drawingCanvas');
    const sidebarWidth = 150;
    const availableWidth = window.innerWidth - sidebarWidth;
    const availableHeight = window.innerHeight;

    canvas.width = availableWidth;
    canvas.height = availableHeight;
}
window.addEventListener('resize', resizeCanvas);

resizeCanvas();

function tools() {
    const canvas = document.querySelector('#drawingCanvas');
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    let pencil = document.querySelector('.pencil');
    let eraser = document.querySelector('.eraser');
    let shape = document.querySelector('.shape');
    let color = document.querySelector('.color');
    let fill = document.querySelector('.fill');
    let text = document.querySelector('.text');
    let undo = document.querySelector('.undo');
    let redo = document.querySelector('.redo');
    let zoomIn = document.querySelector('.zoom-in');
    let zoomOut = document.querySelector('.zoom-out');
    
    let drawing = false;

    pencil.addEventListener('click', () => {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
        canvas.addEventListener('touchcancel', startDrawing);
    });

    function getEventPosition(event) {
        if(event.touches) {
            return {
                x: event.touches[0].clientX - canvas.getBoundingClientRect().left,
                y: event.touches[0].clientY - canvas.getBoundingClientRect().top
            };
        }else {
            return{
                x: event.offsetX,
                y: event.offsetY
            };
        }
    }

    function startDrawing(event) {
        drawing = true;
        const pos = getEventPosition(event);
        context.beginPath();
        context.moveTo(pos.x, pos.y);
        event.preventDefault();
    }

    function draw(event) {
        if (!drawing) return;
        const pos = getEventPosition(event)
        context.lineTo(pos.x, pos.y);
        context.stroke();
        event.preventDefault();
    }

    function stopDrawing() {
        drawing = false;
        context.closePath();
    }

    eraser.addEventListener('click', () => {
        canvas.addEventListener('mousedown', startErasing);
        canvas.addEventListener('mousemove', erase);
        canvas.addEventListener('mouseup', stopErasing);
        canvas.addEventListener('mouseout', stopErasing);

        canvas.addEventListener('touchstart', startErasing);
        canvas.addEventListener('touchmove', erase);
        canvas.addEventListener('touchend', stopErasing);
        canvas.addEventListener('touchcancel', stopErasing);
    });

    function startErasing() {

    }

    function erase() {

    }

    function stopErasing() {

    }
}

tools();

