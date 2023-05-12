class Test extends Phaser.Scene {
    constructor() {
        super('test');
        let player;
       //let constraint;
    }
    preload(){
        this.load.image('playermarble', "assets/marble1.png");
        this.load.image('marble2',"assets/marble2.png");
        this.load.image('platform', "assets/platformfull.png");


    }
    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        let lastPosition = new Phaser.Math.Vector2();
        
        // let ground = this.matter.add.rectangle(this.w/2, this.h-100, this.w, 180, { isStatic: true });       
        // ground.setColor = "#9ff07a";
        //this.matter.add.image(this.w/2.0, this.h/2, 'platform');
        // let player = this.matter.add.image(500,50,'playermarble');
        // player.setCircle(430)
        // player.setScale(.05);
        // player.setBounce(.5);
        // player.setFriction(.001);
        this.player = new Player(this, 700,400,'playermarble');
        this.player.setInteractive();
        //console.log(this.player);
        
        let bounceme = this.matter.add.image(470,425,'marble2');
        bounceme.setCircle(400);
        bounceme.setScale(.04);
        bounceme.setBounce(.5);
        bounceme.setFriction(.001);
        bounceme.body.ignorePointer = true;
        let testmarble = new Marble(this, 450,100, 'marble2');
        // this.add.existing(testmarble);
        
        let ground = this.add.image(400, 500, 'platform', null, { isStatic: true });
        // //this.map = this.make.tilemap({ key: 'map' });
        const path = '-350 0 -350 75 100 125 450 75 450 0'
        let verts = this.matter.verts.fromPath(path);
        let fromvert = this.matter.add.fromVertices(ground.x,ground.y+45, verts, {isStatic: true,}, true, .01, 10);

        let ground2 = this.add.image(1500, 500, 'platform', null, { isStatic: true });
        // //this.map = this.make.tilemap({ key: 'map' });
        const path2 = '-350 0 -350 75 100 125 450 75 450 0'
        let verts2 = this.matter.verts.fromPath(path2);
        let fromvert2 = this.matter.add.fromVertices(ground2.x,ground2.y+45, verts, {isStatic: true,}, true, .01, 10);
    
        
        let constraint = Phaser.Physics.Matter.Matter.Constraint.create({
            pointA: {x: 700, y: 400},
            bodyB: this.player.body,
            length: 1,
            stiffness: .5
        });

      
        
        this.matter.world.add(constraint);
        let slingshot = this.matter.add.mouseSpring();
        this.player.on('pointerdown', function(pointer, constriant){
            constraint.pointA = {x: pointer.x, y: pointer.y};
        })
        this.input.on('pointerup', function(pointer){
            setTimeout(() =>{constraint.pointA = null}, 10);
        })
    
 

    }
    update(){
        
        if(this.player.body.speed > 5){
           this.player.body.speed = 5;
           console.log(this.player.body.speed);
           //this.constraint.pointA = null; 
        
        }
        //this.input.on('pointerdown', () => release(this.constraint, pointer.x, pointer.y));
         
        
    }

}

function release(x, y){
    console.log(x,y);
    this.constraint.pointA = {x: x, y: y}
    //this.matter.world.add(this.constraint);
    
}

class Marble extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, spriteTexture,) {
        super(scene.matter.world, x, y, spriteTexture, 0)
        this.setCircle(400);
        this.setScale(.04);
        this.setBounce(.5);
        this.setFriction(.001);
        this.body.ignorePointer = true;
        scene.add.existing(this)
    }
}

class Player extends Phaser.Physics.Matter.Image{
    constructor(scene, x, y, spriteTexture,) {
        super(scene.matter.world, x, y, spriteTexture, 0)
        this.setCircle(400);
        this.setScale(.05);
        this.setBounce(.5);
        this.setFriction(1);
        this.setDensity(10);
        this.setMass(10000);
        this.body.ignorePointer = false;
        scene.add.existing(this)
    }
    fly(){

    }
}
// class SlingShot extends Phaser.Physics.Matter.Factory{
//     constructor(scene,x,y,body){
//         super(scene.matter.world, x, y, body)
//         this.constraint = Phaser.Physics.Matter.Matter.Constraint.create({
//             pointA: {x: 500, y: 300},
//             bodyB: body,
//             length: 50,
//             stiffness: 0.5
//          });
        
//         scene.add.existing(this);
//         //scene.matter.world(this.sling);
//     }
//     show(){
//         //stroke(255);
//         const posA = this.sling.pointA;
//         const posB = this.sling.bodyB.position;
//         //this.add.line(posA.x, posA.y, posB.x, posB.y);
//     }
// }

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 3
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    },
    scene: [Test],

    title: "Marble Marathon",
});
