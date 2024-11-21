import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    idNews: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

const News = mongoose.model('News', newsSchema);
export default News;
