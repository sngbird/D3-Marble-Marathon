class Test extends Phaser.Scene {
    constructor() {
        super('test');
    }
    preload(){
        this.load.image('playermarble', "assets/marble.png");
        this.load.image('platform', "assets/platformtrim.png");


    }
    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#444');
        // let ground = this.matter.add.rectangle(this.w/2, this.h-100, this.w, 180, { isStatic: true });       
        // ground.setColor = "#9ff07a";
        //this.matter.add.image(this.w/2.0, this.h/2, 'platform');
        let player = this.matter.add.sprite(500,50,'playermarble');
        player.setScale(.05);
       let ground = this.matter.add.image(500, 500, 'platform', null, { isStatic: true });
        ground.Height = 50;
    
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
                y: 1
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
