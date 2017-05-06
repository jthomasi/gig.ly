module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    location: {
      type : DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    }, 

    event_date: {
      type: DataTypes.DATE, 
      allowNull: false
    }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      classMethods: {
        associate: function(models) {
          Event.belongsTo(models.Admin, {
            foreignKey: {
              allowNull: false
            }
          }),
          Event.hasMany(models.Job, {
            onDelete: "cascade"
          });

        }
      }
  });
  return Event;
};