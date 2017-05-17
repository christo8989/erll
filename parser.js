/// Recursive Descent Parser
//https://www.youtube.com/watch?v=SH5F-rwWEog&t=3m12s

// S -> id E | [empty]
// E -> + id E | - id E | * id E | / id E [empty]

(function ( Clock ) {
    var exp = "2+3234-234*2/23"
    var token = ""
    var L = ""
    var i = 0
    result = []



    console.log( exp )
    Clock.timeRaw( "Main", Main )
    console.log( result )



    ;function Main() {
        next()
        START()
    }

    ;function START() {
        if ( isNumber( L ) ) {
            ID()
            E()
        } else if ( L === undefined ) {
            throw new Error( "In function S, no expression was found." )
        } else {	
            throwError( "In function S, there was a mismatch", i )
        }
        
        return
    }

    ;function E() {
        var operators = [ "+", "-", "*", "/" ]
        if ( operators.includes( L ) ) {
            match( operators )
            addToken()

            ID()
            E()		
        } else if ( L === undefined ) {
            return 
        } else {	
            throwError( "In function 'E', there was a mismatch", i )
        }
        
        return
    }

    
    ;function ID() {
        if ( isNumber( L ) ) {
            match( isNumber )
            NUMBER()
        } else {
            throwError( "In function 'N', there was a mismatch", i )
        }

        addToken()
        return
    }

    ;function NUMBER() {
        if ( isNumber( L ) ) {
            match( isNumber )
            NUMBER()
        } else if ( L === " " ) {
            removeWhitespaces()
        } 

        return
    }



    ;function addToken() {
        if ( token.trim() !== "" ) {
            result.push( token )
            token = ""
        }
    }

    ;function isNumber( letter ) {
        var number
        if ( typeof letter === "string" ) {
            number = parseInt( letter )
        } else if ( typeof letter === "number" ) {
            number = letter
        }

        return isNaN( number ) === false 
            && typeof number === "number"
    }

    ;function match( item ) {
        var isCorrect = ( typeof item === "function" && item( L ) )
            || ( Array.isArray( item ) && item.includes( L ) )
            || ( item === L )
        if ( isCorrect ) {
            next()
            return true
        } else {
            throwError( "There was a mismatch", i )
        }
    }

    ;function next() {	
        token += L
        L = exp[ i++ ]
    }

    ;function throwError( message, index ) {
        var error = new Error(message + " at character " + index);
        error.index = index;
        error.description = message;
        throw error;
    }

})( window.Clock )

