var database = angular.module("databaseservice", []);

function initData() {
    return {
        _id: '1',
        name: 'Egon Sørensen'
    }
}

database.service('citizen', function () {
    var dbName = 'citizens';
    var db = new PouchDb(dbName);

    //set init data if it is not there
    db.get("1").catch(function(){
        db.put(initData());
    });

    return {
        getCitizen: function() {
            return db.get("1");
        }
    }
});