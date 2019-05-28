const router = require('express').Router();

const Posts = require('../data/db.js');

router.get('/', async (req, res) => {
    try {
        console.log(req)
        const posts = await Posts.find(req.query);
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the posts.'})
    }
})

router.get('/:id', async (req, res) => {
    try {

        console.log(req.params.id)
        const postsById = await Posts.findById(req.params.id)
        if (postsById) {
            res.status(200).json(postsById)
        } else {
            res.status(400).json({ message: 'Posts not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the posts'})
    }
})

router.get('/:id/comments', async (req,res) => {
    try {
        console.log(req);
        const commentsById = await Posts.findPostComments(req.params.id)
        if (commentsById) {
            res.status(200).json(commentsById)
        } else {
            res.status(500).json({ message: 'Error retrieving comments'})
        }
    } catch (error) {

    }
})

router.post('/', (req, res) => {
    try {

    } catch (error) {

    }
})

router.post('/:id/comments', (req, res) => {
    try {

    }catch {

    }
})


router.delete('/:id', (req,) => {
    try {

    } catch {

    }
})

module.exports = router;