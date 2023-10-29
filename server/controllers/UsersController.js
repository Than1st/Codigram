const {Users} = require('../models')
const {genSalt, hashSync, compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");
const fs = require("fs");
class UsersController {
    static async getUsers(req, res, next) {
        try {
            const result = await Users.findAll({order: ['id']})
            res.status(200).json(result)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async detailUsers(req, res, next) {
        try {
            const result = await Users.findByPk(req.params.id)
            result ?
                res.status(200).json([result]) :
                res.status(400).json({message: `Users ID ${req.params.id} not found.`})
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async registerUsers(req, res, next) {
        try {
            const {username, email, password, image, role} = req.body
            const salt = await genSalt(10);
            const passHash = hashSync(password, salt);
            if (username && email && password) {
                const dataUsername = await Users.findOne({where: {username: username}})
                const dataEmail = await Users.findOne({where: {email: email}})
                if (dataUsername) {
                    res.status(400).json({message: "Username not available"})
                } else if (dataEmail) {
                    res.status(400).json({message: "Email already use"})
                } else {
                    const result = await Users.create({
                        username: username,
                        email: email,
                        password: passHash,
                        image: image ? image : "https://via.placeholder.com/100",
                        role: role ? role : "Member"
                    })
                    res.status(200).json(result)
                }
            } else {
                res.status(400).json({message: "Fill all forms please"})
            }
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async loginUsers(req, res, next) {
        try {
            const {username, password} = req.body
            const data = await Users.findOne({where: {username: username}})
            if (data) {
                const token = sign({data}, process.env.SECRET_KEY)
                await compareSync(password, data.password) ?
                    res.status(200).json({data: data, token: token}) :
                    res.status(400).json({message: 'Incorrect Password.'})
            } else {
                res.status(400).json({message: 'Username not found.'})
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async updateUsers(req, res, next) {
        try {
            const {username, email, oldImage} = req.body
            let finalImageUrl = req.file? req.file.filename: ''
            if(oldImage === "https://via.placeholder.com/100" && finalImageUrl){
                finalImageUrl = req.protocol+"://"+req.get('host')+"/uploads/"+req.file.filename;
            } else if (finalImageUrl){
                fs.unlinkSync('./public/uploads/'+oldImage.split('/').slice(-1)[0])
                finalImageUrl = req.protocol+"://"+req.get('host')+"/uploads/"+req.file.filename;
            } else {
                finalImageUrl = oldImage
            }

            const result = await Users.update({
                username: username? username: '',
                email: email? email: '',
                image: finalImageUrl
            }, {
                where: {id: req.params.id},
                returning: true
            })
            result[0] === 1 ?
                res.status(200).json(result[1]) :
                res.status(400).json({message: `Users ID ${req.params.id} has not been updated`})
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async deleteUsers(req, res, next) {
        try {
            const result = await Users.destroy({where: {id: req.params.id}})
            result === 1 ?
                res.status(200).json({message: `Users ID ${req.params.id} has been deleted.`}) :
                res.status(400).json({message: `Users ID ${req.params.id} has not been deleted.`})
        } catch (e) {
            res.status(400).json(e)
        }
    }
}

module.exports = UsersController