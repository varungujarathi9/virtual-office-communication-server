// "use strict";
// import modules
var MongoClient = require('mongodb').MongoClient

var configs = require("../configs.json")

// declare and initiate variables
var mongoHost = configs["mongo-db-host"]
var mongoDbName = configs["mongo-db-name"]


module.exports = {
    insertOne: function(jsonQuery, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(collection).insertOne(jsonQuery, (err, res) => {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            })
        })
    },
    insertMany: function(jsonQuery, collection){
        MongoClient.connect(mongoHost, (err, db) => {
            if (err) throw err;

            var dbo = db.db(mongoDbName);
            dbo.collection(collection).insertMany(jsonQuery, (err, res) => {
                if (err) throw err;
                console.log(res);
                db.close();
            })
        })
    },
    find: async function(key, value, collection){
        let result
        try{
            // connect to mongo host
            var mongoClient = MongoClient(mongoHost, {useUnifiedTopology: true})
            await mongoClient.connect()

            // connect to DB
            let dbo = mongoClient.db(mongoDbName)
            // select mongo collection
            let output = await dbo.collection(collection).findOne({key:value})

            result = output
        }
        catch(err){
            console.log(err)
            result  = false
        }
        finally{
            await mongoClient.close();
            return await Promise.resolve(result)
        }
    },

    // finds mongo document matching values from a list
    findIn: async function(key, list, collection){
        try{
            // connect to mongo host
            var mongoClient = MongoClient(mongoHost, {useUnifiedTopology: true})
            await mongoClient.connect()

            // connect to DB
            let dbo = mongoClient.db(mongoDbName)
            // select mongo collection
            let output = await dbo.collection(collection).findOne({key:{$in: list}})

            result = output
        }
        catch(err){
            console.log(err)
            result  = false
        }
        finally{
            await mongoClient.close();
            return await Promise.resolve(result)
        }
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
    exists: async function(jsonQuery, collection){
        let result
        try{
            // connect to mongo host
            var mongoClient = MongoClient(mongoHost, {useUnifiedTopology: true})
            await mongoClient.connect()

            // connect to DB
            let dbo = mongoClient.db(mongoDbName)
            // select mongo collection
            let output = await dbo.collection(collection).findOne(jsonQuery)

            if(output !== null && output !== undefined){
                result = true
            }
            else{
                result = false
            }
        }
        catch(err){
            console.log(err)
            result  = false
        }
        finally{
            await mongoClient.close();
            return await Promise.resolve(result)
        }
    }
}
