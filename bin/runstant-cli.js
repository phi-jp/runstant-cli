
var fs = require('fs');
var path = require('path');
var pako = require('pako');

console.log(process.argv);

var command = process.argv[2];
console.log(command);

var data = 'dVPPb9MwFP5XPLNJW5UfTbtNW9buxIED0qSJYy5u8tIEXLuynZZSRaIrF8QFOIB2mHbgNCEkJG5I/DURoP0X2E66dQxUqX7vfX7f+/E5czwBIXPOcIjbXtvrYgdLUCpnQxzOscoVBQ112sGeG7TdToA63bAbhN1D5KLTgklFmEKPcwU6MQEZi3ysarpfLy+qxatqcVktPpn/s9fV4rxavL3+8Ob3+XcPVcuP1fJLdfa1Wl5Vy8tq+c3Yi8/XF1c/3/2ozt57nqdJ04JSTQugOVNCJTg4LoQApnSNuh4udYwnYDrO1Ijazmdj07h1HTwhtDBubyPhsYGQAY4jhiLWW5molwFJrKXtESiC4owIvY5+hAuVugcRRv4dnJERaHCSw3TMhdJ4zJnSvengNE9U1k9gksfgWsdBhQThyphQMqDQZ/x/hGQ8puCO+CDXxxQGrg64MRmbtDtFZiDXOBomq9rx5tyeZc+v/X+UWRPsDuvmfA0p7xeQamYL2FMXqP0VaBMNag0D1xG7Yv9mx70BT2arpCw4fgSUcgeJ5lFt6KtBk9Pc1JFaKiO4rbmmdCzlmtAtB7XCAaRcgLFIqkCguWEb8OeuzF/oBx5qWyRaEB060qOVETP89bVUL8PcgxDtd7y9rSOLm0ZqPOaUixA92N3dPbK0JH42FLxgidtAmaTbbQe1txx0uL+1UxNkwT36wDsQMKphO1j9pm8ne0ompAneDui3NE3rZluI6k/QRPyIRWyas4RPPc4oJwnqo7RgsZFye6eu7vvoycnDkxBNhU5D5tupZ2KSU/AoH25H+G89ItzMYH64LMs/';

// https://github.com/uupaa/Base64.js/issues/2
function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
}

var encode = function() {

};

var decode = function(str) {
  var data = atob(str);
  data = pako.inflate(data, { to: 'string', raw:true, });
  return JSON.parse(data);
};

if (command === 'pull') {
  var obj = decode(data);
  fs.writeFile('hoge.json', JSON.stringify(obj, null, '  '));
}

