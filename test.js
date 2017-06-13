var expression = "[name] == 'chris' and 20 < [age]"
var dictionary = {
    name: "chris",
    age: 19,
}

var erll = new ERLL();
var result

Clock.time( "ERLL", function () {
    result = erll.parse( expression, dictionary )
} ) 

console.log( "Expression:", expression )
console.log( result )