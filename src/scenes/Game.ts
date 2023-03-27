import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    const koalaTexture = [
      "assets/koala/koala_idle.png",
      "assets/koala/koala_jump.png",
      "assets/koala/koala_walk01.png",
      "assets/koala/koala_walk02.png",
      "assets/koala/koala_walk03.png",
    ];

    for (let i = 0; i < koalaTexture.length; i++) {
      this.load.image(`koala${i}`, koalaTexture[i]);
    }

    this.load.image("tiles", "assets/sheet.png");
    this.load.tilemapTiledJSON("tilemap", "assets/ground.json");
  }

  create() {
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
    console.log(ground);
    this.matter.world.convertTilemapLayer(ground);

    this.matter.add.sprite(width * 0.5, height * 0.5, "koala1");

    this.cameras.main.scrollY = 200;
    this.cameras.main.scrollX = 200;
  }
}
