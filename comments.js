// Create web server

var express = require('express');
var router = express.Router();
var comments = require('../models/comments');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Get all comments
router.get('/', function(req, res) {
    comments.getAll(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

// Get one comment
router.get('/:id', function(req, res) {
    comments.getOne(req.params.id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

// Create a comment
router.post('/', urlencodedParser, function(req, res) {
    comments.create(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

// Delete a comment
router.delete('/:id', function(req, res) {
    comments.delete(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

// Update a comment
router.put('/:id', urlencodedParser, function(req, res) {
    comments.update(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;