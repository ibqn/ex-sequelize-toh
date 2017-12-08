import { Router } from 'express'
import { Hero } from '../models/hero'


const heroes = Router()

// define the mongobd ObjectId filter once for all routes
const objectIdFilter = "[0-9,a-f,-]*"

// GET all heroes
heroes.get('/', async (req, res) => {
  try {
    const heroesList = await Hero.findAll({ attributes: ['id', 'name'] })
    //console.log(`heroes '${heroesList}'`)
    res.json({
      status: 'success',
      result: heroesList
    })
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

heroes.get('/search/:term', async (req, res) => {
  try {
    const searchList = await Hero.find({
      name: new RegExp(req.params.term, 'i')
    })
    res.json({
      status: 'success',
      result: searchList
    })
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// GET: get one hero by its ID
heroes.get(`/:heroId(${objectIdFilter})`, async (req, res) => {
  const hero = await Hero.findOne({
    where: { id: req.params.heroId },
    attributes: ['id', 'name']
  })
  res.json({
    status: 'success',
    result: hero
  })
})

// POST: add new hero
heroes.post('/', async (req, res) => {
  try {
    const hero = await Hero.create(req.body)
    res.status(201).json({
      status: 'success',
      result: hero
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// PUT: update an existing hero by ID
heroes.put(`/:heroId(${objectIdFilter})`, async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate({ _id: req.params.heroId }, req.body, { new: true })
    res.json({
      status: 'success',
      result: hero
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// DELETE: remove an existing hero by ID
heroes.delete(`/:heroId(${objectIdFilter})`, async (req, res) => {
  try {
    const hero = await Hero.findOneAndRemove({ _id: req.params.heroId })
    if (hero === null) throw new Error('Item does not exist')
    res.status(204).json()
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

export default heroes
