class Particle{
    constructor(x, y, dirx, diry, col, alpha, lifetime=53, rotation_potency=0.0025){
        this.pos = createVector(x, y);
        this.ppos = this.pos.copy();
        this.direction = createVector(dirx, diry);
        this.direction.normalize();
        this.vel = p5.Vector.fromAngle(this.direction.heading()+(round(random(-2, 2))*(HALF_PI/2)));

        
        this.col = color(red(col), green(col), blue(col), alpha);
        this.glow_col = color(red(col), green(col), blue(col), alpha*0.1);
        

        this.start_time = lifetime;
        this.time = this.start_time;

        this.should_rotate = 0;
        this.rotation_potency = rotation_potency;
    }

    update(particle_array){
        this.ppos = this.pos.copy();
        this.pos.add(this.vel);

        if(random(1) < this.should_rotate){
            this.rotate();
            if(random(1) < 0.4){
                particle_array.push(new Particle(this.pos.x, this.pos.y, this.direction.x, this.direction.y, this.col, alpha(this.col)));
            }
            this.should_rotate = 0;
        }

        this.time--;
        this.should_rotate = lerp(this.should_rotate, 1, this.rotation_potency);
        if(this.time < 0){
            return true;
        }
    }

    rotate(){
        let vel_heading = this.vel.heading()+PI;
        let dir_heading = this.direction.heading()+PI;

        // if(dir_heading-vel_heading == PI*0.75){
        //     this.vel.rotate(-HALF_PI/2);
        // }else if(dir_heading-vel_heading == PI*0.75){
        //     this.vel.rotate(HALF_PI/2);
        // }else
        if(true){
            if(random(1) < 0.5){
                this.vel.rotate(HALF_PI/2);
            }else{
                this.vel.rotate(-HALF_PI/2);
            }
        }
    }

    show(){
        let stroke_weight = map(this.time, this.start_time, 0, 3, 2);
        stroke(this.col);
        strokeWeight(stroke_weight);
        line(this.pos.x, this.pos.y, this.ppos.x, this.ppos.y);
        stroke(this.glow_col);
        strokeWeight(stroke_weight+3);
        line(this.pos.x, this.pos.y, this.ppos.x, this.ppos.y);
    }
}