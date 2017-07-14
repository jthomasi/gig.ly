module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    start: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },    
    location: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    }, 


// title (string)
// start (string)
// duration (string)
// location (string)
// details (text)


// gigDescription concatenatios duration, location and details


    details: {
      type : DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    gigTaken: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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