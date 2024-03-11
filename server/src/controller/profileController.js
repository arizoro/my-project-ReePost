import { prismaClient } from "../application/database.js"
import profileService from "../service/profileService.js"
import fs from 'fs-extra'

const url = 'http://localhost:3000/image/'

const create = async(req,res,next) => {
    try {
        const request = req.body
        const user = req.user
        request.image = req.file?.filename
        const result = await profileService.create(user,request)
        result.image = `${url}${result.image}`

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
        const result = await profileService.get(user)
        result.image = `${url}${result.image}`
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const getAllProfile = async(req, res, next) => {
    try {
        const result = await profileService.getAllProfile()
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async(req,res,next) => {
    try {
        const user = req.user
        const request = req.body
        request.id = req.params.profileId
        request.image = req.file?.filename

        const profile = await prismaClient.profile.findFirst({
            where : {
                id : parseInt(request.id)
            }
        })

        const old_image = profile.image
        console.log(old_image)

        const result = await profileService.update(user, request)
        
        if(result.image){
            fs.unlink(`assets/images/${old_image}`)
            result.image = `${url}${result.image}`
        }

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get,
    update,
    getAllProfile
}