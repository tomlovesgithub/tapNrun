class Display {
	constructor() {
		this.canvas = document.querySelector("canvas")
		this.canvas.width = 750
		this.canvas.height = 420
		this.startline = -20
		var speeds = [0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.25]
		this.timer = new Timer
		this.player = new Player(this.startline, 22, 12)
		this.player2 = new Player(this.startline, 120, 12)
		this.lane3runner = new Player(this.startline, 217, speeds[Math.floor(Math.random()*speeds.length)])
		this.lane4runner = new Player(this.startline, 313, speeds[Math.floor(Math.random()*speeds.length)])
		this.controller = new Controller(this.player, this.player2, this.lane3runner, this.lane4runner, this.timer)
		this.interval
		this.myAudio = new Audio("./assets/Audio/raceon.mp3")
		this.time1 = null
		this.time2 = null
		this.time3 = null
		this.time4 = null
		this.countdown = new Countdown(this.player, this.player2, this.lane3runner, this.lane4runner, this.timer)
	}

	startDraw() {
		var ctx = this.canvas.getContext("2d")
		let img = new Image()
		img.src = ("./assets/pixel-start.jpg")
		img.onload = function() {
			ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
		}
	}

	infiniteDraw() {
		this.interval = setInterval(this.drawCanvas.bind(this), 10)
	}

	drawPlayers() {
		var p1 = new Image()
		var p2 = new Image()
    var p3 = new Image()
    var p4 = new Image()
		p1.src = ("./assets/Bea.png")
		p2.src = ("./assets/Jacques.png")
    p3.src = ("./assets/Subomi.png")
    p4.src = ("./assets/Tom.png")
		this.imgToShape(p1, p2, p3, p4)
	}

	imgToShape(img1, img2, img3, img4) {
		var ctx = this.canvas.getContext("2d")
		ctx.beginPath()
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.drawImage(img1, this.player.x, this.player.y, 85, 85)
		ctx.drawImage(img2, this.player2.x, this.player2.y, 85, 85)
		ctx.drawImage(img3, this.lane3runner.x, this.lane3runner.y, 85, 85)
		ctx.drawImage(img4, this.lane4runner.x, this.lane4runner.y, 85, 85 )
		ctx.fill()
	}

	playAudio() {
		this.myAudio.addEventListener("ended", function () {
			this.currentTime = 0
			this.play()
		}, false)
		this.myAudio.play()
	}

	timerShow() {
		var ctx = this.canvas.getContext("2d")
		ctx.font = "20px sans-serif"
		ctx.fillText(this.timer.formatTime(), 600, 15)

	}

	finishTimeShow() {
		var ctx = this.canvas.getContext("2d")
		this.finishTimeCalc()
		ctx.font = "30px sans-serif"
		if (this.time1 != null) { ctx.fillText(this.time1, 450, 70) }
		if (this.time2 != null) { ctx.fillText(this.time2, 450, 170) }
		if (this.time3 != null) { ctx.fillText(this.time3, 450, 270) }
		if (this.time4 != null) { ctx.fillText(this.time4, 450, 370) }
	}

	finishTimeCalc() {
		if (this.player.x > this.controller.finishLine && this.time1=== null) {
			this.time1 = this.timer.formatTime()
		}
		if (this.player2.x > this.controller.finishLine && this.time2 === null) {
			this.time2 = this.timer.formatTime()
		}
		if (this.lane3runner.x > this.controller.finishLine && this.time3 === null) {
			this.time3 = this.timer.formatTime()
		}
		if (this.lane4runner.x > this.controller.finishLine && this.time4 === null) {
			this.time4 = this.timer.formatTime()
		}
	}

	cdShow() {
		var ctx = this.canvas.getContext("2d")
		ctx.font = "130px sans-serif"
		if (this.countdown.doCount === true) {
			ctx.fillText(this.countdown.count + 1, 350, 250)
		}
	}

  canvasStyle() {
		this.canvas.style.backgroundImage = "url('./assets/Background1.png')"
		this.canvas.backgroundPosition = "50%, 50%"
		this.canvas.style.backgroundHeight = "100%"
		this.canvas.style.backgroundWidth = "100%"
		this.canvas.style.objectFit = "cover"
  }

	drawCanvas() {
		var ctx = this.canvas.getContext("2d")
    this.canvasStyle()
		this.playAudio()
		this.drawPlayers()
		this.timerShow()
		this.finishTimeShow()
		this.cdShow()
		this.controller.mouseOn = false
		this.controller.aiMove()
	}

	drawReplay() {
		var ctx = this.canvas.getContext("2d")
		let img = new Image()
		img.src = ("./assets/playagain-btn-big.png")
		img.onload = function() {
			ctx.drawImage(img, 250, 185, 250, 50)
		}
		this.controller.restart()
	}
}
