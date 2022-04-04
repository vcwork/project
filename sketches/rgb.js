new p5((p) =>{
    let angle = 0; //declare a variable for the initial angle
    let currentAnglePercentage = 0;

    function getCurrentAngle() {
        return map(currentAnglePercentage % 100, 0, 100, 0, 360);
    }

    p.setup = function (){
        createCanvas(400, 400);
        noStroke();
    }
    
    p.draw = function(){
        currentAnglePercentage++;
        background(255);
        noStroke;
        angleMode(DEGREES);
        ellipseMode(CENTER);

        let posX = 200; //change the x axis
        let posY = 200; //change the y axis
        let reSize = 200; //change the size
        let rotationSpeed = 0; //change the rotation speed

        let radius = 0;
        let x = radius * cos(angle);
        let y = radius * sin(angle);

        const c1a1 = 0 + getCurrentAngle();
        const c1a2 = 120 + getCurrentAngle();

        const c2a1 = 120 + getCurrentAngle();
        const c2a2 = 240 + getCurrentAngle();

        const c3a1 = 240 + getCurrentAngle();
        const c3a2 = 360 + getCurrentAngle();

        fill('red');
        arc(posX + x, posY + y, reSize, reSize, c1a1, c1a2);

        fill('blue');
        arc(posX + x, posY + y, reSize, reSize, c2a1, c2a2);

        fill('green');
        arc(posX + x, posY + y, reSize, reSize, c3a1, c3a2);

        angle += rotationSpeed;
    }
}, "rgb");