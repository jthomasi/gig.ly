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
    cell_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [10, 13]
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      len: [1, 20]
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Admin.hasMany(models.Event, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Admin;
};
