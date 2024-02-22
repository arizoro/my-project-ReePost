class RessponseError extends Error {
    constructor(status, massage){
        super(massage),
        this.status = status
    }
}

export {
    RessponseError
}