class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create(){
        // Starfield bckgr
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield')
        .setOrigin(0,0);
        // 
        
        // Rocket (Player 1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - (borderUISize + borderPad), 
        'rocket', 0).setOrigin(0.5,0);

        // UI Background
        this.add.rectangle(0, borderUISize + borderPad, game.config.width, borderUISize *2, 0x00FF00) // ( X, Y, Width, Height, Color )
        .setOrigin(0,0);
        // White Border
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF)
        .setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF)
        .setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF)
        .setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFff)
        .setOrigin(0,0);

    }

    update(){
        this.starfield.tilePositionX -= starSpeed;
    }
}
