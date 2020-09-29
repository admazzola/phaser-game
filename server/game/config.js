require('@geckos.io/phaser-on-nodejs')

const Phaser = require('phaser')
const GameScene = require('./gameScene')

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-game',
  width: 896,
  height: 504,
  banner: false,
  audio: false,
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  }
}
module.exports = config
