var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

app.set('views', require('path').join(__dirname, 'views'));
app.use(express.static(require('path').join(__dirname, 'public')));


app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/:datetime', function (req, res) {
    var sDate = decodeURI(req.params.datetime);
    sDate = decodeURI(sDate);
    if(sDate.match(/^\d+$/)){
        sDate = parseInt(sDate);
    }
    var date = new Date(sDate);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if(date.toString() == 'Invalid Date'){
        res.send('null');
    } else {
        var data = {
            "unix": date.getTime(),
            "natural": months[date.getMonth()] + ' ' + date.getDate() + ',' + date.getFullYear()
        }
    }

    res.send(data);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


