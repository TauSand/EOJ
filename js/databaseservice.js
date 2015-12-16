var database = angular.module("databaseservice", []);

function initData() {
    return {
        _id: '1',
        name: 'Egon Jensen'
    }
}

database.service('citizen', function () {
    var dbName = 'citizens';
    var db = new PouchDB(dbName);
    var listeners = [];
    //set init data if it is not there
    db.get("1").catch(function(){
        db.put(initData());
    });

    db.changes({
        since: 'now',
        live: true,
        include_docs: true
    }).on('change', function (change) {
        _.each(listeners, function(listener) {
            listener(change.doc);
        });
    }).on('error', function (err) {
        // handle errors
    });

    return {
        addListener: function(listener) {
            listeners.push(listener);
        },
        getCitizen: function() {
            return db.get("1");
        },

        updateCitizen: function(data) {

        }
    }
});