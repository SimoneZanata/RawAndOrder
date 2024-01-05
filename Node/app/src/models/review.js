import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Review = db.define('reviews', {
  idRating: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  movieId: {
    type: DataTypes.INTEGER
  },
  ratingStars: {
    type: DataTypes.INTEGER
  },
  textComment: {
    type: DataTypes.STRING
  },
  movieTitle: {
    type: DataTypes.STRING
  },
  movieImg: {
    type: DataTypes.STRING
  },
  movieBackground: {
    type: DataTypes.STRING
  },
  movieDescription: {
    type: DataTypes.STRING
  },
  movieLanguage: {
    type: DataTypes.STRING
  },
  movieReleaseDate: {
    type: DataTypes.STRING
  },
  movieVoteAverage: {
    type: DataTypes.INTEGER
  },
  timestamp: {
    type: DataTypes.DATE, 
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }

}, {
  freezeTableName: true,
  timestamps: true
});
 
export default Review;