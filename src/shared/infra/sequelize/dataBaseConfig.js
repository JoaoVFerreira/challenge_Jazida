require('dotenv').config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  timezone: process.env.TIMEZONE,
  dialect: process.env.DIALECT,
  define: {
    timestamp: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  },
  seederStorage: 'sequelize',
  logging: false,
};

module.exports = { development };