/// Recursive Descent Parser
//https://www.youtube.com/watch?v=SH5F-rwWEog&t=3m12s

// S -> id E | [empty]
// E -> + id E | - id E | * id E | / id E [empty]

(function ( Clock ) {
    var exp = "id+id*id-id+id/id"
    var token = ""
    var L = ""
    var i = 0
    result = []

    Clock.timeRaw( "Main", Main )
    console.log( result )

    ;function Main() {
        next()
        S()
    }

    ;function S() {
        if ( L === "i" ) {
            match( "i" )
            match( "d" )
            addToken()
            E()
        } else if ( L === undefined ) {
            return
        } else {	
            throwError( "In function S, there was a mismatch", i )
        }
        
        return
    }

    ;function E() {
        var operators = [ "+", "-", "*", "/" ]
        if ( operators.includes( L ) ) {
            match( L )
            addToken()

            match( "i" )
            match( "d" )
            addToken()
            E()		
        } else if ( L === undefined ) {
            return 
        } else {	
            throwError( "In function 'E', there was a mismatch", i )
        }
        
        return
    }


    ;function next() {	
        token += L
        L = exp[ i++ ]
    }

    ;function match( letter ) {
        if ( letter === L ) {
            next()
            return true
        } else {
            throwError( "There was a mismatch", i )
        }
    }

    ;function addToken() {
        result.push( token )
        token = ""
    }

    ;function throwError( message, index ) {
        var error = new Error(message + " at character " + index);
        error.index = index;
        error.description = message;
        throw error;
    }
})( window.Clock )

