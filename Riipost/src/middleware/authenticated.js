import atom from 'atom'
import { authUser } from '../api/api'

export const authenticated = atom({
    key : 'authenticated',
    default : {
        check : false,
        user : authUser(url,data)
    }
})