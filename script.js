document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the canvas and its context
    const canvas = document.getElementById('drawingCanvas');
    // The getContext('2d') method returns an object that provides
    // methods and properties for drawing and manipulating the canvas.
    const ctx = canvas.getContext('2d');

    // 2. Get control elements
    const colorPicker = document.getElementById('colorPicker');
    const sizeSlider = document.getElementById('sizeSlider');
    const clearButton = document.getElementById('clearButton');

    // 3. Set initial drawing properties
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set canvas dimensions explicitly in JS (important for proper drawing scale)
    // Note: It's best practice to set canvas width/height properties, not just CSS
    canvas.width = 800; 
    canvas.height = 600;

    // Set initial context properties
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = sizeSlider.value;
    ctx.lineCap = 'round'; // Makes the end of lines rounded

    // --- Event Handlers ---

    // Function to start drawing
    function startDrawing(e) {
        isDrawing = true;
        // Update the starting position
        [lastX, lastY] = [e.offsetX, e.offsetY]; 
    }

    // Function to draw lines
    function draw(e) {
        if (!isDrawing) return; // Stop the function if they are not moused down

        // Update context properties (in case the user changed them)
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = sizeSlider.value;

        ctx.beginPath(); // Start a new path

        // Move the brush to the last known position
        ctx.moveTo(lastX, lastY); 
        
        // Draw a line to the new position
        ctx.lineTo(e.offsetX, e.offsetY); 
        
        ctx.stroke(); // Apply the stroke (draw the line)

        // Update the last known position
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to stop drawing
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Function to clear the canvas
    function clearCanvas() {
        // Clear the entire canvas rectangle
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }

    // --- Attach Listeners ---

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing); // Start drawing when mouse button is pressed
    canvas.addEventListener('mousemove', draw);        // Continue drawing while mouse is moving
    canvas.addEventListener('mouseup', stopDrawing);    // Stop drawing when mouse button is released
    canvas.addEventListener('mouseout', stopDrawing);   // Stop drawing if mouse leaves the canvas

    // Clear button event
    clearButton.addEventListener('click', clearCanvas);
});
