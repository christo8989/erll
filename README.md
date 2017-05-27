# parser-recursive-descent
Just learning about Recursive Descent.


## Grammar - 0.3.0 - LOGIC

START -> CONDITION_EXPRESSION LOGIC

LOGIC -> {IGNORE_WHITESPACE} OPERATOR_LOGIC {PUSH} CONDITION_EXPRESSION LOGIC {LOGIC_ONE_SEMANTIC} | {empty}


## Grammar - 0.2.0 - CONDITION

CONDITION_EXPRESSION -> MATH_EXPRESSION CONDITION

CONDITION -> {IGNORE_WHITESPACE} OPERATOR_CONDITION {PUSH} MATH_EXPRESSION CONDITION {CONDITION_ONE_SEMANTIC} | {empty}


## Grammar - 0.1.0 - MATH

MATH_EXPRESSION -> PARENTHESIS_EXPRESSION MATH | PARENTHESIS_EXPRESSION

MATH -> {IGNORE_WHITESPACE} OPERATOR_MATH {PUSH} PARENTHESIS_EXPRESSION MATH {MATH_ONE_SEMANTIC} | {empty}


## Grammer - 0.4.0 - PARENTHESIS

PARENTHESIS_EXPRESSION -> {IGNORE_WHITESPACE} ( START ) | TOKEN


## Grammar - 0.0.1 - TOKENS

TOKEN -> {IGNORE_WHITESPACE} DIGIT NUMBER {PUSH} | {IGNORE_WHITESPACE} . RATIONAL {PUSH} | {IGNORE_WHITESPACE} ' STRING ' {PUSH} | {IGNORE_WHITESPACE} [ VAR ] {PUSH} | {IGNORE_WHITESPACE} BOOL {PUSH}

NUMBER -> DIGIT NUMBER | . RATIONAL | {empty}

RATIONAL -> DIGIT RATIONAL | {empty}

STRING -> CHARACTER STRING | {empty}

VAR -> LOWERCASE VAR_NAME

VAR_NAME -> LOWERCASE VAR_NAME | _ VAR_NAME | {empty}


## Grammar - Literals

BOOL -> true | false

CHARACTER -> NUMBER | ALPHABET | SYMBOL | (ESCAPE_CHARACTER)?

ALPHABET -> LOWERCASE | UPPERCASE

DIGIT -> [0..9]

LOWERCASE -> [a..z]

UPPERCASE -> [A..Z]

SYMBOL -> [~,`,!,@,#,$,%,^,..] & does not include '

(ESCAPE_CHARACTER -> '')?

OPERATOR_MATH -> + | - | * | / | %

OPERATOR_CONDITION -> == | != | < OR_EQUAL | > OR_EQUAL

OR_EQUAL -> = | {empty}

OPERATOR_LOGIC -> and | or


## Semantics

{IGNORE_WHITESPACE} -> 1. Loop through whitespace and ignore

{PUSH} -> 1. Push token or item onto the stack

{POP} -> 1. Pop top item off of the stack

{CREATE_NODE} -> 1. Create object with operator, left, right

{LOGIC_ONE_SEMANTIC} -> 1. {POP} x3
                        2. {CREATE_NODE}
                        3. {PUSH} node

{CONDITION_ONE_SEMANTIC} -> 1. {POP} x3
                            2. {CREATE_NODE}
                            3. {PUSH} node

{MATH_ONE_SEMANTIC} ->  1. {POP} x3
                        2. {CREATE_NODE}
                        3. {PUSH} node