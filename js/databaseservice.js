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
            plan: [
                {
                    "Profession": "Sosu-hjælper",
                    "Worker": "Robert",
                    "Image": '/content/Robert.jpg',
                    "Start": "8:00",
                    "End": "9:00"
                },
                {
                    "Profession": "Sygeplejerske",
                    "Worker": "Marie",
                    "Image": '/content/sygeplejerske.jpg',
                    "Start": "09:25",
                    "End": "10:15"
                },
                {
                    "Profession": "Sosu-hjælper",
                    "Worker": "Ditte",
                    "Image": '/content/ditte.jpg',
                    "Start": "12:00",
                    "End": "12:30"
                },
                {
                    "Profession": "Sosu-hjælper",
                    "Worker": "Ulla",
                    "Image": '/content/ulla.jpg',
                    "Start": "22:00",
                    "End": "22:30"
                },

            ],
            assignments: [
                {
                    level3: 'Hjælp ud af sengen',
                    level2: 'mobilitet',
                    level1: ['Ændre kropsstilling'],
                    comments: [{
                        text: 'Hjælp til selvhjælp.' +
                        'Egon rejser sig selv op til siddende stilling.' +
                        'Han hjælpes med at få sko og tøj på.' +
                        'Han støttes i at komme op i stående stilling så han ikke mister balancen',
                        link: ['Periodevise smerter']
                    }]
                },
                {
                    level3: 'Tandbørstning',
                    level2: 'Personlig hygiejne',
                    level1: ['Vaske sig', 'Kropspleje'],
                    comments: [{text: 'Tilbyd at børste.'}]
                },
                {
                    level3: 'Anrette morgenmad',
                    level2: 'Tilberede/anrette mad',
                    level1: ['Lave mad'],
                    comments: [{text: 'Rundstykke skåret op, anrettet med lidt smør, en skive ost og en kop kaffe.', link:["Overvægt"] }]
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
                            ],
                            isNew: true
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
                            comments: ["Smertebehandling er igangsat. Til revurdering om 5 dage "],
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
        }
        ,
        {
            _id: '2',
            type: 'citizen',
            name: 'Inger Bennedict',
            age: 89,
            address: 'Abovej 34, 2 tv.',
            image: '/content/inger.jpg',
            generelinfo: 'På kørerstol, blind',
            plan: [
                {
                    "Profession": "Sosu-hjælper",
                    "Worker": "Ditte",
                    "Image": '/content/ditte.jpg',
                    "Start": "7:30",
                    "End": "8:00"
                },
                {
                    "Profession": "Sygeplejerske",
                    "Worker": "Robert",
                    "Image": '/content/Robert.jpg',
                    "Start": "9:25",
                    "End": "10:00"
                },
                {
                    "Profession": "Sosu-hjælper",
                    "Worker": "Ditte",
                    "Image": '/content/ditte.jpg',
                    "Start": "12:00",
                    "End": "12:30"
                },
                {
                    "Profession": "Sosu-hjælper",
                    "Worker": "Ulla",
                    "Image": '/content/ulla.jpg',
                    "Start": "22:00",
                    "End": "22:30"
                },

            ],
            assignments: [
                {
                    level3: 'Hjælp ud af sengen',
                    level2: 'mobilitet',
                    level1: ['Ændre kropsstilling'],
                    comments: [{
                        text: 'Skal løftes ud af seng ved brug af kran'
                    }]
                },
                {
                    level3: 'Tandbørstning',
                    level2: 'Personlig hygiejne',
                    level1: ['Vaske sig', 'Kropspleje'],
                    comments: [{text: 'Tilbyd at børste.'}]
                },
                {
                    level3: 'Anrette morgenmad',
                    level2: 'Tilberede/anrette mad',
                    level1: ['Lave mad'],
                    comments: [{
                        text: 'Rundstykke skåret op, anrettet med lidt smør, en skive ost og en kop kaffe.',
                        link: ["Ernæring"]
                    }]
                }
            ],
            assesment: [
                {
                    title: 'Praktiske opgaver',
                    assesments: {
                        'Lave husligt arbejde': 4,
                        'Lave mad': 4,
                        'Udføre daglige rutiner': 4,
                        'Skaffe sig varer og tjenesteydelser': 4
                    }

                },
                {
                    title: 'Samfundsliv',
                    assesments: {'Have lønnet beskæftigelse': 4}
                },
                {
                    title: 'Egenomsorg',
                    assesments: {
                        'Vaske sig': 3,
                        'Kropspleje': 3,
                        'Af- og påklædning': 3,
                        'Drikke': 0,
                        'Fødeindtagelse': 1,
                        'Spise': 1,
                        'Varetage egen sundhed': 3,
                        'Gå på toilet': 3
                    }
                },
                {
                    title: 'Mobilitet',
                    assesments: {
                        'Løfte og bære': 3,
                        'Bevæge sig omkring': 3,
                        'Bruge transportmidler': 3,
                        'Færden i forskellige omgivelser': 4,
                        'Forflytte sig': 2,
                        'Ændre kropsstilling': 2,
                        'Muskelstyrke': 2,
                        'Gå': 4,
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
                    states: {"Problem vedr. mobilitet og bevægelse": {precision: "Kan ikke bevage ben", comments: []}}

                },

                {
                    title: "Ernæring",
                    states: {
                        "Problem vedr. væskeindtag": {precision: "", comments: []},
                        "Problem vedr. fødeindtag": {precision: "", comments: []},
                        "Vægtændring": {precision: "", comments: []},

                        "Overvægt": {
                            precision: "",
                            comments: [],
                        },
                        "Undervægt": {
                            precision: "Har ikke særlige meget appetit.",
                            comments: ["skal have protein og vitamin drik en gang om ugen"]
                        }
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
                    states: {
                        "Respirationsproblem": {
                            precision: "Har lidt svært med at trække vejret når hun ligger på rykken",
                            comments: [],
                            isNew: true
                        }

                    },

                },

                {
                    title: "Cirkulation",
                    states: {"Cirkulationsproblem": {precision: "Har tit hævede ben", comments: []}}
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
                            precision: "",
                            comments: [""]
                        },
                        "Kroniske smerter": {precision: "", comments: []}
                    }
                },
                {
                    title: "Sanseindtryk",
                    states: {
                        "Problem vedr. lugtesans": {precision: "", comments: []},
                        "Problem vedr. følesans": {precision: "", comments: []},
                        "Problem vedr. syn": {precision: "100% nedsættelse", comments: []},
                        "Problem vedr. hørelse": {precision: "30% nedsættelse.", comments: []},
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
        }
        ,
        {
            _id: '3',
            type: 'visit',
            assignments: [0, 1, 2],
            citizen: '1',
            start: '08:00',
            end: '09:00'
        }
        ,
        {
            _id: '4',
            type: 'visit',
            assignments: [2, 1],
            citizen: '2',
            start: '09:25',
            end: '10:00'
        },
        {
            _id: 'outbox',
            messages: [{text: "Hente toiletpapir", citizen: '1'}, {text: "skifte ble", citizen: '1'}]
        }
    ]
        ;
}