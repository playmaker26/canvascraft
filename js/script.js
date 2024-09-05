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
    let clear = document.querySelector('.clear');
    let zoomIn = document.querySelector('.zoom-in');
    let zoomOut = document.querySelector('.zoom-out');
    let drawing = false;
    let isFilling = false;
    let eraserSize = 50;
    let currentTool = null; 
    let selectedShape = null;
    let selectedColor = null;
    let selectedFontSize = null;
    let selectShape = 'none';
    let selectColor = 'none';
    let startX, startY;
    
// Fixed Event Listeners
pencil.addEventListener('click', () => {
    deactivateTool();
    activatePencil();
});

eraser.addEventListener('click', () => {
    deactivateTool();
    activateEraser();
});

shape.addEventListener('click', () => {
    deactivateTool();
    activateShape();
    modal('shape');
});

color.addEventListener('click', () => {
    deactivateTool();
    activateColor();
    modal('color');
});

fill.addEventListener('click', () => {
    deactivateTool();
    activateFill();
    modal('color');
});

text.addEventListener('click', () => {
    deactivateTool();
    activateText();
    modal('text');
});

undo.addEventListener('click', () => {
    deactivateTool();
    activateUndo();
});

redo.addEventListener('click', () => {
    deactivateTool();
    activateRedo();
});

clear.addEventListener('click', () => {
    deactivateTool();
    activateClear();
});

zoomIn.addEventListener('click', () => {
    deactivateTool();
    activateZoomIn();
});

zoomOut.addEventListener('click', () => {
    deactivateTool();
    activateZoomOut();
});

// Updated deactivateTool function
function deactivateTool() {
    // Deactivate Pencil
    canvas.removeEventListener('mousedown', startPencil);
    canvas.removeEventListener('mousemove', drawPencil);
    canvas.removeEventListener('mouseup', stopPencil);
    canvas.removeEventListener('mouseout', stopPencil);

    canvas.removeEventListener('touchstart', startPencil);
    canvas.removeEventListener('touchmove', drawPencil);
    canvas.removeEventListener('touchend', stopPencil);
    canvas.removeEventListener('touchcancel', stopPencil); 

    // Deactivate Eraser
    canvas.removeEventListener('mousedown', startEraser);
    canvas.removeEventListener('mousemove', drawEraser);
    canvas.removeEventListener('mouseup', stopEraser);
    canvas.removeEventListener('mouseout', stopEraser);

    canvas.removeEventListener('touchstart', startEraser);
    canvas.removeEventListener('touchmove', drawEraser);
    canvas.removeEventListener('touchend', stopEraser);
    canvas.removeEventListener('touchcancel', stopEraser);

    // Deactivate Shape
    canvas.removeEventListener('mousedown', startShape);
    canvas.removeEventListener('mousemove', drawShape);
    canvas.removeEventListener('mouseup', stopShape);
    canvas.removeEventListener('mouseout', stopShape);

    canvas.removeEventListener('touchstart', startShape);
    canvas.removeEventListener('touchmove', drawShape);
    canvas.removeEventListener('touchend', stopShape);
    canvas.removeEventListener('touchcancel', stopShape);

    // Deactivate Color
    canvas.removeEventListener('mousedown', startColor);
    canvas.removeEventListener('mousemove', drawColor);
    canvas.removeEventListener('mouseup', stopColor);
    canvas.removeEventListener('mouseout', stopColor);

    canvas.removeEventListener('touchstart', startColor);
    canvas.removeEventListener('touchmove', drawColor);
    canvas.removeEventListener('touchend', stopColor);
    canvas.removeEventListener('touchcancel', stopColor);

    // Deactivate Fill
    canvas.removeEventListener('mousedown', startFill);
    canvas.removeEventListener('mousemove', fillArea);
    canvas.removeEventListener('mouseup', stopFill);
    canvas.removeEventListener('mouseout', stopFill);

    canvas.removeEventListener('touchstart', startFill);
    canvas.removeEventListener('touchmove', fillArea);
    canvas.removeEventListener('touchend', stopFill);
    canvas.removeEventListener('touchcancel', stopFill);

    // Deactivate Text
    canvas.removeEventListener('mousedown', startText);
    canvas.removeEventListener('mousemove', drawText);
    canvas.removeEventListener('mouseup', stopText);
    canvas.removeEventListener('mouseout', stopText);

    canvas.removeEventListener('touchstart', startText);
    canvas.removeEventListener('touchmove', drawText);
    canvas.removeEventListener('touchend', stopText);
    canvas.removeEventListener('touchcancel', stopText);

    // Deactivate Undo
    canvas.removeEventListener('mousedown', startUndo);
    canvas.removeEventListener('mousemove', drawUndo);
    canvas.removeEventListener('mouseup', stopUndo);
    canvas.removeEventListener('mouseout', stopUndo);

    canvas.removeEventListener('touchstart', startUndo);
    canvas.removeEventListener('touchmove', drawUndo);
    canvas.removeEventListener('touchend', stopUndo);
    canvas.removeEventListener('touchcancel', stopUndo);

    // Deactivate Redo
    canvas.removeEventListener('mousedown', startRedo);
    canvas.removeEventListener('mousemove', drawRedo);
    canvas.removeEventListener('mouseup', stopRedo);
    canvas.removeEventListener('mouseout', stopRedo);

    canvas.removeEventListener('touchstart', startRedo);
    canvas.removeEventListener('touchmove', drawRedo);
    canvas.removeEventListener('touchend', stopRedo);
    canvas.removeEventListener('touchcancel', stopRedo);

    // Deactivate Clear
    canvas.removeEventListener('mousedown', startClear);
    canvas.removeEventListener('mousemove', drawClear);
    canvas.removeEventListener('mouseup', stopClear);
    canvas.removeEventListener('mouseout', stopClear);

    canvas.removeEventListener('touchstart', startClear);
    canvas.removeEventListener('touchmove', drawClear);
    canvas.removeEventListener('touchend', stopClear);
    canvas.removeEventListener('touchcancel', stopClear);

    // Deactivate ZoomIn
    canvas.removeEventListener('mousedown', startZoomIn);
    canvas.removeEventListener('mousemove', drawZoomIn);
    canvas.removeEventListener('mouseup', stopZoomIn);
    canvas.removeEventListener('mouseout', stopZoomIn);

    canvas.removeEventListener('touchstart', startZoomIn);
    canvas.removeEventListener('touchmove', drawZoomIn);
    canvas.removeEventListener('touchend', stopZoomIn);
    canvas.removeEventListener('touchcancel', stopZoomIn);

    // Deactivate ZoomOut
    canvas.removeEventListener('mousedown', startZoomOut);
    canvas.removeEventListener('mousemove', drawZoomOut);
    canvas.removeEventListener('mouseup', stopZoomOut);
    canvas.removeEventListener('mouseout', stopZoomOut);

    canvas.removeEventListener('touchstart', startZoomOut);
    canvas.removeEventListener('touchmove', drawZoomOut);
    canvas.removeEventListener('touchend', stopZoomOut);
    canvas.removeEventListener('touchcancel', stopZoomOut);
}


function activatePencil() {
    currentTool = 'pencil';
    canvas.addEventListener('mousedown', startPencil);
    canvas.addEventListener('mousemove', drawPencil);
    canvas.addEventListener('mouseup', stopPencil);
    canvas.addEventListener('mouseout', stopPencil);

    canvas.addEventListener('touchstart', startPencil);
    canvas.addEventListener('touchmove', drawPencil);
    canvas.addEventListener('touchend', stopPencil);
    canvas.addEventListener('touchcancel', stopPencil);
}

function activateEraser() {
    currentTool = 'eraser';
    canvas.addEventListener('mousedown', startEraser);
    canvas.addEventListener('mousemove', drawEraser);
    canvas.addEventListener('mouseup', stopEraser);
    canvas.addEventListener('mouseout', stopEraser);

    canvas.addEventListener('touchstart', startEraser);
    canvas.addEventListener('touchmove', drawEraser);
    canvas.addEventListener('touchend', stopEraser);
    canvas.addEventListener('touchcancel', stopEraser);
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

function activateColor() {
    currentTool = 'color';
        if (context) {
        context.strokeStyle = selectColor; // This will now include both dropdown and hex colors
    }
    canvas.addEventListener('mousedown', startColor);
    canvas.addEventListener('mousemove', drawColor);
    canvas.addEventListener('mouseup', stopColor);
    canvas.addEventListener('mouseout', stopColor);

    canvas.addEventListener('touchstart', startColor);
    canvas.addEventListener('touchmove', drawColor);
    canvas.addEventListener('touchend', stopColor);
    canvas.addEventListener('touchcancel', stopColor);
}

function activateFill() {
    currentTool = 'fill';
    canvas.addEventListener('mousedown', startFill);
    canvas.addEventListener('mousemove', fillArea);
    canvas.addEventListener('mouseup', stopFill);
    canvas.addEventListener('mouseout', stopFill);

    canvas.addEventListener('touchstart', startFill);
    canvas.addEventListener('touchmove', fillArea);
    canvas.addEventListener('touchend', stopFill);
    canvas.addEventListener('touchcancel', stopFill);
}

function activateText() {
    currentTool = 'text';
    canvas.addEventListener('mousedown', startText);
    canvas.addEventListener('mousemove', drawText);
    canvas.addEventListener('mouseup', stopText);
    canvas.addEventListener('mouseout', stopText);

    canvas.addEventListener('touchstart', startText);
    canvas.addEventListener('touchmove', drawText);
    canvas.addEventListener('touchend', stopText);
    canvas.addEventListener('touchcancel', stopText);
}

function activateUndo() {
    currentTool = 'undo';
    canvas.addEventListener('mousedown', startUndo);
    canvas.addEventListener('mousemove', drawUndo);
    canvas.addEventListener('mouseup', stopUndo);
    canvas.addEventListener('mouseout', stopUndo);

    canvas.addEventListener('touchstart', startUndo);
    canvas.addEventListener('touchmove', drawUndo);
    canvas.addEventListener('touchend', stopUndo);
    canvas.addEventListener('touchcancel', stopUndo);
}

function activateRedo() {
    currentTool = 'redo';
    canvas.addEventListener('mousedown', startRedo);
    canvas.addEventListener('mousemove', drawRedo);
    canvas.addEventListener('mouseup', stopRedo);
    canvas.addEventListener('mouseout', stopRedo);

    canvas.addEventListener('touchstart', startRedo);
    canvas.addEventListener('touchmove', drawRedo);
    canvas.addEventListener('touchend', stopRedo);
    canvas.addEventListener('touchcancel', stopRedo);
}

function activateClear() {
    currentTool = 'clear';
    canvas.addEventListener('mousedown', startClear);
    canvas.addEventListener('mousemove', drawClear);
    canvas.addEventListener('mouseup', stopClear);
    canvas.addEventListener('mouseout', stopClear);

    canvas.addEventListener('touchstart', startClear);
    canvas.addEventListener('touchmove', drawClear);
    canvas.addEventListener('touchend', stopClear);
    canvas.addEventListener('touchcancel', stopClear);
}

function activateZoomIn() {
    currentTool = 'zoomIn';
    canvas.addEventListener('mousedown', startZoomIn);
    canvas.addEventListener('mousemove', drawZoomIn);
    canvas.addEventListener('mouseup', stopZoomIn);
    canvas.addEventListener('mouseout', stopZoomIn);

    canvas.addEventListener('touchstart', startZoomIn);
    canvas.addEventListener('touchmove', drawZoomIn);
    canvas.addEventListener('touchend', stopZoomIn);
    canvas.addEventListener('touchcancel', stopZoomIn);
}

function activateZoomOut() {
    currentTool = 'zoomOut';
    canvas.addEventListener('mousedown', startZoomOut);
    canvas.addEventListener('mousemove', drawZoomOut);
    canvas.addEventListener('mouseup', stopZoomOut);
    canvas.addEventListener('mouseout', stopZoomOut);

    canvas.addEventListener('touchstart', startZoomOut);
    canvas.addEventListener('touchmove', drawZoomOut);
    canvas.addEventListener('touchend', stopZoomOut);
    canvas.addEventListener('touchcancel', stopZoomOut);
}

function activateShapeTool() {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('mousedown', startShape);
    canvas.addEventListener('mousemove', drawShape);
    canvas.addEventListener('mouseup', stopShape);

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


    function isValidHex(hex) {
        // Check if the hex code matches the pattern for 3 or 6 digit hex colors
        return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
    }
    


    //pencil
function startPencil(event) {
    drawing = true;
    const pos = getEventPosition(event);
    context.beginPath();
    context.moveTo(pos.x, pos.y);
    context.strokeStyle = 'black'; // Always black
    event.preventDefault();
}

function drawPencil(event) {
    if (!drawing) return;
    const pos = getEventPosition(event);
    context.lineTo(pos.x, pos.y);
    context.stroke();
    event.preventDefault();
}

function stopPencil() {
    if (drawing) {
        context.closePath();
        drawing = false;
    }
}
    
    

  //eraser
        function startEraser(event){
            drawing = true;
            drawEraser(event);
        }
    
        function drawEraser(event) {
            if (!drawing) return;
            const pos = getEventPosition(event);
            context.clearRect(pos.x - eraserSize / 2, pos.y - eraserSize / 2, eraserSize, eraserSize);
            event.preventDefault();
        }
    
        function stopEraser() {
            drawing = false;
        }



    //shape
    function startShape(event) {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#d3d3d3';
        
        if (event.type === 'mousedown') {
            startX = event.offsetX;
            startY = event.offsetY;
        } else if (event.type === 'touchstart') {
            const rect = canvas.getBoundingClientRect();
            startX = event.touches[0].clientX - rect.left;
            startY = event.touches[0].clientY - rect.top;
        }
        
        isDrawing = true;
        event.preventDefault();
    }
    
    function drawShape(event) {
        if (!selectShape || selectShape === 'none' || !isDrawing) return;
    
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const x = event.type === 'mousemove' ? event.offsetX : event.touches[0].clientX - canvas.getBoundingClientRect().left;
        const y = event.type === 'mousemove' ? event.offsetY : event.touches[0].clientY - canvas.getBoundingClientRect().top;
        const width = x - startX;
        const height = y - startY;
    
       // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for redraw
    
        ctx.beginPath();
        if (selectShape === 'rectangle') {
            ctx.fillRect(startX, startY, width, height);
            ctx.strokeRect(startX, startY, width, height);
        } else if (selectShape === 'circle') {
            const radius = Math.sqrt(width * width + height * height);
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        } else if (selectShape === 'triangle') {
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + width, startY + height);
            ctx.lineTo(startX - width, startY + height);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (selectShape === 'diamond') {
            ctx.moveTo(startX, startY - height / 2);
            ctx.lineTo(startX + width / 2, startY);
            ctx.lineTo(startX, startY + height / 2);
            ctx.lineTo(startX - width / 2, startY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (selectShape === 'oval') {
            // Ensure width and height are positive
            let radiusX = Math.max(width / 2, 0);
            let radiusY = Math.max(height / 2, 0);
        
            // Draw the ellipse
            ctx.beginPath(); // Ensure a new path is started
            ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        } else if (selectShape === 'hexagon') {
            const size = Math.min(width, height) / 2;
            ctx.moveTo(startX + size * Math.cos(0), startY + size * Math.sin(0));
            for (let i = 1; i < 6; i++) {
                ctx.lineTo(startX + size * Math.cos(i * 2 * Math.PI / 6), startY + size * Math.sin(i * 2 * Math.PI / 6));
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        
        ctx.closePath();
        event.preventDefault();
    }
    
    function stopShape(event) {
        if (!drawing) return;
    
        const canvas = event.target;
        const ctx = canvas.getContext('2d');
        drawing = false;
        event.preventDefault();
    }

        //color
        
        function startColor(event) {
            drawing = true;
            const pos = getEventPosition(event);
            context.beginPath();
            context.moveTo(pos.x, pos.y);
        
            // Call the correct function name: isValidHex
            if (isValidHex(selectColor)) {
                context.strokeStyle = selectColor;
                context.fillStyle = selectColor;
            } else {
                const colorMap = {
                    'none': '#000000',  // Default to black if 'none'
                    'black': '#000000',
                    'blue': '#0000FF',
                    'orange': '#FFA500',
                    'red': '#FF0000',
                    'yellow': '#FFFF00',
                    'green': '#00FF00'
                };
                context.strokeStyle = colorMap[selectColor] || '#000000'; // Default to black if invalid
                context.fillStyle = colorMap[selectColor] || '#000000';
            }
        
            event.preventDefault();
        }
        
        
        function drawColor(event) {
            if (!drawing) return;
            const pos = getEventPosition(event);
            context.lineTo(pos.x, pos.y);
            context.stroke();
            event.preventDefault();
        }
        
        function stopColor() {
            if (drawing) {
                context.closePath();
                drawing = false;
            }
        }

            //fill  

            

            

            


            function startFill() {

            }

    
    function fillArea() {}

    function stopFill() {
    }

        //text
        function startText(){

        }
    
        function drawText() {
    
        }
    
        function stopText() {
            
        }

            //undo
    function startUndo(){

    }

    function drawUndo() {

    }

    function stopUndo() {
        
    }

        //redo
        function startRedo(){

        }
    
        function drawRedo() {
    
        }
    
        function stopRedo() {
            
        }

            //clear
    function startClear(){

    }

    function drawClear() {

    }

    function stopClear() {
        
    }

        //zoom in
        function startZoomIn(){

        }
    
        function drawZoomIn() {
    
        }
    
        function stopZoomIn() {
            
        }

            //zoom out
    function startZoomOut(){

    }

    function drawZoomOut() {

    }

    function stopZoomOut() {
        
    }

    //objects and modal function

    let shapeObject = {
        label: 'Choose a shape.',
        shapeDropdown: [
            {option: 'None', value: 'none'},
            {option: 'Circle', value: 'circle'},
            {option: 'Triangle', value: 'triangle'},
            {option: 'Rectangle', value: 'rectangle'},
            {option: 'Diamond', value: 'diamond'},
            {option: 'Oval', value: 'oval'},
            {option: 'Hexagon', value: 'hexagon'}
        ]
    }

    let colorObject = {
        label: 'Choose a color.',
        colorDropdown: [
            {option: 'None', value: 'none'},
            {option: 'Black', value: 'black'},
            {option: 'Blue', value: 'blue'},
            {option: 'Orange', value: 'orange'},
            {option: 'Red', value: 'red'},
            {option: 'Yellow', value: 'yellow'},
            {option: 'Green', value: 'green'}
        ],
        labelInput: 'Type hex color code.'
    }

    let fontObject = {
        label: 'Choose a font size.',
        fontSizeDropdown: [
            {option: 'None', value: 'none'},
            {option: '8px', value: '8px'},
            {option: '10px', value: '10px'},
            {option: '12px', value: '12px'},
            {option: '14px', value: '14px'},
            {option: '16px', value: '16px'},
            {option: '18px', value: '18px'},
            {option: '20px', value: '20px'},
            {option: '24px', value: '24px'},
            {option: '28px', value: '28px'},
            {option: '32px', value: '32px'},
            {option: '36px', value: '36px'},
            {option: '40px', value: '40px'}
        ]
    }

// Define the modal function
function modal(type) {
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    let form = document.createElement('form');
    let content = '';

    // Generate content based on the type
    if (type === 'shape') {
        content = `
        <label class='label-shape'>${shapeObject.label}</label>
        <select class='select-shape'>
        ${shapeObject.shapeDropdown.map(dropdown => `
        <option value="${dropdown.value}">${dropdown.option}</option>
        `).join('')}
        </select>
        `;
    } else if (type === 'color') {
        content = ` 
        <label class='label-color'>${colorObject.label}</label>
        <select class='select-color'>
        ${colorObject.colorDropdown.map(colorDrop => `
        <option value="${colorDrop.value}">${colorDrop.option}</option>
        `).join('')}
        </select>
        <label class='label-hex'>${colorObject.labelInput}</label>
        <input type="text" placeholder="#000000" class='input-hex' maxlength="7" />
        `;
    } else if (type === 'text') {
        content = `
        <label class='label-font'>${fontObject.label}</label>
        <select class='select-font'>
        ${fontObject.fontSizeDropdown.map(font => `
        <option value="${font.value}">${font.option}</option>
        `).join('')}
        </select>
        `;
    }

    // Set the content and append it to the form
    form.innerHTML = content + `
    <div class="buttons">
        <button type='button' class='apply'>Apply</button>
        <button type='button' class='cancel'>Cancel</button>
    </div>
    `;

    // Append form to overlay and overlay to body
    overlay.appendChild(form);
    document.body.appendChild(overlay);

    // Query the elements after they have been added to the DOM
    let selectShapeElement = document.querySelector('.select-shape');
    const inputHex = document.querySelector('.input-hex');
    const dropdownColor = document.querySelector('.select-color');
    let selectFont = document.querySelector('.select-font');
let errorFound = false;
    // Add event listeners for buttons
    document.querySelector('.apply').addEventListener('click', () => {
        if(type === 'shape') {
            if(selectShapeElement) {
                if(selectShapeElement.value === 'none') {
                    document.querySelector('.label-shape').innerHTML = 'Pick a shape';
                    document.querySelector('.label-shape').style.color = 'red';
                    errorFound = true;
                }else {
                    document.querySelector('.label-shape').textContent = shapeObject.label;
                    document.querySelector('.label-shape').style.color = '';
                    selectShape = selectShapeElement.value; // Capture the selected shape
                    document.body.removeChild(overlay);
                    activateShapeTool();

                }
            }
        }

        if(type === 'color') {
            if(dropdownColor && inputHex) {
                // If both a dropdown color and hex code are selected
                if(dropdownColor.value !== 'none' && inputHex.value.trim() !== '') {
                    alert('Please choose either a color from the dropdown or enter a hex code, not both.');
                    errorFound = true;
                }
                // If neither a dropdown nor a valid hex code is selected
                else if(dropdownColor.value === 'none' && inputHex.value.trim() === '') {
                    document.querySelector('.label-color').innerHTML = 'Select a color';
                    document.querySelector('.label-color').style.color = 'red';
                    document.querySelector('.label-hex').innerHTML = 'Type a valid hex code';
                    document.querySelector('.label-hex').style.color = 'red';
                    errorFound = true;
                }
                // If a hex code is provided, validate it
                else if(inputHex.value.trim() !== '') {
                    let hexColor = inputHex.value.trim();
                    if(isValidHex(hexColor)) {
                        selectColor = hexColor; // Apply the hex color
                        document.body.removeChild(overlay);
                        activateColor(); // Use the color on the canvas
                    } else {
                        document.querySelector('.label-hex').innerHTML = 'Invalid hex code. Use format #RRGGBB or #RGB';
                        document.querySelector('.label-hex').style.color = 'red';
                        errorFound = true;
                    }
                }
                // If dropdown color is selected, apply it
                else {
                    selectColor = dropdownColor.value;
                    document.body.removeChild(overlay);
                    activateColor();
                }
            }
        }


  
        
    });

    document.querySelector('.cancel').addEventListener('click', () => {
        // Handle cancel action
        document.body.removeChild(overlay);
    });
}
    
}

tools();