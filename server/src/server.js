const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('backtester app running on port', app.get('port'));
});
