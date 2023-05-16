let g_restarts = 0;
let g_level = 0;
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
            stiffness: .4
        });
        this.matter.world.add(this.constraint);
        let slingshot = this.matter.add.mouseSpring();
        this.player.on('pointerdown', function(pointer,){
            this.constraint.pointA = {x: pointer.x, y: pointer.y};
        },this )
        this.input.on('pointerup', function(pointer){
            setTimeout(() =>{this.constraint.pointA = null}, 20);
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
    makePlatformBig(this,this.w/2, this.h/2,'platform');

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
        
    
    // this.input.on('pointerdown', function(pointer){
    //     this.cameras.main.fade(1000, 0, 0, 0);
    //     this.time.delayedCall(1000, () => {
    //     this.scene.start('level1',);
    //     });},this)
    this.input.on('pointerdown', () => gotoScene(this,'level1'),this);
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
        this.load.image('door', "assets/door.png");



    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        this.player = new Player(this, this.w*.1 ,this.h*.7,'marble1');
        this.matter.world.setBounds(0,0, this.w,this.h*2);

         //Add the Slingshot
         this.constraint = Phaser.Physics.Matter.Matter.Constraint.create({
            pointA: {x: this.w*.1, y: this.h*.65},
            bodyB: this.player.body,
            length: 1,
            stiffness: .4
        });
        this.matter.world.add(this.constraint);
        let slingshot = this.matter.add.mouseSpring();
        this.player.on('pointerdown', function(pointer,){
            this.constraint.pointA = {x: pointer.x, y: pointer.y-50};
        },this )
        this.input.on('pointerup', function(pointer){
            setTimeout(() =>{this.constraint.pointA = null}, 10);
        },this)
        makePlatformBig(this,300,800,'platform');
        makePlatformBig(this,1050,600,'platform');
        makePlatformBig(this,1600,600,'platform');
        makePlatformSmall(this,1050,400,'platform');
        makePlatformSmall(this,1800,200,'platform');

        //let ramp = this.physics.add.triangle(100,100,)
        g_level = 1;

        let restartbutton = new RestartButton(this,this.w*.1,this.h*.9);
        let goal = new GoalPoint(this,this.w*.95,150,'door');
        this.player.setOnCollideWith(goal,() => {
            gotoScene(this,'between');
        },this)
        this.add.text(this.w/3,this.h*.05, 'Launch Marble into the door to Advance').setStyle({ fontSize: `${24}px` });
    }
    update(){
        
    }
}

class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
        let player;
        let constraint;
    }
    preload(){
        this.load.image('marble1', "assets/marble1.png");
        this.load.image('marble2',"assets/marble2.png");
        this.load.image('marble3', "assets/marble3.png");
        this.load.image('marble4', "assets/marble4.png");
        this.load.image('platform', "assets/platformfull.png");
        this.load.image('door', "assets/door.png");



    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        this.player = new Player(this, this.w*.1 ,this.h*.7,'marble1');
        this.matter.world.setBounds(0,0, this.w,this.h*2);

         //Add the Slingshot
         this.constraint = Phaser.Physics.Matter.Matter.Constraint.create({
            pointA: {x: this.w*.1, y: this.h*.65},
            bodyB: this.player.body,
            length: 1,
            stiffness: .4
        });
        this.matter.world.add(this.constraint);
        let slingshot = this.matter.add.mouseSpring();
        this.player.on('pointerdown', function(pointer,){
            this.constraint.pointA = {x: pointer.x, y: pointer.y-50};
        },this )
        this.input.on('pointerup', function(pointer){
            setTimeout(() =>{this.constraint.pointA = null}, 10);        

        },this)
        makePlatformSmall(this,200,800,'platform');
        makePlatformSmall(this,950,700,'platform');
        makePlatformSmall(this,950,200,'platform');

        makePlatformSmall(this,1800,800,'platform');
        makePlatformSmall(this,1800,500,'platform');
        g_level = 2;
 

        //let ramp = this.physics.add.triangle(100,100,)
      

        let restartbutton = new RestartButton(this,this.w*.1,this.h*.9);
        let goal = new GoalPoint(this,this.w*.95,750,'door');
        this.player.setOnCollideWith(goal,() => {
            gotoScene(this,'between');
        },this)
        this.add.text(this.w/3,this.h*.05, 'Launch Marble into the door to Advance').setStyle({ fontSize: `${24}px` });
    }
    update(){
        
    }
}

class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
        let player;
        let constraint;
        let saved = 0;
        
    }
    preload(){
        this.load.image('marble1', "assets/marble1.png");
        this.load.image('marble2',"assets/marble2.png");
        this.load.image('marble3', "assets/marble3.png");
        this.load.image('marble4', "assets/marble4.png");
        this.load.image('platform', "assets/platformfull.png");
        this.load.image('door', "assets/door.png");



    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        this.player = new Player(this, this.w*.1 ,this.h*.7,'marble1');
        this.matter.world.setBounds(0,0, this.w,this.h*2);
        let goal = new GoalPoint(this,this.w*.95,750,'door');
        this.saved = 0;
         //Add the Slingshot
         this.constraint = Phaser.Physics.Matter.Matter.Constraint.create({
            pointA: {x: this.w*.1, y: this.h*.65},
            bodyB: this.player.body,
            length: 1,
            stiffness: .4
        });
        this.matter.world.add(this.constraint);
        let slingshot = this.matter.add.mouseSpring();
        this.player.on('pointerdown', function(pointer,){
            this.constraint.pointA = {x: pointer.x, y: pointer.y-50};
        },this )
        this.input.on('pointerup', function(pointer){
            setTimeout(() =>{this.constraint.pointA = null}, 10);        

        },this)
        // makePlatformSmall(this,200,800,'platform');
        // makePlatformSmall(this,950,700,'platform');
        // makePlatformSmall(this,950,200,'platform');

        // makePlatformSmall(this,1800,800,'platform');
        // makePlatformSmall(this,1800,500,'platform');

        makePlatformBig(this,300,800,'platform');
        makePlatformSmall(this,200,500,'platform');
        let marble1 = new Marble(this,210,475,'marble2');
        marble1.setOnCollideWith(goal,() => {
            this.saved += 1;
            marble1.destroy();
        },this)
        makePlatformSmall(this,1400,150,'platform');
        let marble2 = new Marble(this,1425,125,'marble2');
        marble2.setOnCollideWith(goal,() => {
            this.saved += 1;
            marble2.destroy();
        },this)
        makePlatformBig(this,1050,800,'platform');
        let marble3 = new Marble(this,1050,775,'marble2');
        marble3.setOnCollideWith(goal,() => {
            this.saved += 1;
            marble3.destroy();
        },this)
        makePlatformBig(this,1600,800,'platform');

        //let ramp = this.physics.add.triangle(100,100,)
      
        g_level = 3;
        let restartbutton = new RestartButton(this,this.w*.1,this.h*.9);
        
        this.player.setOnCollideWith(goal,() => {
            if(this.saved == 3){
                gotoScene(this,'between');
            }
        },this)
        this.add.text(this.w/4,this.h*.05, 'Knock other marbles into the door, then collide with it to win').setStyle({ fontSize: `${24}px` });
    }
    update(){
        
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }
    preload(){
        this.load.image('marble1', "assets/marble1.png");
        this.load.image('marble2',"assets/marble2.png");
        this.load.image('marble3', "assets/marble3.png");
        this.load.image('marble4', "assets/marble4.png");
        this.load.image('platform', "assets/platformfull.png");
        this.load.image('door', "assets/door.png");
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        let titlebox = this.matter.add.rectangle(970,200,600,150, {isStatic: true,});
        let logit = this.add.text(700, 170, 'Marble Madness').setStyle({ fontSize: `${64}px` });
        let creditbox = this.matter.add.rectangle(950,600,1400,400, {isStatic: true,});
        let credit1 = this.add.text(300, 470, 'A short physics based game by Lumina Kinsinger-Dang. Github: Sngbird').setStyle({ fontSize: `${32}px` });
        let credit2 = this.add.text(400, 570, 'Written on Phaser, with the Matter Physics engine').setStyle({ fontSize: `${32}px` });
        let credit3 = this.add.text(400, 670, 'Assets Generated by Me using Krita').setStyle({ fontSize: `${32}px` });
        this.matter.world.setBounds(0,0, this.w,this.h);
        let marble1 = new Marble(this,210,75,'marble2');
        marble1.setFrictionAir(0);
        marble1.setBounce(1.01);
        let marble2 = new Marble(this,210,70,'marble1');
        marble2.setFrictionAir(0);
        marble2.setBounce(1.01);
        let marble3 = new Marble(this,410,70,'marble3');
        marble3.setFrictionAir(0);
        marble3.setBounce(1.01);
        let marble4 = new Marble(this,410,70,'marble4');
        marble3.setFrictionAir(0);
        marble3.setBounce(1.01);
        for (let i = 0; i < 100; i++){
            let marble_i = new Marble(this,410+(i*10), 70, 'marble2');
            //marble_i.setFriction(0);
            marble_i.setFrictionAir(0);
            marble_i.setBounce(1.04);
        }
        for (let j = 0; j < 100; j++){
            let marble_j = new Marble(this,410+(j*10), 650, 'marble1');
            marble_j.setFrictionAir(0);
            marble_j.setBounce(1.04);
        }

    }
}
class Between extends Phaser.Scene {
    constructor() {
        super('between');
    }
    preload(){
        this.load.image('marble1', "assets/marble1.png");
        this.load.image('marble2',"assets/marble2.png");
        this.load.image('marble3', "assets/marble3.png");
        this.load.image('marble4', "assets/marble4.png");
        this.load.image('platform', "assets/platformfull.png");
        this.load.image('door', "assets/door.png");
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        this.add.text(this.w*.3,this.h*.4, 'Restarted '+g_restarts+' times.').setStyle({ fontSize: `${64}px` });
        this.matter.world.setBounds(0,0, this.w,this.h);
        for (let i = 0; i < 100; i++){
            let marble_i = new Marble(this,410+(i*10), 70, 'marble2');
            //marble_i.setFriction(0);
            marble_i.setFrictionAir(0);
            marble_i.setBounce(1.04);
        }
        if(g_level == 1){
            setTimeout(() => {gotoScene(this,'level2');}, 2000)
        }
        if(g_level == 2){
            setTimeout(() => {gotoScene(this,'level3');}, 2000)
        }
        if(g_level == 3){
            setTimeout(() => {gotoScene(this,'credits');}, 2000)
        }
        
    }
}

function gotoScene(scene,key) {
    scene.cameras.main.fade(1000, 0, 0, 0);
    scene.time.delayedCall(1000, () => {
        scene.scene.start(key);
    });
}

function makePlatformBig(scene,x,y,spriteTexture){
    this.ground =  scene.add.image(x, y, 'platform', null, { isStatic: true });
    this.path = '-350 0 -350 75 100 125 450 75 450 0'
    this.verts = scene.matter.verts.fromPath(path);
    this.fromvert = scene.matter.add.fromVertices(ground.x,ground.y+45, verts, {isStatic: true,}, true, .01, 10)
}

function makePlatformSmall(scene,x,y,spriteTexture){
    this.ground =  scene.add.image(x, y, 'platform', null, { isStatic: true });
    this.ground.setScale(.5);
    this.path = '-175 0 -175 37.5 50 62.5 225 37.5 225 0'

    this.verts = scene.matter.verts.fromPath(path);
    this.fromvert = scene.matter.add.fromVertices(ground.x,ground.y+22.5, verts, {isStatic: true,}, true, .01, 10)
}
// function createSlingshot(pointA, body){

// }

class RestartButton extends Phaser.GameObjects.Text{
    constructor(scene, x, y, text){
        super(scene,x,y)
            this.setText("Restart Level")
            this.setStyle({ fontSize: `${24}px` })
            this.setInteractive().on('pointerdown',() => {gotoScene(scene,scene); g_restarts+=1;});
            scene.add.existing(this);
        }
}

class GoalPoint extends Phaser.Physics.Matter.Sprite{
    constructor(scene,x,y,image){
        super(scene.matter.world, x, y, 'door');
        this.setScale(.5)
        this.setStatic(true);
        
        scene.add.existing(this);
    }
}

// class GoalPoint extends Phaser.GameObjects{
//     constructor(scene,x,y,width,height){
//         super(scene, x, y, width,height);
//         this.goal = scene.matter.add.rectangle(x,y,width,height, {isStatic: true});
        
//         scene.add.existing(this);
//     }
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
            wireframes: false,
            enableSleeping: true,
            gravity: {
                y: 3
            },
            // debug: {
            //     //showBody: true,
            //     //showStaticBody: true
            // }
        }
    },
    scene: [Intro,Level1,Between,Level2,Level3,Credits],
    title: "Marble Marathon",
});
