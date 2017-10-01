var fs = require('fs');
var request = require('request');
var unzip = require('unzip');

const WORDPRESS_ZIP_URL = "https://wordpress.org/latest.zip";
const WORDPRESS_ZIP_LOCALE = "wordpress.zip";

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
        console.log('Download wordpress: ' + parseInt(body.length / contentLength * 100) + '%');
    })
}

function unzipWordpress() {
    console.log('Wordpress unpacking...');
    fs.createReadStream(WORDPRESS_ZIP_LOCALE).pipe(unzip.Extract({path: 'www/'}))
        .on('finish', function () {
            console.log('Wordpress unpacked!');
            fs.unlink(WORDPRESS_ZIP_LOCALE, function () {
                console.log(WORDPRESS_ZIP_LOCALE + ' deleted');
            });
        });
}