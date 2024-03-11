import userService from "../service/userService.js"

const register = async(req, res, next) => {
    try {
        const request = req.body
        const result = await userService.register(request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const login = async(req, res, next) => {
    try {
        const request = req.body

        const result = await userService.login(request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next)=> {
    try {
        const username = req.user.username
        const result = await userService.get(username)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const request = req.body
        request.username = req.user.username

        const result = await userService.update(request)

        res.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const username = req.user.username
        await userService.logout(username)
        res.status(200).json({
            data : "OK"
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}