import { Router } from 'express'
import heroes from './heroes'


const api = Router()

api.use('/hero', heroes)

export default api
