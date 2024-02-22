import express from 'express'
import { authUser } from '../middleware/authUser.js'
import userController from '../controller/userController.js'
import postController from '../controller/postController.js'
import commentController from '../controller/commentController.js'
import { upload } from '../middleware/mullter.js'
import profileController from '../controller/profileController.js'

const userApi = new express.Router()

userApi.use('/image', express.static('src/public/images'))
// middleware
userApi.use(authUser)


// user API
userApi.get('/api/users/current', userController.get)
userApi.patch('/api/users/current',upload.single('image') ,userController.update)
userApi.delete('/api/users/current', userController.logout)

// profile
userApi.post('/api/users/profile',upload.single('image'), profileController.create)
userApi.get('/api/users/profile', profileController.get)
userApi.get('/api/users/allProfile', profileController.getAllProfile)
userApi.patch('/api/users/profile/:profileId',upload.single('image'), profileController.update)

// Post Api
userApi.post('/api/posts',upload.single('image'), postController.create)
userApi.get('/api/posts/:postId', postController.get)
userApi.put('/api/posts/:postId',upload.single('image'), postController.update)
userApi.delete('/api/posts/:postId', postController.remove)
userApi.get('/api/posts', postController.search)
userApi.get('/api/allPost', postController.getAllPost)

// Comment Api
userApi.post('/api/posts/:postId/comments', commentController.create)
userApi.get('/api/posts/:postId/comments/:commentId', commentController.get)
userApi.get('/api/posts/:postId/comments', commentController.getAllComment)
userApi.patch('/api/posts/:postId/comments/:commentId', commentController.update)
userApi.delete('/api/posts/:postId/comments/:commentId', commentController.remove)

export {
    userApi
}
