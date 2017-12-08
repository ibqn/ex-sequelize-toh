import Sequelize from 'sequelize'
import path from 'path'
//import config from './config.json'


const sequelize = new Sequelize('heroes', null, null, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false,
  logging: console.log,

  storage: path.join(__dirname, 'heroes.sqlite')

})


const initDb = async () => {
  try {
    await sequelize.authenticate()
  } catch(error){
    console.log(`connection error:''${error}`)
    exit(1)
  } finally {
    console.log('successfully connected to the database')
  }
}

initDb()

export default sequelize
