var database = angular.module("databaseservice", []);

database.service('database', function () {
    return getDatabase("database");
});

function getDatabase(name) {
    var db = new PouchDB(name, {adapter: 'websql'});
    if(!window.databases) {window.databases = {}}
    window.databases[name] = db;
    _.each(getInitData(), function(doc) {
        db.put(doc);
    });
    var listeners = [];
    db.changes({
        since: 'now',
        live: true,
        include_docs: true
    }).on('change', function (change) {
        _.each(listeners, function (listener) {
            listener(change.doc);
        });
    }).on('error', function (err) {
        // handle errors
    });
    return {
        addListener: function (listener) {
            listeners.push(listener);
        },
        getDatabase: function() {return db}
    }
}

function getInitData() {
    return [
            {
                _id: '1',
                type: 'citizen',
                name: 'Egon Jensen'
            },
            {
                _id: '2',
                type: 'citizen',
                name: 'Inger Bennedict'
            },
            {
                _id: '3',
                type: 'visit',
                citizen: '1',
                start: '11:15',
                end: '11:55'
            },
            {
                _id: '4',
                type: 'visit',
                citizen: '2',
                start: '12:20',
                end: '12:50'
            }
        ];
}