# parser-recursive-descent
Just learning about Recursive Descent.

## Grammar - 0.1.0 - MATH_EXPRESSION

START -> MATH_EXPRESSION

MATH_EXPRESSION -> TOKEN MATH | TOKEN

MATH -> OPERATOR_MATH TOKEN MATH | {empty}

## Grammar - 0.0.1 - TOKENS

TOKEN -> DIGIT NUMBER | . RATIONAL | ' STRING ' | [ VAR ]

NUMBER -> DIGIT NUMBER | . RATIONAL | {empty}

RATIONAL -> DIGIT RATIONAL | {empty}

STRING -> CHARACTER STRING | {empty}

VAR -> LOWERCASE VAR_NAME

VAR_NAME -> LOWERCASE VAR_NAME | _ VAR_NAME | {empty}


## Grammar - Literals

CHARACTER -> NUMBER | ALPHABET | SYMBOL | (ESCAPE_CHARACTER)?

ALPHABET -> LOWERCASE | UPPERCASE

DIGIT -> [0..9]

LOWERCASE -> [a..z]

UPPERCASE -> [A..Z]

SYMBOL -> [~,`,!,@,#,$,%,^,..] & does not include '

(ESCAPE_CHARACTER -> '')?

OPERATOR_MATH -> + | - | * | / | %
