var quoteLink = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote";
var unsplash = "https://source.unsplash.com/collection/1127169/";

var canvas;
var canvasCtx;
var size = 500;

function createHtmlElements() {
    canvas = document.createElement('canvas');
    canvas.height = size;
    canvas.width = size;
    document.body.appendChild(canvas);

    var btn = document.createElement('a');
    btn.innerText = "Save";
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
        var dataURL = canvas.toDataURL('image/jpg');
        btn.href = dataURL;
        btn.download = "image-name.jpg";
    });
}

function parseQuote(response) {
    text = response.quoteText;
    var lines = text.replace(/(?![^\n]{1,32}$)([^\n]{1,32})\s/g, '$1\n').split("\n");
    canvasCtx.font = "24px consolas";
    canvasCtx.fillStyle = "violet";
    canvasCtx.strokeStyle = "black";
    canvasCtx.lineWidth = 0.5;
    lines.map((r, i) => canvasCtx.fillText(r, 50, 100 + 30 * i));
    lines.map((r, i) => canvasCtx.strokeText(r, 50, 100 + 30 * i));
}

function loadQuota() {
    $.ajax({
        url: quoteLink,
        dataType: 'jsonp'
    });
    canvasCtx = canvas.getContext("2d");
}

function loadImage(horizontalSize, verticalSize, horizontalMargin, verticalMargin) {
    return new Promise(function (resolve, reject) {
        var img;
        img = new Image();
        img.crossOrigin = "anonymous";

        var url = unsplash + horizontalSize + "x" + verticalSize;
        img.src = url;
        img.onload = function () {
            canvasCtx = canvas.getContext("2d");
            canvasCtx.drawImage(img, horizontalMargin, verticalMargin);
            resolve();
        }
    });
}

createHtmlElements();
var min = 150;
var max = 350;
var horizontal = Math.floor(Math.random() * (max - min)) + min;
var vertical = Math.floor(Math.random() * (max - min)) + min;
var firstImage = loadImage(horizontal, vertical, 0, 0);
var secondImage = loadImage(size - horizontal, vertical, horizontal, 0);
var thirdImage = loadImage(horizontal, size - vertical, 0, vertical);
var fourthImage = loadImage(size - horizontal, size - vertical, horizontal, vertical);

Promise.all([firstImage, secondImage, thirdImage, fourthImage]).then(loadQuota);