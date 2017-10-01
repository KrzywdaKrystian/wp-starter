// TODO: init theme
// TODO: init frontend
//

var fs = require('fs');
var request = require('request');
var unzip = require('unzip');

const WORDPRESS_ZIP_URL = "https://wordpress.org/latest.zip";
const WORDPRESS_ZIP_LOCALE = "wordpress.zip";

const MINIMAL_CSS_URL = "https://github.com/KrzywdaKrystian/minimal-css/archive/master.zip";
const MINIMAL_CSS_LOCALE = "front.zip";

downloadWordpress();

function downloadWordpress() {
    var body = null;
    var contentLength;

    request({url: WORDPRESS_ZIP_URL, encoding: null}, function (err, resp, body) {
        if (err) throw err;
        fs.writeFile(WORDPRESS_ZIP_LOCALE, body, function (err) {
            console.log('\033c');
            console.log("Wordpress downloaded!");
            unzipWordpress();
        });
    }).on('response', function (response) {
        contentLength = response.headers['content-length'];
    }).on('data', function (data) {
        body += data;
        console.log('\033c');
        console.log('Download Wordpress: ' + parseInt(body.length / contentLength * 100) + '%');
    })
}

function unzipWordpress() {
    console.log('Wordpress unpacking...');
    fs.createReadStream(WORDPRESS_ZIP_LOCALE).pipe(unzip.Extract(
        {
            path: __dirname
        }
    )).on('finish', function () {
        console.log('Wordpress unpacked!');
        fs.unlink(WORDPRESS_ZIP_LOCALE, function () {
            console.log(WORDPRESS_ZIP_LOCALE + ' deleted');
        });
        fs.rename('wordpress', 'www', function () {
            console.log('rename "wordpress" to "www"');
        });
        //downloadMinimalCss();
    });
}

function downloadMinimalCss() {
    var body = null;
    var contentLength;

    request({url: MINIMAL_CSS_URL, encoding: null}, function (err, resp, body) {
        if (err) throw err;
        fs.writeFile(MINIMAL_CSS_LOCALE, body, function (err) {
            console.log('\033c');
            console.log("minimal-css downloaded!");
            //unzipWordpress();
        });
    }).on('response', function (response) {
        contentLength = response.headers['content-length'];
    }).on('data', function (data) {
        body += data;
        console.log('\033c');
        console.log('Download minimal-css (https://github.com/KrzywdaKrystian/minimal-css): ' + parseInt(body.length / contentLength * 100) + '%');
    })
}

