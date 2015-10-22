
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var pako = require('pako');
var request = require('request');
var spawn = require('child_process').spawn;

var command = process.argv[2];
var target = process.argv[3];

var data = 'dVPPb9MwFP5XPLNJW5UfTbtNW9buxIED0qSJYy5u8tIEXLuynZZSRaIrF8QFOIB2mHbgNCEkJG5I/DURoP0X2E66dQxUqX7vfX7f+/E5czwBIXPOcIjbXtvrYgdLUCpnQxzOscoVBQ112sGeG7TdToA63bAbhN1D5KLTgklFmEKPcwU6MQEZi3ysarpfLy+qxatqcVktPpn/s9fV4rxavL3+8Ob3+XcPVcuP1fJLdfa1Wl5Vy8tq+c3Yi8/XF1c/3/2ozt57nqdJ04JSTQugOVNCJTg4LoQApnSNuh4udYwnYDrO1Ijazmdj07h1HTwhtDBubyPhsYGQAY4jhiLWW5molwFJrKXtESiC4owIvY5+hAuVugcRRv4dnJERaHCSw3TMhdJ4zJnSvengNE9U1k9gksfgWsdBhQThyphQMqDQZ/x/hGQ8puCO+CDXxxQGrg64MRmbtDtFZiDXOBomq9rx5tyeZc+v/X+UWRPsDuvmfA0p7xeQamYL2FMXqP0VaBMNag0D1xG7Yv9mx70BT2arpCw4fgSUcgeJ5lFt6KtBk9Pc1JFaKiO4rbmmdCzlmtAtB7XCAaRcgLFIqkCguWEb8OeuzF/oBx5qWyRaEB060qOVETP89bVUL8PcgxDtd7y9rSOLm0ZqPOaUixA92N3dPbK0JH42FLxgidtAmaTbbQe1txx0uL+1UxNkwT36wDsQMKphO1j9pm8ne0ompAneDui3NE3rZluI6k/QRPyIRWyas4RPPc4oJwnqo7RgsZFye6eu7vvoycnDkxBNhU5D5tupZ2KSU/AoH25H+G89ItzMYH64LMs/';

// https://github.com/uupaa/Base64.js/issues/2
function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
}
function btoa(str) {
  var buffer;
  if (str instanceof Buffer) {
    buffer = str;
  }
  else {
    buffer = new Buffer(str.toString(), 'binary');
  }
  return buffer.toString('base64');
}

var encode = function(obj) {
  var str = JSON.stringify(obj);
  var data = pako.deflate(str, { to: 'string',raw:true });
  return btoa(data);
};

var decode = function(str) {
  var data = atob(str);
  data = pako.inflate(data, { to: 'string', raw:true, });
  return JSON.parse(data);
};

if (command === 'push') {
  var base = 'http://lite.runstant.com?v=0.0.3';
  var file = path.join(target, 'runstant.json');
  var data = fs.readFileSync(file, 'utf8');
  var obj = JSON.parse(data);
  var hash = encode(obj);
  var url = base + '#' + hash;

  spawn('open', [url]);
}

if (command === 'pull') {
  // var obj = decode(data);

  var api = 'https://www.googleapis.com/urlshortener/v1/url';
  var query = querystring.stringify({
    key: 'AIzaSyA3mnqKXrHh8uGNfJPnJmI97KTnpifJ4DM',
    shortUrl: target,
  });

  var path = [api, query].join('?');

  request(path, function(error, response, body) {
    var data = JSON.parse(body);
    var hash = url.parse(data.longUrl).hash;
    var runstantData = decode(hash.substr(1));

    var dirname = runstantData.setting.title;

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    var code = runstantData.code;
    // console.log(runstantData);
    fs.writeFile(dirname + '/index.html', code.html.value);
    fs.writeFile(dirname + '/style.css', code.style.value);
    fs.writeFile(dirname + '/main.js', code.script.value);
    fs.writeFile(dirname + '/runstant.json', JSON.stringify(runstantData, null, '  '));
  });
}

