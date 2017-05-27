# Easy to Read Logical Language (ERLL)
ERLL was created to provide readable expressions for business logic and rule sets. Although the expressions should be written by developers, the expressions should also be readable by everyone. For instance, take the expression "[age] > 21 and [age] < 65". Not only is this expression easy to read and understand but its also easy for a developer to write.

The ultimate goal is to pass a dictionary into the parser for the variables and execute the expression to a boolean. If all goes well, return a success. If anything fails, return a fail with a list of errors.

Example error message: "The property 'age' is not greater than 21.".


# Grammar

## LOGIC - 0.3.0

START -> CONDITION_EXPRESSION LOGIC

LOGIC -> {IGNORE_WHITESPACE} OPERATOR_LOGIC {PUSH} CONDITION_EXPRESSION LOGIC {LOGIC_ONE_SEMANTIC} | {empty}


## CONDITION - 0.2.0

CONDITION_EXPRESSION -> MATH_EXPRESSION CONDITION

CONDITION -> {IGNORE_WHITESPACE} OPERATOR_CONDITION {PUSH} MATH_EXPRESSION CONDITION {CONDITION_ONE_SEMANTIC} | {empty}


## MATH - 0.1.0

MATH_EXPRESSION -> PARENTHESIS_EXPRESSION MATH | PARENTHESIS_EXPRESSION

MATH -> {IGNORE_WHITESPACE} OPERATOR_MATH {PUSH} PARENTHESIS_EXPRESSION MATH {MATH_ONE_SEMANTIC} | {empty}


## PARENTHESIS - 0.4.0

PARENTHESIS_EXPRESSION -> {IGNORE_WHITESPACE} ( START ) | TOKEN


## TOKENS - 0.0.1

TOKEN -> {IGNORE_WHITESPACE} DIGIT NUMBER {PUSH} | {IGNORE_WHITESPACE} . RATIONAL {PUSH} | {IGNORE_WHITESPACE} ' STRING ' {PUSH} | {IGNORE_WHITESPACE} [ VAR ] {PUSH} | {IGNORE_WHITESPACE} BOOL {PUSH}

NUMBER -> DIGIT NUMBER | . RATIONAL | {empty}

RATIONAL -> DIGIT RATIONAL | {empty}

STRING -> CHARACTER STRING | {empty}

VAR -> LOWERCASE VAR_NAME

VAR_NAME -> LOWERCASE VAR_NAME | _ VAR_NAME | {empty}


## Literals

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


# AST Structure - 0.5.0

interface Literal = {
    type: "Literal",
    value: string | bool | number | date | empty,
    valueType: @compileTime,
}

interface Identifier = {
    type: "Identifier",
    name: string,
    valueType: @runTime,
}

interface BinaryExpression = {
    type: "BinaryExpression",
    operator: BinaryOperator,
    left: Expression,
    right: Expression,
}

interface LogicalExpression = {
    type: "LogicalExpression",
    operator: LogicalOperator,
    left: Expression,
    right: Expression,
}

BinaryOperator = [  
    +, -, *, /, 
    %, ==, !=, >, 
    <, >=, <= 
]

LogicalOperator = [
    and, or
]
