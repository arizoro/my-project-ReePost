import commentService from "../service/commentService.js"
const url = 'http://localhost:3000/image/'

const create = async (req, res, next) => {
    try {
        const user = req.user
        const postId= req.params.postId
        const request = req.body

        const result = await commentService.create(user, postId, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next) => {
    try {
        const user = req.user
        const postId = req.params.postId
        const commentId = req.params.commentId

        const result = await commentService.get(user, postId, commentId)
        result.profile.image = `${url}${result.profile.image}`
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAllComment = async(req,res,next) => {
    try {
        const user = req.user
        const postId = req.params.postId
        const result = await commentService.getAllComment(user,postId)
        res.status(200).json({
            data: result
        })
        
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const user = req.user
        const postId = req.params.postId
        const request = req.body
        request.id =  req.params.commentId

        const result = await commentService.update(user, postId, request)
        result.name = `${user.first_name} ${user.last_name}`

        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const user = req.user
        const postId = req.params.postId
        const commentId = req.params.commentId
        
        await commentService.remove(user, postId, commentId)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get,
    update,
    remove,
    getAllComment
}