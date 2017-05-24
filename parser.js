/// Recursive Descent Parser
//https://www.youtube.com/watch?v=SH5F-rwWEog&t=3m12s

(function IIFE ( parser ) {

    var Clock = window.Clock
    var expression = "234+5-39*[var_name]"

    var result
    Clock.time( "Parse", function () { 
        result = parser( expression )
    } )
    
    console.log( "Expression:", expression )
    console.log( result )

})(function parser ( expression ) {
    //GLOBAL PRIVATE PROPERTIES
    var exp = expression 
    var Clock = window.Clock
    var token = ""
    var L = ""  //look-ahead
    var i = 0   //index
    var stack = []


    // MAIN \\
    return (function Main() {
        next()
        START()
        return POP()
    })()



    ///Parser
    ;function START() {
        var node
        if ( isNumber( L ) ) {
            ID()
            E()
        } else if ( L === undefined ) {
            throw new Error( "In function 'START', no expression was found." )
        } else {	
            throwExpectingError( "START", "number [0..9]", i )
        }
        
        return
    }

    ;function E() {
        var operators = [ "+", "-", "*", "/" ]
        if ( operators.includes( L ) ) {
            match( operators )
            STACK()

            ID()
            E()	

            E_SEMANTICS_ONE()
        } else if ( L === undefined ) {
            return 
        } else {	
            throwExpectingError( "E", "operator [+, -, *, /]", i )
        }
        
        return
    }
    
    ;function ID() {
        var result = ""
        if ( isNumber( L ) ) {
            match( isNumber )
            NUMBER()
        } else if ( L === "[" ) {
            match( "[" )
            VAR()
            match( "]" )
        } else {
            throwExpectingError( "ID", "number [0..9] or '['", i )
        }

        STACK()
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

    ///Semantics
    ;function STACK( item ) {
        if ( item != null ) {
            stack.push( item )
        } else if ( token.trim() !== "" ) {
            stack.push( token )
            token = ""
        }
    }

    ;function POP() {
        return stack.pop()
    }

    ;function CREATE_NODE( operator, left, right ) {
        return {
            operator: operator,
            left: left,
            right: right,
        }
    }

    ;function E_SEMANTICS_ONE() {
        var right = POP()
        var operator = POP()
        var left = POP()
        var node = CREATE_NODE( operator, left, right )            
        STACK( node )
    }



    ///Helpers
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

    ///ERROR HANDLING    
    ;function throwError( message, index ) {        
        var firstPart = "%c" + exp.substring( 0, index - 1 )
        var letter = "%c" + exp.substring( index - 1, index )
        var secondPart = "%c" + exp.substring( index )
        var fontSize = "font-size: 16px;"
        var partCss = "color:grey;" + fontSize
        var letterCss = "color:white;" + fontSize
        console.info( firstPart + letter + secondPart , partCss, letterCss, partCss )

        var error = new Error( message )
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

