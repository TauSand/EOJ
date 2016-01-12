var database = angular.module("databaseservice", []);

database.service('database', function () {
    return getDatabase("database");
});

function getDatabase(name) {
    var db = new PouchDB(name, {adapter: 'websql'});
    if (!window.databases) {
        window.databases = {}
    }
    window.databases[name] = db;
    _.each(getInitData(), function (doc) {
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
        getDatabase: function () {
            return db;
        },
        getVisit: function(id) {
            return new Promise(function(fulfill, reject) {
                db.get(id).then(function(visit){
                    db.get(visit.citizen).then(function(citizen) {
                        visit.citizen = citizen;
                        fulfill(visit);
                    });
                });
            });
        }
    }
}

function getInitData() {
    return [
        {
            _id: '1',
            type: 'citizen',
            name: 'Egon Jensen',
            age: 81,
            address: 'Abovej 34, 1 tv.',
            image: '/content/johan.jpg',
            assignments: [
                {
                    level3: 'Hjælp ud af sengen',
                    level2: 'mobilitet',
                    level1: ['Ændre kropsstilling'],
                    comments: [{text: 'Hjælp til selvhjælp.'}]
                },
                {
                    level3: 'Rehabilitering tandbørstning',
                    level2: 'Personlig hygiejne',
                    level1: ['Vaske sig', 'Kropspleje'],
                    comments: [{text: 'Tilbyd evt. at børste hvis smerter er for store.'}]
                },
                {
                    level3: 'Anrette morgenmad',
                    level2: 'Tilberede/anrette mad',
                    level1: ['Lave mad'],
                    comments: [{text: 'Foretrækker rundstykke skåret op, anrettet med lidt smør, en skive ost og en kop kaffe.'}]
                }
            ],
            assesment: [
                {
                    title: 'Praktiske opgaver',
                    assesments: {
                        'Lave husligt arbejde': 3,
                        'Lave mad': 3,
                        'Udføre daglige rutiner': 1,
                        'Skaffe sig varer og tjenesteydelser': 3}

                },
                {
                    title: 'Samfundsliv',
                    assesments:
                        {'Have lønnet beskæftigelse': 4}
                },
                {
                    title: 'Egenomsorg',
                    assesments:
                        {'Vaske sig': 2,
                        'Kropspleje': 2,
                        'Af- og påklædning': 3,
                        'Drikke': 0,
                        'Fødeindtagelse': 0,
                        'Spise': 1,
                        'Varetage egen sundhed': 2,
                        'Gå på toilet': 1}
                },
                {
                    title: 'Mobilitet',
                    assesments: {'Løfte og bære': 3,
                        'Bevæge sig omkring': 3,
                        'Bruge transportmidler': 2,
                        'Færden i forskellige omgivelser': 2,
                        'Forflytte sig': 0,
                        'Ændre kropsstilling': 2,
                        'Muskelstyrke': 2,
                        'Gå': 2,
                        'Udholdenhed': 3}

                },
                {
                    title: 'Mentale funktioner',
                    assesments:
                        {'Anvende kommunikationsudstyr': 1,
                        'Hukommelse': 0,
                        'Orienteringsevne': 0,
                        'Overordnede kognitive funktioner': 1,
                        'Følelsesfunktioner': 2,
                        'Energi og handlekraft': 0,
                        'Tilegne sig færdigheder': 2}

                }

            ]
        },
        {
            _id: '2',
            type: 'citizen',
            name: 'Inger Bennedict'
        },
        {
            _id: '3',
            type: 'visit',
            assignments: [0,1,2],
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