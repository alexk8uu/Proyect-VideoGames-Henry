const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4, //para que sequelize genere los ID automáticamente
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    released: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    platforms: { 
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false 
    }
  });
};
