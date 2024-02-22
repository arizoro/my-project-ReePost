import { prismaClient } from "../application/database.js"
import { RessponseError } from "../errors/error.js"
import { createPostValidation, getPostValidation, searchPostValidation, updatePostValidation } from "../validation/postValidation.js"
import { validate } from "../validation/validation.js"

export const profileUser = async(user) => {
    const profile = await prismaClient.profile.findFirst({
        where : {
            username : user.username
        }
    })

    if(!profile){
        throw new RessponseError(404, "User profile failed")
    }

    return profile
}

const create = async(user, request) => {
    const profileId = await profileUser(user)
    const post = validate(createPostValidation,request)
    post.profile_id = profileId.id

    return prismaClient.post.create({
        data : post,
        select : {
            id: true,
            title : true,
            content: true,
            image: true,
        }
    })
}



const get = async( postId) => {
    postId = validate(getPostValidation, postId)
    
    const post = await prismaClient.post.findFirst({
        where : {
            id : postId,
        },
        select : {
            id: true,
            title: true,
            content :true,
            image: true,
            profile : {
                select : {
                    first_name :true,
                    last_name :true,
                    image :true
                }
            }
        }
    })

    if(!post){
        throw new RessponseError(404, "Content is not found")
    }

    return post
}

const update = async(user, request) => {
    const profileId = await profileUser(user)
    const post = validate(updatePostValidation, request)

    const postInDB = await prismaClient.post.count({
        where : {
            profile_id : profileId.id,
            id : post.id
        }
    })

    if(postInDB !== 1){
        throw new RessponseError(404, "Content is not found")
    }

    return prismaClient.post.update({
        where : {
            id : post.id
        },
        data : {
            title : post.title,
            content : post.content,
            image : post.image
        },
        select : {
            id: true,
            title: true,
            content: true,
            image: true
        }
    })
}

const remove = async (user, postId) => {
    const profileId = await profileUser(user)
    postId = validate(getPostValidation, postId)

    const postInDB = await prismaClient.post.count({
        where : {
            profile_id : profileId.id,
            id : postId
        }
    })

    if(postInDB !== 1){
        throw new RessponseError(404, "Content is not found")
    }

    return prismaClient.post.delete({
        where : {
            id : postId
        }
    })
}

const search = async(user, request) => {
    const profileId = await profileUser(user)
    request = validate(searchPostValidation , request)

    const skip = (request.page - 1) * request.size
    const filters = []

    filters.push({
        profile_id : profileId.id
    })

    if(request.id){
        filters.push({
            OR : [{
                id : request.id
            }]
        })
    }

    if(request.title){
        filters.push({
            title : {
                contains : request.title
            }
        })
    }

    if(request.content){
        filters.push({
            content : {
                contains : request.content
            }
        })
    }

    const filterPost = await prismaClient.post.findMany({
        where : {
            AND : filters
        },
        take : request.size,
        skip : skip
    })

    const totalItems = await prismaClient.post.count({
        where : {
            AND : filters
        }
    })

    return {
        data : filterPost,
        pagging : {
            page : request.page,
            total_items : totalItems,
            total_page : Math.ceil(totalItems / request.size)
        }
    }

}

const getAllPost = async (request) => {
    request = validate(searchPostValidation , request)
    const skip = (request.page - 1) * request.size
    const filters = []


    if(request.id){
        filters.push({
            OR : [{
                id : request.id
            }]
        })
    }

    if(request.title){
        filters.push({
            title : {
                contains : request.title
            }
        })
    }

    if(request.content){
        filters.push({
            content : {
                contains : request.content
            }
        })
    }

    const filterPost = await prismaClient.post.findMany({
        where : {
            AND : filters
        },
        take : request.size ,
        skip : parseInt(skip)
        })

    const totalItems = await prismaClient.post.count({
        where : {
            AND : filters
        }
    })

    return {
        data : filterPost,
        pagging : {
            page : request.page,
            total_items : totalItems,
            total_page : Math.ceil(totalItems / request.size)
        }
    }
}


// const getAllPost = async() => {
//     const allPost = await prismaClient.post.findMany({
//         select : {
//             title :true,
//             content :true,
//             image: true,
//         }
//     })
//     return allPost
// }

export default{
    create,
    get,
    update,
    remove,
    search,
    getAllPost
}