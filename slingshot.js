class SlingShot extends Phaser.Physics.Matter.Factory{
    constructor(x,y,body){
        const options = {
            pointA: {
                x: x,
                y: y
            },
            bodyB: body,
            stiffness: 1,
            length: 50,
        }
        this.sling = this.matter.add.mouseSpring(options);
        //this.sling = Matter.Constraint.create(options);
        //Matter.World.add(world,this.sling);
    }
    show(){
        stroke(255);
        const posA = this.sling.pointA;
        const posB = this.sling.bodyB.position;
        line(posA.x, posA.y, posB.x, posB.y);
    }
}