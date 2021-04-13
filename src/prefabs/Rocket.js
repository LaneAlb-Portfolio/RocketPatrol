//const { Phaser } = require("../../lib/phaser.min");

// Rocket -> "Player" Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y , texture, frame){
        super(scene, x, y , texture, frame);
        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring  = false;     // rocket firing status
        this.moveSpeed = 2;         // pixel movement per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // rocket sfx
    }

    update(){
        // left and right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= (borderUISize + this.width) ){
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= (game.config.width - borderUISize - this.width) ){
                this.x += this.moveSpeed;
            }
        }
        // firing
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // projectile movement
        if(this.isFiring && this.y >= borderUISize * 3 + borderPad){
            this.y -= this.moveSpeed;
        }
        // reset if projectile miss
        if(this.y <= borderUISize * 3 + borderPad){
            this.reset();
        }
    }

    //reset rocket
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPad;
    }
}