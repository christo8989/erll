/// Recursive Descent Parser
//https://www.youtube.com/watch?v=SH5F-rwWEog&t=3m12s

(function IIFE ( parser ) {

    var Clock = window.Clock
    var expression = "[var_name]"

    console.log( "Expression:", expression )
    Clock.time( "Parse", function () { 
        parser( expression )
    } )
    console.log( result )

})(function parser ( expression ) {

    var exp = expression
    var token = ""
    var L = ""  //current letter
    var i = 0   //index
    result = []

    Main() //Execute Parser



    ;function Main() {
        next()
        START()
    }

    ;function START() {
        TOKEN()
        
        return
    }
    
    ;function TOKEN() {
        if ( isDigit( L ) ) {
            match( isDigit )
            NUMBER()
        } else if ( L === "." ) {
            match( "." )
            RATIONAL()
        } else if ( L === "'" ) {
            match( "'" )
            STRING()

            if ( L !== "'" ) {
                throwExpectingError( "TOKEN", "\"'\"", i )
            }
            match( "'" )
        } else if ( L === "[" ) {
            match( "[" )
            VAR()

            if ( L !== "]" ) {
                throwExpectingError( "TOKEN", "']'", i )
            }
            match( "]" )
        } else {
            throwExpectingError( "TOKEN", "'TOKEN'", i )
        }

        addToken()
        return
    }

    ;function NUMBER() {
        if ( isDigit( L ) ) {
            match( isDigit )
            NUMBER()
        } else if ( L === "." ) {
            match( "." )
            RATIONAL()
        }

        return
    }

    ;function RATIONAL() {
        if ( isDigit(L) ) {
            match( isDigit )
            RATIONAL()
        }

        return
    }

    ;function STRING() {
        if ( L === "'" ) {
            //Add later?
            /*
            match( "'" )
            
            if ( L === "'" ) {
                match( "'" )
                STRING()
            }
            */
        } else {
            match( L )
            STRING()
        }

        return
    }

    ;function VAR() {
        if ( isLowerCaseLetter( L ) ) {
            match( isLowerCaseLetter )
            VAR_NAME()
        } else {
            throwExpectingError( "VAR", "lowercase letter [a..z]", i )
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

    ;function isDigit( letter ) {
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
        var error = new Error( message )
        error.index = index
        error.description = message
        throw error
    }

    ;function throwExpectingError( functionName, expecting, index ) {
        var message = "In function '" 
            + functionName + "', expecting a(n) " 
            + expecting + " at character " 
            + index + ".";
        
        throwError( message, index )
    }

})

