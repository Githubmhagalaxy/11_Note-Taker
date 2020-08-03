var express = require('express');
var router = express.Router();
var fs = require('fs');
const { default: ShortUniqueId } = require('short-unique-id');

// initialize uid
var uid = new ShortUniqueId();

/* GET home page. */
router.get('/notes', (req, res, next) => {
    fs.readFile('./public/notes.html', (err, data) => {
        if(err) {
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    })
});

router.get('/api/notes', (req, res, next) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) {
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(data);
    })
});

router.post('/api/notes', (req, res, next) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) {
            throw err;
        }
        // add new note to db
        let currentDB = JSON.parse(data);
        let newData = req.body;
        newData.id = uid();
        currentDB.push(newData);
        fs.writeFile('./db/db.json', JSON.stringify(currentDB), error => {
            if(error) {
                throw error;
            }
        });

        // end response
        res.writeHead(201, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(newData));
    })
});

router.delete('/api/notes/:id', (req, res, next) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) {
            throw err;
        }
        // add new note to db
        let currentDB = JSON.parse(data);
        let { id } = req.params;
        let newDB = currentDB.filter(item => {
            return (item.id !== id);
        });
        fs.writeFile('./db/db.json', JSON.stringify(newDB), error => {
            if(error) {
                throw error;
            }
        });
        // end response
        res.writeHead(201, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            status: 'Success'
        }));
    })
});

router.get('/*', function(req, res, next) {
    fs.readFile('./public/index.html', (err, data) => {
        if(err) {
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    })
});
module.exports = router;
