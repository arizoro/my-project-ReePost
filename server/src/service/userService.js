import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from '../validation/usersValidation.js'
import { validate } from '../validation/validation.js'
import { prismaClient } from '../application/database.js'
import { RessponseError } from '../errors/error.js'
import bcrypt from 'bcrypt'
import { v4 as uuid} from 'uuid'


const register = async(request) => {
    const user = validate(registerUserValidation, request)
    const countUser = await prismaClient.user.count({
        where : {
            username : user.username
        }
    })

    if(countUser === 1){
        throw new RessponseError(400, "Username Already Exist !")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data : user,
        select : {
            username : true,
            email : true,
        }
    })
}

const login = async(request) => {
    const userLogin = validate(loginUserValidation, request)

    const user = await prismaClient.user.findUnique({
        where : {
            username : userLogin.username
        },
        select : {
            username : true,
            password : true
        }
    })

    if(!user){
        throw new RessponseError(404, "User is not found")
    }

    const passwordValid = await bcrypt.compare(userLogin.password, user.password)

    if(!passwordValid){
        throw new RessponseError(401, "Username or Password wrong")
    }

    const token = uuid().toString()

    return prismaClient.user.update({
        data : {
            token : token
        } ,
        where : {
            username : user.username
        },
        select : {
            token : true
        }
    })
}

const get = async(username) => {
    username = validate(getUserValidation, username)

    const user = await prismaClient.user.findUnique({
        where : {
            username : username
        },
        select : {
            username: true,
            email : true,
            profile : true
        }
    })

    if(!user){
        throw new RessponseError(404, "User is not found")
    }

    return user
}

const update = async(request) => {
    const user = validate(updateUserValidation, request)

    const userInDataBase = await prismaClient.user.count({
        where : {
            username : user.username
        }
    })

    if(!userInDataBase){
        throw new RessponseError(404, "User is not found")
    }

    const data =  {}

    if(user.username){
        data.username = user.username
    }
    if(user.email){
        data.email = user.email
    }
    if(user.password){
        user.password = await bcrypt.hash(user.password, 10)
        data.password = user.password
    }

    return prismaClient.user.update({
        where: {
            username  : user.username
        },
        data : data,
        select : {
            username : true,
            email: true,
        }
    })
}

const logout = async(username) => {
    username = validate(getUserValidation, username)

    const user = await prismaClient.user.findUnique({
        where: {
            username : username
        }
    })

    if(!user){
        throw new RessponseError(404, "User is not found")
    }

    return prismaClient.user.update({
        where : {
            username : user.username
        },
        data: {
            token : null
        },
        select :{
            username : true
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout
}