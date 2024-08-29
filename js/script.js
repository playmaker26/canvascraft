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
    let eraserSize = 50;
    let currentTool = null; // Track the current active tool

    pencil.addEventListener('click', () => {
        deactivateTools();
        activatePencil();
    });

    eraser.addEventListener('click', () => {
        deactivateTools();
        activateEraser();
    });

    shape.addEventListener('click', () => {
        deactivateTools();
        activateShape();
    });

    function deactivateTools() {
        // Remove pencil event listeners
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);

        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
        canvas.removeEventListener('touchcancel', stopDrawing);

        // Remove eraser event listeners
        canvas.removeEventListener('mousedown', startErasing);
        canvas.removeEventListener('mousemove', erase);
        canvas.removeEventListener('mouseup', stopErasing);
        canvas.removeEventListener('mouseout', stopErasing);

        canvas.removeEventListener('touchstart', startErasing);
        canvas.removeEventListener('touchmove', erase);
        canvas.removeEventListener('touchend', stopErasing);
        canvas.removeEventListener('touchcancel', stopErasing);

        // Remove shape event listeners
        canvas.removeEventListener('mousedown', startShape);
        canvas.removeEventListener('mousemove', drawShape);
        canvas.removeEventListener('mouseup', stopShape);
        canvas.removeEventListener('mouseout', stopShape);

        canvas.removeEventListener('touchstart', startShape);
        canvas.removeEventListener('touchmove', drawShape);
        canvas.removeEventListener('touchend', stopShape);
        canvas.removeEventListener('touchcancel', stopShape);

        drawing = false;
    }

    function activatePencil() {
        currentTool = 'pencil';
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
        canvas.addEventListener('touchcancel', stopDrawing);
    }

    function activateEraser() {
        currentTool = 'eraser';
        canvas.addEventListener('mousedown', startErasing);
        canvas.addEventListener('mousemove', erase);
        canvas.addEventListener('mouseup', stopErasing);
        canvas.addEventListener('mouseout', stopErasing);

        canvas.addEventListener('touchstart', startErasing);
        canvas.addEventListener('touchmove', erase);
        canvas.addEventListener('touchend', stopErasing);
        canvas.addEventListener('touchcancel', stopErasing);
    }

    function activateShape() {
        currentTool = 'shape';
        canvas.addEventListener('mousedown', startShape);
        canvas.addEventListener('mousemove', drawShape);
        canvas.addEventListener('mouseup', stopShape);
        canvas.addEventListener('mouseout', stopShape);

        canvas.addEventListener('touchstart', startShape);
        canvas.addEventListener('touchmove', drawShape);
        canvas.addEventListener('touchend', stopShape);
        canvas.addEventListener('touchcancel', stopShape);
    }

    function getEventPosition(event) {
        if (event.touches) {
            return {
                x: event.touches[0].clientX - canvas.getBoundingClientRect().left,
                y: event.touches[0].clientY - canvas.getBoundingClientRect().top
            };
        } else {
            return {
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
        const pos = getEventPosition(event);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        event.preventDefault();
    }

    function stopDrawing() {
        drawing = false;
        context.closePath();
    }

    function startErasing(event) {
        drawing = true;
        erase(event); // Start erasing immediately
    }

    function erase(event) {
        if (!drawing) return;
        const pos = getEventPosition(event);
        context.clearRect(pos.x - eraserSize / 2, pos.y - eraserSize / 2, eraserSize, eraserSize);
        event.preventDefault();
    }

    function stopErasing() {
        drawing = false;
    }

    function activateShape() {
        currentTool = 'shape';
        modal();

        document.querySelector('.apply').addEventListener('click', function(event) {
            event.preventDefault();

            shapeData = {
                type: document.querySelector('.shape-select').value                
            };

            canvas.addEventListener('mousedown', startShape);
            canvas.addEventListener('mousemove', drawShape);
            canvas.addEventListener('mouseup', stopShape);
            canvas.addEventListener('mouseout', stopShape);

            canvas.addEventListener('touchstart', startShape);
            canvas.addEventListener('touchmove', drawShape);
            canvas.addEventListener('touchend', stopShape);
            canvas.addEventListener('touchcancel', stopShape);
        });
    }

    function startShape(event) {
        drawing = true;
        const pos = getEventPosition(event);
        startX = pos.x;
        startY = pos.y;
        context.beginPath();
    }

    function drawShape(event) {
        if(!drawing) return;
        const pos = getEventPosition(event);
        const width = pos.x - startX;
        const height = pos.y - startY;
        context.clearRect(0, 0, canvas.width, canvas.height);

        switch (shapeData.type) {
            case 'Circle':
            const radius = Math.sqrt(width * width + height * height);
            context.arc(startX, startY, radius, 0, 2 * Math.PI);
            break;

            case 'Triangle':
                context.moveTo(startX, startY);
                context.lineTo(startX + width, startY);
                context.lineTo(startX + width / 2, startY - height);
                context.closePath();
                break;

            case 'Rectangle':
                context.rect(startX, startY, width, height);
                break;
            
            case 'Diamond':
                context.moveTo(startX, startY, + height / 2);
                context.lineTo(startX + width / 2, startY);
                context.lineTo(startX + width, startY + height / 2);
                context.lineTo(startX + width / 2, startY + height);
                context.closePath();
                break;

            case 'Oval':
                context.ellipse(startX, startY, Math.abs(width) / 2, Math.abs(height) / 2, 0, 0, 2 * Math.PI);
                break;

            case 'Cone':
                context.moveTo(startX, startY);
                context.lineTo(startX + width / 2, startY - height);
                context.lineTo(startX + width, startY);
                context.closePath();
                break;
        }
        context.stroke();
    }

    function stopShape() {
        drawing = false; 
        context.closePath();
    }

    function modal() {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        let form = document.createElement('form');
        form.classList.add('form');
    
        // Combining both shape and color sections into a single innerHTML assignment
        form.innerHTML = `
            <label>${shapeObject.label}</label>
            <select class= 'shape-select'>
                ${shapeObject.dropdown.map(shapes => `
                <option>${shapes.option}</option>
                `).join('')}
            </select>
    
            <label>${fontSize.labelFont}</label>  
            <select class= 'font-select'>
            ${fontSize.dropdown.map(fonts => `
            <option>${fonts.option}</option>
             `).join('')}
            </select>
               
            <label>${colorObject.labelDropdown}</label>
            <select class= 'color-select'>
                ${colorObject.dropdown.map(color => `
                <option>${color.option}</option>
                `).join('')}
            </select>
    
          
    
            <label>${colorObject.labelInput}</label>
            <input type="text" placeholder="#000000">
            <p>${colorObject.paragraph}</p>
            <div class= 'preview-color font-size'></div>
            <div class= 'buttons'>
            <button class='apply'>Apply</button>
            <button class= 'cancel'>Cancel</button>
            </div>
        `;
    
        overlay.appendChild(form);
        document.body.appendChild(overlay);
    }
    
    let shapeObject = {
        label: 'Choose a shape',
        dropdown: [
            {option: 'None'},
            {option: 'Circle'},
            {option: 'Triangle'},
            {option: 'Rectangle'},
            {option: 'Diamond'},
            {option: 'Oval'},
            {option: 'Cone'}
        ]
    };  
    
    let colorObject = {
        labelDropdown: 'Choose a color',
        dropdown: [
            {option: 'Black'},
            {option: 'White'},
            {option: 'Orange'},
            {option: 'Red'},
            {option: 'Grey'},
            {option: 'Blue'}
        ],
        labelInput: 'Type hex code',
        paragraph: 'Color preview'
    };

    let fontSize = {
        labelFont: 'Choose a font size',
        dropdown: [
            {option: 'None'},
            {option: '8px'},
            {option: '10px'},
            {option: '12px'},
            {option: '14px'},
            {option: '16px'},
            {option: '18px'},
            {option: '20px'},
            {option: '24px'},
            {option: '28px'},
            {option: '32px'},
            {option: '36px'},
            {option: '40px'}
        ]
    };
    
}

tools();