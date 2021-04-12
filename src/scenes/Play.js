class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create(){
        // Starfield bckgr
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield')
        .setOrigin(0,0);
        // 
        
        // Rocket (Player 1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - (borderUISize + borderPad), 
        'rocket', 0).setOrigin(0.5,0);

        // Spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0,30)
        .setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPad*2, 
        'spaceship', 0,20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderUISize*4, 'spaceship', 0,10)
        .setOrigin(0,0);

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

        // define keys
        keyF     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
    }

    update(){
        this.starfield.tilePositionX -= starSpeed;
        // update Rocket
        this.p1Rocket.update();
        // update ships
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            // explosion
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            // explosion
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            // explosion
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship){
        // simple checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        // hide ship
        ship.alpha = 0;
        // create explosion at ship coords
        let kaboom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        kaboom.anims.play('explode');
        kaboom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            kaboom.destroy();
        })
    }
}
