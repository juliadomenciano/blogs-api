module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  // User.associate = (models) => {
  //   User.hasOne(models.blogPost,
  //     { foreignKey: 'userId', as: 'blogPosts' });
  // };

  return Category;
};