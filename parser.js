/// Recursive Descent Parser
//https://www.youtube.com/watch?v=SH5F-rwWEog&t=3m12s

// S -> id E | [empty]
// E -> + id E | - id E | * id E | / id E [empty]

(function ( expression ) {
    var exp = expression || "2+32+[my_age]-234*2/23"
    var Clock = window.Clock
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
            throw new Error( "In function 'START', no expression was found." )
        } else {	
            throwError( "START", "there was a mismatch", i )
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
            throwError( "E", "there was a mismatch", i )
        }
        
        return
    }

    
    ;function ID() {
        if ( isNumber( L ) ) {
            match( isNumber )
            NUMBER()
        } else if ( L === "[" ) {
            match( "[" )
            VAR()
            match( "]" )
        } else {
            throwError( "ID", "there was a mismatch", i )
        }

        addToken()
        return
    }

    ;function NUMBER() {
        if ( isNumber( L ) ) {
            match( isNumber )
            NUMBER()
        } 

        return
    }

    ;function VAR() {
        if ( isLowerCaseLetter( L ) ) {
            match( isLowerCaseLetter )
            VAR_NAME()
        } else {
            throwError( "VAR", "there was a mismatch", i )
        }

        return
    }

    ;function VAR_NAME() {
        if ( isLowerCaseLetter( L ) ) {
            match( isLowerCaseLetter )
            VAR_NAME()
        } else if ( L === "_" ) {
            match( "_" )
            VAR_NAME()
        } 

        return
    }



    ;function addToken() {
        if ( token.trim() !== "" ) {
            result.push( token )
            token = ""
        }
    }

    ;function isLowerCaseLetter( letter ) {
        //TODO: Refactor - Use character codes.
        var lowerCaseLetters = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ]
        return lowerCaseLetters.includes( letter )
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

    ;function throwError( functionName, message, index ) {
        var error = new Error( "In function '" + functionName + "' " + message + " at character " + index);
        error.index = index;
        error.description = message;
        throw error;
    }

})()

