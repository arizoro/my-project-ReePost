import { prismaClient } from "../application/database.js"

export const authUser = async(req, res, next) => {
    const token = req.get('Authorization')
    if(!token){
        res.status(401).json({
            errors : "Unautorize"
        }).end()
    }else{
        const user = await prismaClient.user.findFirst({
            where : {
                token : token
            }
        })
        if(!user){
            res.status(401).json({
                errors : "Unautorize"
            }).end()
        }else{
            req.user = user
            next()
        }
    }

}