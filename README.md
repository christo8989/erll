# parser-recursive-descent
Just learning about Recursive Descent.

## Grammar

START -> ID E

E -> + ID E | - ID E | * ID E | / ID E | {empty}

ID -> [0..9] NUMBER  //| [ ID ]

NUMBER -> [0..9] NUMBER | {empty}
