class Display {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = 900
    this.canvas.height = 500
    // FINISH LINE NEEDS TO BE MADE ADAPTIVE/ NOT 150
    this.finishLine = 780
    this.timer = new Timer
    this.player = new Player
    this.player2 = new Player2
    this.controller = new Controller
    this.controller2 = new Controller
    this.interval
    this.lane3runner = new Lane3Runner
    this.lane4runner = new Lane4Runner
    this.stopwatch = setInterval(this.trackPlayer.bind(this), 50)
    // this.timer.start()
  }

  startButton() {
    var ctx = this.canvas.getContext('2d');
    let img = new Image()
    img.src = ("./assets/pixel-start.jpg")
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 900, 500)
    }
  }

  aiMovement() {
    this.lane3movement = setInterval(this.lane3runner.move(), 100)
    this.lane4movement = setInterval(this.lane4runner.move(), 100)
  }

  infiniteDraw() {
    this.interval = setInterval(this.drawCanvas.bind(this), 10)
  }

  drawCanvas() {
    var ctx = this.canvas.getContext('2d');
    let img = new Image()
    let img2 = new Image()
    img.src = ("./assets/Joao.png")
    img2.src = ("./assets/Joao1.png")
    ctx.beginPath()
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.drawImage(img, this.player.x, this.player.y, 100,100 )
    ctx.drawImage(img2, this.player2.x, this.player2.y, 100,100 )
    ctx.arc(this.lane3runner.x, this.lane3runner.y, 50, 0, 2 * Math.PI);
    ctx.arc(this.lane4runner.x, this.lane4runner.y, 50, 0, 2 * Math.PI);
    ctx.fill()
    ctx.font = "30px sans-serif";
    ctx.fillText(this.timer.formatTime(), 745, 490)
  }

  trackPlayer() {
    var player1Position = this.player.x > 4 && this.player.x < this.finishLine
    var player2Position = this.player2.x > 4 && this.player2.x < this.finishLine
    if (player1Position || player2Position) {
      this.timer.start()
      clearInterval(this.stopwatch)
      this.stopwatch = setInterval(this.trackFinish.bind(this), 10)
      display.aiMovement();
    }
    if (this.player.x > this.finishLine) {
      this.timer.stop()
      clearInterval(this.stopwatch);
    }
//     if (this.player.x > 4 && this.player.x < this.finishLine) {
//       this.timer.start()
//       display.aiMovement();
//       clearInterval(this.stopwatch)
//       this.stopwatch = setInterval(this.trackFinish.bind(this), 50)
//     }
  }

  trackFinish() {
    if (this.player.x > this.finishLine || this.player2.x > this.finishLine) {
      this.timer.stop()
      clearInterval(this.stopwatch);
    }
  }
}
