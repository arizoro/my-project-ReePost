import { prismaClient } from "../application/database.js"
import { RessponseError } from "../errors/error.js"
import { createProfileValidation, getProfileValidation, updateProfileValidation } from "../validation/profileValidation.js"
import { validate } from "../validation/validation.js"

const create = async(user,request) => {
    const profile = validate(createProfileValidation, request)
    profile.username = user.username

    return prismaClient.profile.create({
        data : profile,
        select : {
            id : true,
            first_name : true,
            last_name : true,
            image : true
        }
    })
}

const get = async(user) => {
    const profile = await prismaClient.profile.findFirst({
        where : {
            username : user.username
        },
        select : {
            id : true,
            first_name: true,
            last_name: true,
            image : true,
        }
    })

    if(!profile){
        throw new RessponseError(404, "User profile is not found")
    }

    return profile
}

const getAllProfile = async() => {
    return prismaClient.profile.findMany({
        select : {
            id : true,
            first_name: true,
            last_name : true,
            image :true
        }
    })
}

const update = async(user,request) => {
    const profile = validate(updateProfileValidation, request)
    const profileInDb = await prismaClient.profile.count({
        where : {
            id : profile.id ,
            username : user.username
        }
    })

    if(profileInDb !== 1){
        throw new RessponseError(404, "User profile is not found")
    }

    return prismaClient.profile.update({
        where : {
            id : profile.id
        },
        data : {
            first_name : profile.first_name,
            last_name : profile.last_name,
            image : profile.image
        },
        select : {
            id : true,
            first_name : true,
            last_name: true,
            image : true
        }
    })
}

export default {
    create,
    get,
    update,
    getAllProfile
}