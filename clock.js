(function IIFE ( global ) {
	
	global.Clock = new Clock()
	
	;function Clock () {
		var tStart = 0
		
		Clock.prototype.now = performance.now.bind( performance )
			
		Clock.prototype.start = function () {
			tStart = this.now()
		}
		
		Clock.prototype.restart = this.start;
		
		Clock.prototype.get = function () {
			return this.now() - tStart
		}
		
		Clock.prototype.getMilliseconds = function () {
			return parseInt( this.get() )
		}
		
		Clock.prototype.time = function ( Name, fn ) {
			console.log( Name + " starting..." )
			this.start();
			fn();
			var tEnd = this.getMilliseconds();
			console.log( Name + " ended. " + tEnd + "ms" );
		}

		Clock.prototype.timeRaw = function ( Name, fn ) {
			console.log( Name + " starting..." )
			this.start();
			fn();
			var tEnd = this.get();
			console.log( Name + " ended. " + tEnd + "ms" );
		}
	}
})( window )