// "use strict";
// import modules
var MongoClient = require('mongodb').MongoClient
var configs = require("../configs.json")

// declare and initiate variables
var mongoHost = configs["mongo-db-host"]
var mongoDbName = configs["mongo-db-name"]

module.exports = {
    insertOne: function(jsonData, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(collection).insertOne(jsonData, (err, res) => {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            })
        })
    },
    insertMany: function(jsonData, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(collection).insertMany(jsonData, (err, res) => {
                if (err) throw err;
                console.log(res);
                db.close();
            })
        })
    },
    find: function(key, value, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(collection).find({key:value}).toArray((err, res) => {
                if (err) throw err;
                console.log(res);
                db.close();
                return res
            })
        })
    },
    findIn: function(key, list, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(collection).find({key:{$in: list}}).toArray((err, res) => {
                if (err) throw err;
                console.log(res);
                db.close();
                return res
            })
        })
    },
    updateOne: function(filterKey, filterValue, updateKey, updateValue, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(collection).updateOne({filterKey:filterValue}, {$set: {updateKey:updateValue}}, (err, res) => {
                if (err) throw err;
                console.log(res);
                db.close();
            })
        })
    },
    exists: function(key, value, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            var exists_count = dbo.collection(collection).find({key:value}).count()
            if (exists_count > 0){
                return true
            }
            else{
                return false
            }

        })
    }
}
