const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const window_height = window.innerHeight/1.5;
const window_width = window.innerWidth/1.5;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

function getRandomColor() {
    // Generar un color hexadecimal aleatorio
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dy = -this.speed;
        this.clicked = false;
    }
    
    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        
        
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
    }

    update(context) {
        if (!this.clicked) {
            this.draw(context);
            this.posY += this.dy;

            
            if (this.posY + this.radius < 0) {
                this.reset();
            }
        }
    }

    reset() {
        this.posX = Math.random() * window_width;
        this.posY = window_height + this.radius; 
        this.color = getRandomColor();
        this.clicked = false;
    }

    isClicked(x, y) {
        const distance = Math.sqrt((x - this.posX) ** 2 + (y - this.posY) ** 2);
        return distance <= this.radius;
    }

    disappear() {
        this.clicked = true; 
    }
}

let circles = [];
for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * window_width;
    let randomRadius = Math.floor(Math.random() * 50 + 30);
    let circle = new Circle(randomX, window_height + randomRadius, randomRadius, getRandomColor(), (i + 1).toString(), 5);
    circles.push(circle);
}

function updateCanvas() {
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach(circle => {
        if (!circle.clicked) {
            circle.update(ctx);
        }
    });
    requestAnimationFrame(updateCanvas);
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    circles.forEach(circle => {
        if (circle.isClicked(mouseX, mouseY)) {
            circle.disappear();
        }
    });
});

function drawInitial() {
    circles.forEach(circle => {
        circle.draw(ctx);
    });
    updateCanvas();
}

drawInitial();
