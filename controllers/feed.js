const Post = require("../models/Post")


module.exports = {
    getContent: async (req, res) => {
        try {
            const Posts = await Post.find()
            res.render("./feed/feed.ejs", {posts: Posts, user: req.user})
        } catch (error) {
            console.log(error)
        }
    },
    postScream: async (req, res) => {
        try {
            await Post.create({content: req.body.screamItem, likes: 0, rescreams: 0})
            res.redirect("/feed")
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
        res.redirect("/feed")
    },
    likePost: async(req, res) => {
        try {
            await Post.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $inc: {likes: 1}
                }
            )
        console.log("Like has been added")
        res.redirect("/feed")
        console.log(particularPost)
        } catch (error) {
            console.log(error)
        }
    },
    rescream: async(req, res) => {
        try {
            await Post.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $inc: {rescreams: 1}
                }
            )
        console.log("Post got rescreamed")
        res.redirect("/feed")
        console.log(particularPost)
        } catch (error) {
            console.log(error)
        }
    }
}