import Joi from "joi";

const createPostValidation = Joi.object({
    title : Joi.string().max(255).required(),
    content : Joi.string().required(),
    image : Joi.string().max(255).optional(),
})

const getPostValidation = Joi.number().positive().required()

const updatePostValidation =  Joi.object({
    id : Joi.number().positive().required(),
    title : Joi.string().max(255).optional(),
    content : Joi.string().optional(),
    image : Joi.string().max(255).optional(),
})

const searchPostValidation = Joi.object({
    page :Joi.number().positive().min(1).default(1) ,
    size :Joi.number().positive().max(100).min(1).default(10),
    id : Joi.number().positive().optional(),
    title : Joi.string().max(255).optional(),
    content : Joi.string().optional(),
})

export {
    createPostValidation,
    getPostValidation,
    updatePostValidation,
    searchPostValidation
}