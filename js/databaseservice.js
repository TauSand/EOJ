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
        getVisit: function (id) {
            return new Promise(function (fulfill, reject) {
                db.get(id).then(function (visit) {
                    db.get(visit.citizen).then(function (citizen) {
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
            generelinfo: 'Egon har 85% nedsat syn, samt 50% nedsat hørelse',
            assignments: [
                {
                    level3: 'Hjælp ud af sengen',
                    level2: 'mobilitet',
                    level1: ['Ændre kropsstilling'],
                    comments: [{text: 'Hjælp til selvhjælp.', link: ['Periodevise smerter']}]
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
                        'Skaffe sig varer og tjenesteydelser': 3
                    }

                },
                {
                    title: 'Samfundsliv',
                    assesments: {'Have lønnet beskæftigelse': 4}
                },
                {
                    title: 'Egenomsorg',
                    assesments: {
                        'Vaske sig': 2,
                        'Kropspleje': 2,
                        'Af- og påklædning': 3,
                        'Drikke': 0,
                        'Fødeindtagelse': 0,
                        'Spise': 1,
                        'Varetage egen sundhed': 2,
                        'Gå på toilet': 1
                    }
                },
                {
                    title: 'Mobilitet',
                    assesments: {
                        'Løfte og bære': 3,
                        'Bevæge sig omkring': 3,
                        'Bruge transportmidler': 2,
                        'Færden i forskellige omgivelser': 2,
                        'Forflytte sig': 0,
                        'Ændre kropsstilling': 2,
                        'Muskelstyrke': 2,
                        'Gå': 2,
                        'Udholdenhed': 3
                    }

                },
                {
                    title: 'Mentale funktioner',
                    assesments: {
                        'Anvende kommunikationsudstyr': 1,
                        'Hukommelse': 0,
                        'Orienteringsevne': 0,
                        'Overordnede kognitive funktioner': 1,
                        'Følelsesfunktioner': 2,
                        'Energi og handlekraft': 0,
                        'Tilegne sig færdigheder': 2
                    }

                }

            ],

            sul: [
                {
                    title: "Funktionsniveau",
                    states: {
                        "Problem relateret til personlig pleje": {
                            precision: "Skal hjælpes i det daglig hygiejne",
                            comments: []
                        },
                        "Problem relateret til daglige aktiviteter": {precision: "Har brug for hjælp", comments: []}
                    },

                },

                {
                    title: "Bevægeapparat",
                    states: {"Problem vedr. mobilitet og bevægelse": {precision: "Balanceproblemer", comments: []}}

                },

                {
                    title: "Ernæring",
                    states: {
                        "Problem vedr. væskeindtag": {precision: "", comments: []},
                        "Problem vedr. fødeindtag": {precision: "", comments: []},
                        "Vægtændring": {precision: "", comments: []},

                        "Overvægt": {
                            precision: "Vægten skal kontrolleres da borger har for højt blodtryk, kolesterol og blodglukose.",
                            comments: [
                                "Egon har fortsat forhøjet kolesteroltal. Morgenmad laves om til havregrød.",
                                "Ny kostplan er på vej fra diætist."
                            ]
                        },
                        "Undervægt": {precision: "", comments: []}
                    }

                },

                {
                    title: "Hud og slimhinder",
                    states: {
                        "Kirurgisk sår": {precision: "", comments: []},
                        "Diabetisk sår": {precision: "", comments: []},
                        "Cancersår": {precision: "", comments: []},
                        "Tryksår": {precision: "", comments: []},
                        "Arterielle sår": {precision: "", comments: []},
                        "Hudproblem": {precision: "", comments: []},
                        "Blandingssår": {precision: "", comments: []},
                        "Traumesår": {precision: "", comments: []}
                    }
                },
                {
                    title: "Kommunikation",
                    states: {"Kommunikationsvanskeligheder": {precision: "", comments: []}}
                },

                {
                    title: "Psykosociale forhold",
                    states: {
                        "Problem i samvær med andremennesker": {precision: "", comments: []},
                        "Emotionelt problem": {precision: "", comments: []},
                        "Kognitivt problem": {precision: "", comments: []},
                        "Hukommelsessvækkelse": {precision: "", comments: []},
                        "Misbrugsproblem": {precision: "", comments: []},
                        "Impulskontrolforstyrrelse": {precision: "", comments: []},
                        "Mentalt problem": {precision: "", comments: []}
                    }
                },
                {
                    title: "Respiration",
                    states: {"Respirationsproblem": {precision: "", comments: []}}
                },

                {
                    title: "Cirkulation",
                    states: {"Cirkulationsproblem": {precision: "", comments: []}}
                },

                {
                    title: "Seksualitet",
                    states: {"Problem vedr.seksualitet/seksuel aktivitet": {precision: "", comments: []}}
                },

                {
                    title: "Smerte",
                    states: {
                        "Akutte smerter": {precision: "", comments: []},

                        "Periodevise smerter": {
                            precision: "Borger har periodevise meget kraftige smerter ved højre skulder og højre side af bækken som følge af fald.",
                            comments: ["Smertebehandling er igangsæt. Til revurdering om 5 dage "],
                            isNew: true
                        },
                        "Kroniske smerter": {precision: "", comments: []}
                    }
                },
                {
                    title: "Sanseindtryk",
                    states: {
                        "Problem vedr. lugtesans": {precision: "", comments: []},
                        "Problem vedr. følesans": {precision: "", comments: []},
                        "Problem vedr. syn": {precision: "85% nedsættelse", comments: []},
                        "Problem vedr. hørelse": {precision: "50% nedsættelse.", comments: []},
                        "Problem vedr. smagssans": {precision: "", comments: []}
                    }

                },

                {
                    title: "Søvn og hvile",
                    states: {
                        "Forstyrrelse af døgnrytme": {precision: "", comments: []},
                        "Søvnforstyrrelse": {precision: "", comments: []}
                    }

                },

                {
                    title: "Viden og udvikling",
                    states: {
                        "Utilstrækkelig indsigt i behandling": {precision: "", comments: []},
                        "Utilstrækkelig sygdomsindsigt": {precision: "", comments: []}
                    }

                },

                {
                    title: "Udskillelse af affaldsstoffer",
                    states: {"Afføringsinkontinens": {precision: "", comments: []}},
                    "Vandladningsproblem": {precision: "", comments: []},
                    "Urininkontinens": {precision: "", comments: []},
                    "Mave-tarmproblem": {precision: "", comments: []},
                    "Problem med væske fra dræn": {precision: "", comments: []}
                }
            ]
        },
        {
            _id: '2',
            type: 'citizen',
            name: 'Inger Bennedict'
        }
        ,
        {
            _id: '3',
            type: 'visit',
            assignments: [0, 1, 2],
            citizen: '1',
            start: '11:15',
            end: '11:55'
        }
        ,
        {
            _id: '4',
            type: 'visit',
            citizen: '2',
            start: '12:20',
            end: '12:50'
        }
    ]
        ;
}