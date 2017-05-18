# parser-recursive-descent
Just learning about Recursive Descent.

## Grammar - 0.0.1 - TOKENS

START -> TOKEN

TOKEN -> DIGIT NUMBER | . RATIONAL | ' STRING ' | [ VAR ]

NUMBER -> DIGIT NUMBER | . RATIONAL | {empty}

RATIONAL -> DIGIT RATIONAL | {empty}

STRING -> CHARACTER STRING | {empty}

CHARACTER -> NUMBER | ALPHABET | SYMBOL | (ESCAPE_CHARACTER)?

VAR -> LOWERCASE VAR_NAME

VAR_NAME -> LOWERCASE VAR_NAME | _ VAR_NAME | {empty}

ALPHABET -> LOWERCASE | UPPERCASE

DIGIT -> [0..9]

LOWERCASE -> [a..z]

UPPERCASE -> [A..Z]

SYMBOL -> [~,`,!,@,#,$,%,^,..] & does not include '

(ESCAPE_CHARACTER -> '')?
