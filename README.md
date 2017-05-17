# parser-recursive-descent
Just learning about Recursive Descent.

## Grammar

START -> ID E

E -> + ID E | - ID E | * ID E | / ID E | {empty}

ID -> [ VAR ] | [0..9] NUMBER

VAR -> LOWERCASE VAR_NAME

VAR_NAME -> LOWERCASE VAR_NAME | _ VAR_Name | {empty}

NUMBER -> [0..9] NUMBER | {empty}

LOWERCASE -> [a..z]





#### Grammar (In the Future)

START -> ID E

E -> + ID E | - ID E | * ID E | / ID E | {empty}

ID -> ' STRING ' | [0..9] NUMBER

STRING -> CHAR STRING | {empty}

CHAR -> NUMBER | LETTER | SYMBOL | ESCAPE_CHAR

NUMBER -> [0..9] NUMBER | {empty}

LETTER -> LOWERCASE | UPPERCASE

LOWERCASE -> [a..z]

UPPERCASE -> [A..Z] 

SYMBOL -> [`,~,!,@,... except for ']

ESCAPE_CHAR -> ' ' 