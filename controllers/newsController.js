import News from "../models/News.js";

export const getAll = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 }); 

    if (!newsList || newsList.length === 0) {
      return res.status(404).json({
        message: 'Список постов пуст',
      });
    }

    res.status(200).json(newsList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось получить список постов',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Некорректный ID поста',
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        message: 'Пост не найден',
      });
    }

    res.status(200).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось получить пост',
    });
  }
};

export const create = async (req,res) =>{
  try{
      const doc = new News({
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
      });

      const post = await doc.save();
      res.json(post);

  }catch(err){
      console.log(err);
      res.status(500).json({message: err.message})
  }
}
