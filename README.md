# Integrado API

### NodeJS version => 16.15.1

## Install npm packages

    npm install

## Run the app

    node server.js

# REST API

This REST API consumes data from endpoint http://universities.hipolabs.com/search?country=<COUNTRY>

## Get list of All Universities

### Request

`GET /universities/`

    curl -i -H 'Accept: application/json' http://localhost:6789/universities/

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 62256
    Connection: keep-alive
    Keep-Alive: timeout=5

    [
        [
            {
                "_id": "62aba0d46c19ede0b4269f75",
                "state-province": "Buenos Aires",
                "name": "Universidad Austral Buenos Aires",
                "country": "Argentina"
            },
            {
                "_id": "62aba0d46c19ede0b4269f76",
                "state-province": "Ciudad Autónoma de Buenos Aires",
                "name": "Universidad CAECE, Buenos Aires",
                "country": "Argentina"
            }
        ]
    ]

## Get list of all universities by country

### Request

`GET /universities?county=<COUNTRY>`

    curl -i -H 'Accept: application/json' http://localhost:6789/universities?county=argentina

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 62256
    Connection: keep-alive
    Keep-Alive: timeout=5

    [
        [
            {
                "_id": "62aba0d46c19ede0b4269f75",
                "state-province": "Buenos Aires",
                "name": "Universidad Austral Buenos Aires",
                "country": "Argentina"
            },
            {
                "_id": "62aba0d46c19ede0b4269f76",
                "state-province": "Ciudad Autónoma de Buenos Aires",
                "name": "Universidad CAECE, Buenos Aires",
                "country": "Argentina"
            }
        ]
    ]

## Create a new university

### Request

`POST /universities?country=<COUNTRY>`

    curl -X POST http://localhost:6789/universities?country=brazil -H "Content-Type: application/json" -d '{"domains": ["uvs.edu"],"web_pages": ["http://www.uvs.edu/"],"state-province": "test1","name": "test1","country": "test1","alpha_two_code": "SR"}'

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 179
    Connection: keep-alive
    Keep-Alive: timeout=5

    [
        {
            "domains": [
                "uvs.edu"
            ],
            "web_pages": [
                "http://www.uvs.edu/"
            ],
            "state-province": "test",
            "name": "test",
            "country": "Brazil",
            "alpha_two_code": "SR",
            "_id": "62abade957e6a85f20182f24",
            "__v": 0
        }
    ]

## Get university by id and country

### Request

`GET /universities/<ID>?country=<COUNTRY>`

    curl -i -H 'Accept: application/json' http://localhost:6789/universities/62aba0d56c19ede0b426a036?country=brazil

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 224
    Connection: keep-alive
    Keep-Alive: timeout=5

    [
        {
            "_id": "62aba0d56c19ede0b426a036",
            "domains": [
                "baraodemaua.br"
            ],
            "web_pages": [
                "http://www.baraodemaua.br/"
            ],
            "state-province": null,
            "name": "Centro Universitário Barao de Maua",
            "country": "Brazil",
            "alpha_two_code": "BR",
            "__v": 0
        }
    ]

## Update university by id and country

### Request

`PUT /universities/<ID>?country=<COUNTRY>`

    curl -i -H 'Accept: application/json' -X PUT http://localhost:6789/universities/62aba0d56c19ede0b426a037?country=brazil -d '{"name": "teste2"}'

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 214
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
        "_id": "62aba0d56c19ede0b426a036",
        "domains": [
            "baraodemaua.br"
        ],
        "web_pages": [
            "http://www.baraodemaua.br/"
        ],
        "state-province": null,
        "name": "Universidadeo Barao de Maua",
        "country": "Brazil",
        "alpha_two_code": "BR",
        "__v": 0
    }

## Delete university by id and country

### Request

`DELETE /universities/<ID>?country=<COUNTRY>`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:6789/universities/62aba0d56c19ede0b426a036?country=brazil

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 38
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
        "acknowledged": true,
        "deletedCount": 1
    }
