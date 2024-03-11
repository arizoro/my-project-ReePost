import { getPostValidation } from '../validation/postValidation.js'
import { validate } from '../validation/validation.js'
import { prismaClient } from '../application/database.js'
import { RessponseError } from '../errors/error.js'
import { createCommentValidation, getCommentValidation, updateCommentValidation } from '../validation/commentValidation.js'
import { profileUser } from './postService.js'

const mustBeExisst = async(postId) => {
    postId = validate(getPostValidation, postId)

    const postInDb = await prismaClient.post.count({
        where : {
            id : postId,
        }
    })

    if(postInDb !== 1 ){
        throw new RessponseError(404, "Post is not found")
    }

    return postId
}

const create = async (user, postId, request) => {
    const profile = await profileUser(user)
    postId = await mustBeExisst(postId)

    const comment = validate(createCommentValidation, request)
    comment.post_id = postId
    comment.profile_id = profile.id

    const result = await prismaClient.comment.create({
        data : comment,
        select : {
            id : true,
            body : true
        }
    })
    
    return result
}

const get = async(user, postId, commentId) => {
    postId = await mustBeExisst(postId)
    commentId = validate(getCommentValidation, commentId)

    const commentInDb = await prismaClient.comment.findFirst({
        where : {
            id : commentId,
            post_id : postId
        },
        select : {
            id: true,
            body: true,
            profile : {
                select : {
                    first_name :true,
                    last_name :true,
                    image : true
                }
            }
        }
    })

    if(!commentInDb){
        throw new RessponseError(404, "Comment is not found")
    }

    return commentInDb
}

const getAllComment = async(postId) => {
    postId = await mustBeExisst(postId)

    const allComment = await prismaClient.comment.findMany({
        where : {
            post_id : postId
        }
    })

    return allComment
}

const update = async(user, postId, request) => {
    const profile = await profileUser(user)
    postId = await mustBeExisst( postId)

    const comment = validate(updateCommentValidation, request)
    const commentInDb = await prismaClient.comment.count({
        where : {
            profile_id : profile.id,
            post_id : postId,
            id : comment.id
        }
    })

    if(commentInDb !== 1 ){
        throw new RessponseError(404, "Comment is not found")
    }

    return prismaClient.comment.update({
        where : {
            id : comment.id
        },
        data : {
            body : comment.body
        },
        select : {
            id: true,
            body: true
        }
    })
}

const remove = async(user, postId, commentId) => {
    const profile = await profileUser(user)
    postId = await mustBeExisst(postId)
    commentId = validate(getCommentValidation, commentId)
    const commentInDb = await prismaClient.comment.count({
        where : {
            profile_id : profile.id,
            post_id : postId,
            id : commentId
        }
    })

    if(commentInDb !== 1){
        throw new RessponseError(404, "Comment is not found")
    }
    return prismaClient.comment.delete({
        where : {
            id : commentId
        }
    })
}

export default {
    create,
    get,
    update,
    remove,
    getAllComment
}