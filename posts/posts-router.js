const router = require('express').Router();

const Posts = require('../data/db.js');
//working
router.get('/', async (req, res) => {
    try {
        console.log(req)
        const posts = await Posts.find(req.query);
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "The posts information could not be retrieved."})
    }
})
//working
router.get('/:id', async (req, res) => {
    try {

        console.log(req.params.id)
        const postsById = await Posts.findById(req.params.id)
        console.log(` here is posts by id ${postsById}`)
        if (postsById.length > 0) {
            console.log(postsById)
            res.status(200).json(postsById)
        } else {
            res.status(404).json({ message: 'Posts not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "The post with the specified ID does not exist."})
    }
})
//working
router.get('/:id/comments', async (req,res) => {
    try {
        const commentsById = await Posts.findPostComments(req.params.id)
        if (commentsById.length > 0) {
            res.status(200).json(commentsById)
        } else {
            res.status(404).json({ message: 'The post information could not be retrieved.'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'The post inofrmation could not be retrieved'})
    }
})
//working
router.post('/', async (req, res) => {

    try {
        const { title, contents } = req.body
        if ( !title || !contents ) {
            res.status(400).json({ message: "Please provide title and contents for posts"})
        } else {
            res.status(201).json(req.body)
        }

    } catch (error) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
})
//come back to this one.  at top of readme.
router.post('/:id/comments', async (req, res) => {
    try {
        const id = req.params.id;
        //const commentsById = await Posts.findPostComments(req.params.id)
        console.log(id)
        const { text } = req.body
        if (!id) {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        } else if (!text) {
            res.status(400).json({ message: "Please provide text for the comment"})
        } else {
            res.status(201).json(req.body)
        }

    }catch (error) {
        res.status(500).json({ message: "There was an error saving the comment to the database"})
    }
})

//working
router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        console.log(count + ' here is count')
        if (count > 0) {
            res.status(200).json({message: "It was removed"})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({ message: "The post could not be removed."})
    }
})
//working
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, contents } = req.body;
        const post = await Posts.update(id, req.body);
        if (!title || !contents) {
            res.status(404).json({ message: "Please provide title and contents for the post." })
        } else {
            res.status(200).json(req.body)
        }
    
    } catch (error) {
        res.status(500).json({error: "The post information could not be modified."})
    }
})

module.exports = router;