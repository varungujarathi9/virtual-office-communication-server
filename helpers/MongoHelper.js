"use strict";
// import modules
var MongoClient = require('mongodb').MongoClient;
var configs = require("../configs.json");

// declare and initiate variables
var mongoHost = configs["mongo-db-host"];

insert = (jsonVar) =>{
    MongoClient.connect(mongoHost, (err, db) => {
        if (err) throw err;

        var dbo = db.db(configs["mongo-db-name"]);

    })
}