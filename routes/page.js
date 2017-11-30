module.exports = init;

const sign = require('../bin/sign');

function init(app,directory){
    app.get('/signPage',function(req,res){
        console.log('asdf');
        sign.logOut(req);
        res.sendFile('signPage.html');
    });


    app.get('/homePage',function(req,res){
        var id = getUserID(req);
        res.redirect(`/homePage/${id}`)
    });

    app.get('/homePage/:id',function(req,res){
        res.sendFile('homePage.html');
    });


    app.get('/publishPage',function(req,res){
        res.sendFile('publishPage.html');
    });

    app.get('/myItem',function(req,res){
        res.sendFile('myItem.html');
    });

    app.get('/itemList',function(req,res){
        res.sendFile('itemList.html');
    });

    app.get('/itemDetail/:itemID', function(req, res){
        res.sendFile('itemDetail.html');
        /*req.session.itemID = req.params['id'];
        let itemID = getitemID(req);

        if(itemID){
            res.sendFile('itemDetail.html');
        }else{
            res.redirect('/personalHomePage');
        }*/
    });

    app.get('/orderPage/:itemID',function(req,res){
        res.sendFile('orderPage.html');
    });

    app.get('/orderDetail/:orderID', function(req, res){
        res.sendFile('orderDetail.html');
    });

    app.get('/orderList/:itemID',function(req,res){
        res.sendFile('orderList.html');
    });

    app.get('/signInSuccess',function(req,res){
        res.sendFile('signInSuccess.html');
    });

    app.get('/signInFail',function(req,res){
        res.sendFile('signInFail.html');
    });
}

function getUserID(req){
    return req.session.ID;
}

function getItemID(req){
    return req.session.itemID;
}

function getOrderID(req){
    return req.query.ID;
}

