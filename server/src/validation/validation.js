import { RessponseError } from "../errors/error.js"

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })

    if(result.error){
        throw new RessponseError(400, result.error.massage)
    }else{
        return result.value
    }
}

export {
    validate
}