const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const book = db.define('books', {
    autor: {
        type:DataTypes.STRING,
        allowNull: false,
        require: true
    },
    titulo: {
        type:DataTypes.STRING,
        allowNull: false,
        require: true
    },
    capaDura: {
        type:DataTypes.BOOLEAN,
    },
    preco:{
        type:DataTypes.FLOAT,
        allowNull: false,
        require: true
    }
});

module.exports = book