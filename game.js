class Test extends Phaser.Scene {
    constructor() {
        super('test');
        let player;
        let constraint;
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
        this.player = new Player(this, 700,575,'playermarble');
        this.matter.world.setBounds(0,-500, this.w,this.h*2)
        
        let testmarble = new Marble(this, 450,100, 'marble2');
        
        let ground = this.add.image(400, 700, 'platform', null, { isStatic: true });
        const path = '-350 0 -350 75 100 125 450 75 450 0'
        let verts = this.matter.verts.fromPath(path);
        let fromvert = this.matter.add.fromVertices(ground.x,ground.y+45, verts, {isStatic: true,}, true, .01, 10);

        let ground2 = this.add.image(1500, 500, 'platform', null, { isStatic: true });
        const path2 = '-350 0 -350 75 100 125 450 75 450 0'
        let verts2 = this.matter.verts.fromPath(path2);
        let fromvert2 = this.matter.add.fromVertices(ground2.x,ground2.y+45, verts, {isStatic: true,}, true, .01, 10);       
        //let testplat = new Platform(this,500,800, 'platform',);
        //this.matter.world.add(testplat);
        
        //Add the Slingshot
        this.constraint = Phaser.Physics.Matter.Matter.Constraint.create({
            pointA: {x: 700, y: 600},
            bodyB: this.player.body,
            length: 1,
            stiffness: .5
        });
        this.matter.world.add(this.constraint);
        let slingshot = this.matter.add.mouseSpring();
        this.player.on('pointerdown', function(pointer,){
            this.constraint.pointA = {x: pointer.x, y: pointer.y};
        },this )
        this.input.on('pointerup', function(pointer){
            setTimeout(() =>{this.constraint.pointA = null}, 10);
        },this)
        
        let restart = this.add.text(this.w*.05,this.h*.9)
        .setText("Restart Level")
        .setStyle({ fontSize: `${1.5 * this.s}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
        restart.setInteractive().on('pointerdown',function(pointer){
            this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
            this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start('test',);
            });},this) 
 

    }
    update(){
        
        
    }

}
class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
        let player;
        let constraint;
    }
    preload(){
        this.load.image('marble1', "assets/marble1.png");
        this.load.image('marble2',"assets/marble2.png");
        this.load.image('marble3', "assets/marble3.png");
        this.load.image('marble4', "assets/marble4.png");
        this.load.image('platform', "assets/platformfull.png");


    }
    create(){
    this.w = this.game.config.width;
    this.h = this.game.config.height;
    this.s = this.game.config.width * 0.01;
    this.cameras.main.setBackgroundColor('#444');
        //Create Platform
    makePlatform(this,this.w/2, this.h/2,'platform');

    for(let i = 1; i< 9; i++){
        let marble = new Marble(this, this.w/2,this.h/2-25, 'marble2')
    }
    setTimeout(() =>{let player = new Player(this,this.w/2-25,this.h/2-400, 'marble1' )}, 200);

    this.add.text(this.w/2 * 0.75, this.s)
        .setText("Marble Marathon")
        .setStyle({ fontSize: `${3 * this.s}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
            
    this.add.text(this.w/2 * 0.75, this.h*.8)
        .setText("Click to Start")
        .setStyle({ fontSize: `${3 * this.s}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);    
        
    
    this.input.on('pointerdown', function(pointer){
        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
        this.scene.start('level1',);
        });},this)
    //this.input.on('pointerdown', function(){gotoScene('test')},this);
    }
    


}
class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
        let player;
        let constraint;
    }
    preload(){
        this.load.image('marble1', "assets/marble1.png");
        this.load.image('marble2',"assets/marble2.png");
        this.load.image('marble3', "assets/marble3.png");
        this.load.image('marble4', "assets/marble4.png");
        this.load.image('platform', "assets/platformfull.png");


    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        this.player = new Player(this, 700,600,'marble1');
        this.matter.world.setBounds(0,-500, this.w,this.h*2);

         //Add the Slingshot
         this.constraint = Phaser.Physics.Matter.Matter.Constraint.create({
            pointA: {x: 700, y: 600},
            bodyB: this.player.body,
            length: 1,
            stiffness: .5
        });
        this.matter.world.add(this.constraint);
        let slingshot = this.matter.add.mouseSpring();
        this.player.on('pointerdown', function(pointer,){
            this.constraint.pointA = {x: pointer.x, y: pointer.y};
        },this )
        this.input.on('pointerup', function(pointer){
            setTimeout(() =>{this.constraint.pointA = null}, 10);
        },this)
        makePlatform(this,300,700,'platform');
        makePlatform(this,1050,700,'platform');
        makePlatform(this,1600,700,'platform');
    }
}
function gotoScene(scene,key) {
    scene.cameras.main.fade(2000, 0, 0, 0);
    scene.time.delayedCall(2000, () => {
        scene.scene.start(key);
    });
}

function makePlatform(scene,x,y,spriteTexture){
    this.ground =  scene.add.image(x, y, 'platform', null, { isStatic: true });
    this.path = '-350 0 -350 75 100 125 450 75 450 0'
    this.verts = scene.matter.verts.fromPath(path);
    this.fromvert = scene.matter.add.fromVertices(ground.x,ground.y+45, verts, {isStatic: true,}, true, .01, 10)
}
// function createSlingshot(pointA, body){

// }


class Marble extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, spriteTexture,) {
        super(scene.matter.world, x, y, spriteTexture, 0)
        this.setCircle(300);
        this.setScale(.05);
        this.setBounce(.5);
        this.setFriction(0);
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
        this.setInteractive();
        this.setFrictionAir(.01);
        this.body.ignorePointer = false;
        scene.add.existing(this)
    }
}

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
    scene: [Intro,Level1],

    title: "Marble Marathon",
});
