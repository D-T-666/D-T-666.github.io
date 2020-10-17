class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    wander(i) {
        this.p1.x += noise(i, frameCount / 100, 0) * 4 - 2;
        this.p1.y += noise(i, frameCount / 100, 1) * 4 - 2;
        this.p2.x += noise(i, frameCount / 100, .1) * 4 - 2;
        this.p2.y += noise(i, frameCount / 100, .9) * 4 - 2;
        return this;
    }

    lerp(other, amt = 0.5) {
        let new_p1 = p5.Vector.lerp(this.p1, other.p1, easeInOutSine(amt));
        let new_p2 = p5.Vector.lerp(this.p2, other.p2, easeInOutSine(amt));
        return new Line(new_p1, new_p2);
    }

    show() {
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}

function easeInOutSine(x) {
    if (x >= 0 && x <= 1) return -(cos(PI * x) - 1) / 2;
    else if (x < 0) return 0;
    else return 1;
}