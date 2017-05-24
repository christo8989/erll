# parser-recursive-descent
Just learning about Recursive Descent.

## Grammar

START -> ID E {POP}

E -> OPERATOR_MATH {STACK} ID E {E_SEMANTICS_ONE} | {empty}

ID -> [ VAR ] {STACK} | [0..9] {STACK}

VAR -> LOWERCASE VAR_NAME

VAR_NAME -> LOWERCASE VAR_NAME | _ VAR_Name | {empty}

NUMBER -> [0..9] NUMBER | {empty}

LOWERCASE -> [a..z]

OPERATOR_MATH -> + | - | * | /


## Semantics

{STACK} ->  1. Push token or item onto stack
            2. token = ""

{POP} -> 1. Remove top item of the stack

{CREATE_NODE} -> 1. New object with operator, left, right

{E_SEMANTICS_ONE} ->    1. {POP} x3
                        2. {CREATE_NODE} with popped values
                        3. {STACK}
