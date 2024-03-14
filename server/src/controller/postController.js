import { prismaClient } from "../application/database.js"
import postService from "../service/postService.js"
import fs from 'fs-extra'

const create = async(req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        request.image = req.file?.filename

        const result = await postService.create(user, request)
        console.log(result)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next) => {
    try {
    const postId = req.params.postId
    const result = await postService.get(postId)

    res.status(200).json({
        data: result
    })
    } catch (error) {
        next(error)
    }
    
}

const update = async(req, res, next)=> {
    try {
        const user = req.user
        const request = req.body
        request.id = req.params.postId
        if(request.image){
            request.image = req.file?.filename
        }

        const post = await prismaClient.post.findFirst({
            where : {
                id : parseInt(request.id)
            }
        })
        
        const old_image = post.image

        const result = await postService.update(user, request)

        if(result.image){
            fs.unlink(`assets/images/${old_image}`)
        }
        // result.image = `${url}${result.image}`
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const user = req.user
        const posId = req.params.postId

        const result = await postService.remove(user, posId)
        if(result.image){
            fs.unlink(`assets/images/${result.image}`)
        }
        res.status(200).json({
            data: 'ok'
        })
    } catch (error) {
        next(error)
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user
        const request = {
            id : req.query.id,
            title : req.query.title,
            content : req.query.content,
            page : req.query.page,
            size : req.query.size
        }

        const result = await postService.search(user, request)
        res.status(200).json({
            data: result.data,
            paging: result.pagging
        })
    } catch (error) {
        next(error)
    }
}

const getAllPost = async(req,res,next) => {
    try {
        const request = {
            page : req.query.page,
            size : req.query.size
            }

        const result = await postService.getAllPost(request)
        res.status(200).json({
            data : result.data,
            pagging : result.pagging
        })
    } catch (error) {
        next(error)
    }
}

const getAllPostUser = async(req, res, next)=> {
    try {
        const profileId = req.params.profileId
        const result = await postService.getAllPostUser(profileId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}


export default{
    create,
    get,
    update,
    remove,
    search,
    getAllPost,
    getAllPostUser
}