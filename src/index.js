import Welcome from './Welcome'

var $greet = document.getElementById('app')
var m = new Welcome('MX')

$greet.innerHTML = m.greet()
