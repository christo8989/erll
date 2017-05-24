# parser-recursive-descent
Just learning about Recursive Descent.

## Grammar - 0.1.0 - MATH_EXPRESSION

START -> MATH_EXPRESSION {POP}

MATH_EXPRESSION -> TOKEN MATH | TOKEN

MATH -> OPERATOR_MATH {PUSH} TOKEN MATH {MATH_ONE_SEMANTIC} | {empty}

## Grammar - 0.0.1 - TOKENS

TOKEN -> DIGIT NUMBER {PUSH} | . RATIONAL {PUSH} | ' STRING ' {PUSH} | [ VAR ] {PUSH}

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


## Semantics

{PUSH} -> 1. Push token or item onto the stack

{POP} -> 1. Pop top item off of the stack

{CREATE_NODE} -> 1. Create object with operator, left, right

{MATH_ONE_SEMANTIC} ->  1. {POP} x3
                        2. {CREATE_NODE}
                        3. {PUSH} node
