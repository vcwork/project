
new p5((p) =>{
    let angle = 0; //declare a variable for the initial angle
    let currentAnglePercentage = 0;

    function getCurrentAngle() {
        return map(currentAnglePercentage % 100, 0, 100, 0, 360);
    }

    p.setup = function (){
        p.createCanvas(400, 400);
        p.noStroke();
    };
    
    p.draw = function(){
        currentAnglePercentage++;
        p.background(255);
        noStroke;
        p.angleMode(DEGREES);
        p.ellipseMode(CENTER);

        let posX = 200; //change the x axis
        let posY = 200; //change the y axis
        let reSize = 200; //change the size
        let rotationSpeed = 0; //change the rotation speed

        let radius = 0;
        let x = radius * p.cos(angle);
        let y = radius * p.sin(angle);

        const c1a1 = 0 + getCurrentAngle();
        const c1a2 = 120 + getCurrentAngle();

        const c2a1 = 120 + getCurrentAngle();
        const c2a2 = 240 + getCurrentAngle();

        const c3a1 = 240 + getCurrentAngle();
        const c3a2 = 360 + getCurrentAngle();

        p.fill('red');
        p.arc(posX + x, posY + y, reSize, reSize, c1a1, c1a2);

        p.fill('blue');
        p.arc(posX + x, posY + y, reSize, reSize, c2a1, c2a2);

        p.fill('green');
        p.arc(posX + x, posY + y, reSize, reSize, c3a1, c3a2);

        angle += rotationSpeed;
    }
}, "rgb");