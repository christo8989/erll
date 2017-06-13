var expression = "[name] == 'Chris' and [age_one] < [age_two]"
var dictionary = {
    name: "David",
    age_one: 19,
    age_two: 16,
}

var erll = new ERLL();
var result

Clock.time( "ERLL", function () {
    result = erll.parse( expression, dictionary )
} ) 

console.log( "Expression:", expression )
console.log( result )