(function IIFE ( Clock ) {

	window.Clock = new Clock()

})(function Clock () {
	var tStart = 0
	
	Clock.prototype.now = performance.now.bind( performance )
		
	Clock.prototype.start = function () {
		tStart = this.now()
	}
	
	Clock.prototype.restart = this.start;
	
	Clock.prototype.get = function () {
		return this.now() - tStart
	}
	
	Clock.prototype.getMilliseconds = function ( precision ) {
		precision = typeof precision === "number" ? precision : 0 //isInteger... kinda...
		return this.get().toFixed( precision )
	}
	
	Clock.prototype.time = function ( Name, fn ) {
		console.log( Name + " starting..." )
		this.start();
		fn();
		var tEnd = this.getMilliseconds( 2 );
    console.log( Name + " ended. " + tEnd + "ms" );
    return tEnd;
	}

	Clock.prototype.timeRaw = function ( Name, fn ) {
		console.log( Name + " starting..." )
		this.start();
		fn();
		var tEnd = this.get();
		console.log( Name + " ended. " + tEnd + "ms" );
	}
})