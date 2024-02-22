import Joi from 'joi'


const createCommentValidation = Joi.object({
    body : Joi.string().required()
})

const getCommentValidation = Joi.number().positive().required()

const updateCommentValidation = Joi.object({
    id : Joi.number().positive().required(),
    body : Joi.string().optional()
})


export {
    createCommentValidation,
    getCommentValidation,
    updateCommentValidation
}