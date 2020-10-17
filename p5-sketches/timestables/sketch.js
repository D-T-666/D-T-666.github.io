let lines1 = [];
let lines2 = [];
let total = 250;
let assemble = false;
let framecount_start = 0;

function getVector(index, total) {
    const angle = map(index % total, 0, total, 0, TWO_PI);
    const v = p5.Vector.fromAngle(angle + PI);
    v.mult(width / 5);
    v.x += width / 2;
    v.y += height / 2;
    return v;
}

function setup() {
    createCanvas(windowWidth, windowHeight / 1.1);
    for (let i = 0; i < total; i++) {
        const p1 = getVector(i, total);
        const p2 = getVector(i + total / 2, total);
        lines1.push(new Line(
            p1,
            p2
        ));
    }
    colorMode(HSB, 255, 255, 255, 255);
}

function start_assembling() {
    reset();
    framecount_start = frameCount;
    assemble = true;

    let factor = document.getElementById("factor").value;

    lines2 = [];
    for (let i = 0; i < total; i++) {
        const p1 = getVector(i, total);
        const p2 = getVector(i * factor, total);
        lines2.push(new Line(
            p1,
            p2
        ));
    }
}

function reset() {
    for (let i = 0; i < lines1.length; i++) {
        if (assemble) {
            let amt = frameCount / 120 + (i + 1) / (50) - total / 50 - framecount_start / 120;
            lines1[i] = lines1[i].lerp(lines2[i], amt);
        }
    }
    assemble = false;
}

function draw() {
    background(51);
    stroke(220);
    for (let i = 0; i < lines1.length; i++) {
        let l;
        if (assemble) {
            let amt = frameCount / 120 + (i + 1) / (50) - total / 50 - framecount_start / 120;
            l = lines1[i].lerp(lines2[i], amt);
            stroke(i / total * 255, 200, 255, constrain(amt, 0, 1) * 100 + 105);
        } else {
            l = lines1[i].wander(i);
            stroke(i / total * 255, 200, 255, 100);
        }
        l.show();
    }



    /* show initial lines */
    // stroke(0, 160, 255);
    // for (let l of lines2) {
    //     l.show()
    // }
    /* show destination lines */
    // stroke(255, 160, 0);
    // for (let l of lines1) {
    //     l.show()
    // }
}