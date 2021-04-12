class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  // add to curr scene
        this.points = pointValue;  // points 
        this.moveSpeed = 3;        // movement in pixels
    }

    update(){
        // move spaceship left
        this.x -= this.moveSpeed;
        // movement wrap
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset(){
        
    }
}