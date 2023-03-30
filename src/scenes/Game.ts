import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  
  // the exclamation mark marks the cursors as not undefined
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  private koala!: Phaser.Physics.Matter.Sprite
  
  
  constructor() {
    super("game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.atlas('koala', 'assets/koala.png', 'assets/koala.json')

    this.load.image("tiles", "assets/sheet.png");
    this.load.tilemapTiledJSON("tilemap", "assets/ground.json");
  }

  create() {

    this.createPlayerAnimations()

    // // width and height of the game
    const { width, height } = this.scale;

    // this.add.image(0.5 * width, 0.5 * height, "koala1");

    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("sheet", "tiles");

    const ground = map.createLayer("ground", tileset);

    /*
    Uses tiled to add properties to certain elements in the sheet

  */
    ground.setCollisionByProperty({ collides: true });
 
    // makes the ground tiles to be static matter components
    this.matter.world.convertTilemapLayer(ground);

    this.koala = this.matter.add.sprite(width * 0.5, height * 0.5, "koala").play('player-idle');

    this.cameras.main.scrollY = 200;
    this.cameras.main.scrollX = 200;
  }

  // Performs updates over time
  update() {
    const speed = 10;
    if (this.cursors.left.isDown) {
      this.koala.setVelocityX(-speed)
    } else if (this.cursors.right.isDown) {
      this.koala.setVelocityX(speed)
    } else if (this.cursors.up.isDown) {
      this.koala.setVelocityY(speed)
    } else if (this.cursors.down.isDown) {
      this.koala.setVelocityY(-speed)
    }  else {
      this.koala.setVelocityX(0)
    }

  }

  private createPlayerAnimations() {
    this.anims.create({
      key: 'player-walk',
      frameRate: 10,
      frames: this.anims.generateFrameNames('koala', {
        start: 1,
        end: 3,
        prefix: 'koala_walk0',
        suffix: '.png'
      }),
      repeat: -1
    })
  }
}
