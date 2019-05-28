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

router.post('/', (req, res) => {
    try {

    } catch (error) {

    }
})

router.post('/:id/comments', (req, res) => {
    try {

    }catch (error) {

    }
})


router.delete('/:id', (req,) => {
    try {

    } catch (error) {

    }
})

router.put('/:id', (req, res) => {
    try {
    
    } catch (error) {

    }
})

module.exports = router;