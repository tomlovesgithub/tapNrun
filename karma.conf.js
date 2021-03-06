module.exports = function(config) {
	config.set({
		files: [
			"src/Player.js",
      "src/countdown.js",
      "src/timer.js",
			"spec/playerSpec.js",
			"spec/timerSpec.js",
			//"spec/controllerSpec.js",
			"spec/countdownSpec.js"


		],

		// coverage reporter generates the coverage
		frameworks: ["jasmine"],
		reporters: ["progress", "coverage"],
		browsers: ["Firefox"],
		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			"src/*.js": ["coverage"]
		},

		// optionally, configure the reporter
		coverageReporter: {
			type : "text",
			//dir : 'coverage/'
		}
	})
}
