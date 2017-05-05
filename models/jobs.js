module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    // Giving the Author model a name of type STRING
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    start: {
      // type? int or timestamp or date 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    end: {
      // type? int or timestamp or date 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    taken: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          Job.belongsTo(models.Event, {
            foreignKey: {
              allowNull: false
            }
          }), 
          Job.belongsTo(models.Worker, {
            onDelete: "cascade"
          });;
        }
      }
    }
  );
  return Job;
};