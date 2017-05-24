# parser-recursive-descent
Just learning about Recursive Descent.

## Grammar

START -> ID E 

E -> + {STACK} ID E {PRINT} | - {STACK} ID E {PRINT} | * {STACK} ID E {PRINT} | / {STACK} ID E {PRINT} | {empty}

ID -> [ VAR ] {STACK} {PRINT} | [0..9] {STACK} {PRINT}

VAR -> LOWERCASE VAR_NAME

VAR_NAME -> LOWERCASE VAR_NAME | _ VAR_Name | {empty}

NUMBER -> [0..9] NUMBER | {empty} {PUSH}

LOWERCASE -> [a..z]


## Semantics

{PRINT} -> console.log(stack.pop())

{STACK} -> stack.push(token)
