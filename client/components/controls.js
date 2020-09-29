export default class Controls {
  constructor(scene, channel) {
    this.scene = scene
    this.channel = channel
    this.left = false
    this.right = false
    this.up = false
    this.controls = []
    this.none = true
    this.prevNone = true

    //https://phaser.io/examples/v3/view/game-objects/tilemap/static/grid-movement

    // add a second pointer
    scene.input.addPointer()

    //detect click on a gui element
    const detectPointer = (gameObject, down) => {
      if (gameObject.btn) {
        switch (gameObject.btn) {
          case 'left':
            this.left = down
            break
          case 'right':
            this.right = down
            break
          case 'up':
            this.up = down
            break
        }
      }
    }
    scene.input.on('gameobjectdown', (pointer, gameObject) =>
      detectPointer(gameObject, true)
    )
    scene.input.on('gameobjectup', (pointer, gameObject) =>
      detectPointer(gameObject, false)
    )

    scene.input.keyboard.on('keydown', function (event) {
      switch(event.key){
          case 'w': this.commandMove(0,1);
            break;
          case 'a': this.commandMove(-1,0);
            break;
          case 's': this.commandMove(0,-1);
            break;
          case 'd': this.commandMove(1,0);
            break;
      }
   }.bind(this));





    let left = new Control(scene, 0, 0, 'left').setRotation(-0.5 * Math.PI)
    let right = new Control(scene, 0, 0, 'right').setRotation(0.5 * Math.PI)
    let up = new Control(scene, 0, 0, 'up')
    this.controls.push(left, right, up)
    this.resize()

    this.scene.events.on('update', this.update, this)
  }

  controlsDown() {
    return { left: this.left, right: this.right, up: this.up, none: this.none }
  }

  commandMove(dx,dy)
  {
    console.log('command move')

    var tile = layer.getTileAtWorldXY(player.x + (dx*32), player.y + (dy*32), true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x += 32*dx;
            player.y += 32*dy;
          //  player.angle = -90;
        }

  }

  resize() {
    const SCALE = 1
    const controlsRadius = (192 / 2) * SCALE
    const w = this.scene.cameras.main.width - 10 - controlsRadius
    const h = this.scene.cameras.main.height - 10 - controlsRadius

    let positchannelns = [
      {
        x: controlsRadius + 10,
        y: h
      },
      { x: controlsRadius + 214, y: h },
      { x: w, y: h }
    ]

    this.controls.forEach((ctl, i) => {
      ctl.setPosition(positchannelns[i].x, positchannelns[i].y)
      ctl.setScale(SCALE)
    })
  }

  update() {
    this.none = this.left || this.right || this.up ? false : true

    if (!this.none || this.none !== this.prevNone) {
      let total = 0
      if (this.left) total += 1
      if (this.right) total += 2
      if (this.up) total += 4
      let str36 = total.toString(36)

      this.channel.emit('playerMove', str36)
    }

    this.prevNone = this.none
  }
}

class Control extends Phaser.GameObjects.Image {
  constructor(scene, x, y, btn) {
    super(scene, x, y, 'controls')
    scene.add.existing(this)

    this.btn = btn

    this.setInteractive()
      .setScrollFactor(0)
      .setAlpha(0.2)
      .setDepth(2)

    // if (!scene.sys.game.device.input.touch) this.setAlpha(0)
  }
}
