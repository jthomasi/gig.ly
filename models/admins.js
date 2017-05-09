module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define("Admin", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 100]
    },

    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [10, 15]
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      len: [1, 20]
    }
  },
    {
      // We're saying that we want our Admins to have Events
      classMethods: {
        associate: function(models) {
          Admin.hasMany(models.Event, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Admin;
};
