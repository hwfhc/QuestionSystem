var express = require('express');

var config = {
    app: express(),
    directory: '/usr/local/Repositories/GuildHall/public',
    modules: []
};

var sign = (require('./sign'))(config);

var server = app.listen(80,function(){
    console.log('server start...');
});
