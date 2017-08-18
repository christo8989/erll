var erll = new ERLL()
$( '#Expression' ).value = "[name] == 'Chris' and [age] > 100 and [has_ice_cream] == false"


function onEvaluate () {
  var expression = $( '#Expression' ).value
  var dictionary = {
    name: 'Dave',
    age: 42,
    has_ice_cream: true,
  }

  var result = null
  var time = Clock.time( "ERLL", function () {
      result = erll.parse( expression, dictionary )
  } )
    
  $( '#ResultOverall' ).innerText = `${ result.value ? 'Success' : 'Fail' } - ${ time }ms`

  console.log(result);

  if ( result.errors.length > 0 ) {
    var $results = $( '#Results' )
    $results.innerText = ''

    var error = ''
    var element = null

    for ( var i = 0; i < result.errors.length; ++i ) {
      error = result.errors[i]

      if ( typeof error === 'string' && error.trim() !== '' ) {
        element = document.createElement( 'dt' )
        element.className = 'color--error';
        element.innerText = error

        $results.append(element)
      }

      element = null
    }
  }
}