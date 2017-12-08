import Sequelize from 'sequelize'
import db from '../db'


export const Hero = db.define('hero', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    //defaultValue: null,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
},
{
  timestamps: true,
  underscored: true,
  paranoid: true,
  freezeTableName: true,
  tableName: 'hero'
})

const syncHero = async () => {
  try {
    await Hero.sync()
    let all = await Hero.findAll({ attributes: ['id', 'name'] })
    //console.log(all)
  } catch(error) {
    console.log(`failed to create hero table: '${error}`)
    exit(2)
  }
  finally {
    console.log('table is in sync')
  }
}

syncHero()

