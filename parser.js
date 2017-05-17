/// Recursive Descent Parser
//https://www.youtube.com/watch?v=SH5F-rwWEog&t=3m12s

// S -> id E | [empty]
// E -> + id E | - id E | * id E | / id E [empty]

(function ( Clock ) {
    var exp = "id+id*id-id+id/id"
    var L = ""
    var i = 0
    result = []

    Clock.timeRaw( "Main", Main )
    console.log( result )

    ;function Main () {
        getNext()
        S()
    }

    ;function S() {
        if ( L === "i" ) {
            match( "i" )
            match( "d" )
            result.push("id");
            E()
        } else if ( L === undefined ) {
            return
        } else {	
            throwError( "In function S, there was a mismatch", i )
        }
        
        return
    }

    ;function E() {
        if ( L === "+" ) {
            match( "+" )
            result.push( "+" )
            match( "i" )
            match( "d" )
            result.push( "id" )
            E()		
        } else if ( L === "-" ) {
            match( "-" )
            result.push( "-" )
            match( "i" )
            match( "d" )
            result.push( "id" )
            E()
        } else if ( L === "*" ) {
            match( "*" )
            result.push( "*" )
            match( "i" )
            match( "d" )
            result.push( "id" )
            E()
        } else if ( L === "/" ) {
            match( "/" )
            result.push( "/" )
            match( "i" )
            match( "d" )
            result.push( "id" )
            E()
        } else if ( L === undefined ) {
            return 
        } else {	
            throwError( "In function 'E', there was a mismatch", i )
        }
        
        return
    }

    ;function getNext() {	
        L = exp[ i++ ]
    }

    ;function match ( letter ) {
        if ( letter === L ) {
            getNext()
            return true
        } else {
            throwError( "There was a mismatch", i )
        }
    }

    ;function throwError( message, index ) {
        var error = new Error(message + " at character " + index);
        error.index = index;
        error.description = message;
        throw error;
    }
})( window.Clock )

