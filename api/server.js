const express = require('express');

const postsRouter = require('../posts/posts-router.js')

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send(
    `<h1>Its working</h1>`
    )
});

server.use('api/posts', postsRouter);

module.exports = server; 