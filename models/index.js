const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '12345',
    database: 'rick_and_morty_db',
});

const Character = sequelize.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    species: DataTypes.STRING,
    gender: DataTypes.STRING,
    origin: DataTypes.JSON, // Cambiado a DataTypes.JSON
}, {
    timestamps: false,
});

sequelize.sync();

module.exports = {
    sequelize,
    Character,
};