var port = process.env.PORT || 4321,
    path = require('path'),
    express = require('express'),
    app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.listen(port, function () {
    console.log('Static web server running on port ' + port);
});