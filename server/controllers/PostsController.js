const {Posts, Users} = require("../models")
const {Op} = require('sequelize')
const fs  = require('fs')

class PostsController {
    static async getPosts(req, res) {
        try {
            const posts = await Posts.findAll({where: {status: true}, order: [['id', 'DESC']], include: [Users]})
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async searchPosts(req, res) {
        try { //order: [['id','DESC']], include: [Users]
            const {keyword} = req.body
            const posts = await Posts.findAll({
                where: {
                    status: true,
                    caption: {
                        [Op.iLike]: `%${keyword ? keyword : ''}%`
                    }
                },
                order: [['id', 'DESC']], include: [Users]
            })
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async detailPosts(req, res) {
        try {
            const posts = await Posts.findOne({where: {id: req.params.id}, include: [Users]})
            posts ?
                res.status(200).json([posts]) :
                res.status(400).json({message: `Article ID ${req.params.id} not found.`})
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async    usersPosts(req, res, next) {
        try {
            if (req.body.profile === true){
                const result = await Posts.findAll({
                    order: [['id', 'DESC']],
                    include: {model: Users, where: {id: req.params.id}}
                })
                result ?
                    res.status(200).json(result) :
                    res.status(400).json({message: `User ID ${req.params.id} not found.`})
            } else {
                const result = await Posts.findAll({
                    where: {status: true},
                    order: [['id', 'DESC']],
                    include: {model: Users, where: {id: req.params.id}}
                })
                result ?
                    res.status(200).json(result) :
                    res.status(400).json({message: `User ID ${req.params.id} not found.`})
            }
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async createPosts(req, res) {
        try {
            let finalImageUrl = 'https://via.placeholder.com/100'
            if (req.file.filename){
                finalImageUrl = req.protocol+"://"+req.get('host')+"/uploads/"+req.file.filename;
            }
            const {caption, userid, status} = req.body
            const posts = await Posts.create({
                caption: caption,
                image: finalImageUrl,
                UserId: userid ? userid : 0,
                status: status ? status : 'false'
            })
            res.status(201).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async updatePosts(req, res) {
        try {
            const {caption, oldImage, status, UserId} = req.body
            let finalImageUrl = req.file? req.file.filename: ''
            if (finalImageUrl){
                fs.unlinkSync('./public/uploads/'+oldImage.split('/').slice(-1)[0])
                finalImageUrl = req.protocol+"://"+req.get('host')+"/uploads/"+req.file.filename;
            } else {
                finalImageUrl = oldImage
            }
            const posts = await Posts.update({
                    caption: caption,
                    image: finalImageUrl,
                    status: status,
                    UserId: UserId,
                },
                {
                    where: {id: req.params.id}
                })
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async deletePosts(req, res) {
        try {
            fs.unlinkSync('./public/uploads/'+req.body.oldImage.split('/').slice(-1)[0])
            const posts = await Posts.destroy({where: {id: req.params.id}})
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

module.exports = PostsController