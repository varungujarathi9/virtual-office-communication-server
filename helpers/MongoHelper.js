// "use strict";
// import modules
var MongoClient = require('mongodb').MongoClient
var configs = require("../configs.json")

// declare and initiate variables
var mongoHost = configs["mongo-db-host"]
var mongoDbName = configs["mongo-db-name"]

module.exports = {
    insertOne: function(jsonData, tableName){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(tableName).insertOne(jsonData, (err, res) => {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            })
        })
    },
    insertMany: function(jsonData, tableName){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(tableName).insertMany(jsonData, (err, res) => {
                if (err) throw err;
                console.log("documents inserted");
                db.close();
            })
        })
    },
    find: function(key, value, tableName){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(tableName).find({key:value}).toArray((err, res) => {
                if (err) throw err;
                console.log(result);
                db.close();
                return result
            })
        })
    },
    exists: function(key, value, tableName){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            var exists_count = dbo.collection(tableName).find({key:value}).count()
            if (exists_count > 0){
                return true
            }
            else{
                return false
            }

        })
    }
}
