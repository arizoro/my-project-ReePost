import Joi from "joi";


const createProfileValidation = Joi.object({
    first_name : Joi.string().max(100).required(),
    last_name : Joi.string().max(100).optional(),
    image : Joi.string().max(255).optional()
})

const getProfileValidation = Joi.number().positive().required()


const updateProfileValidation = Joi.object({
    id : Joi.number().positive().required(),
    first_name : Joi.string().max(100).required(),
    last_name : Joi.string().max(100).optional(),
    image : Joi.string().max(255).optional()
})


export {
    createProfileValidation,
    getProfileValidation,
    updateProfileValidation
}