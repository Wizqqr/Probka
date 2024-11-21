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
    const idNews = parseInt(req.params.id, 10);

    if (isNaN(idNews)) {
      return res.status(400).json({
        message: 'Некорректный ID новости',
      });
    }

    const news = await News.findOne({ idNews });

    if (!news) {
      return res.status(404).json({
        message: 'Новость не найдена',
      });
    }

    res.status(200).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось получить новость',
    });
  }
};


export const create = async (req, res) => {
  try {
    // Найти последний созданный документ
    const lastNews = await News.findOne().sort({ idNews: -1 });

    // Если записей нет, начинать с 1
    const idNews = lastNews && lastNews.idNews ? lastNews.idNews + 1 : 1;

    // Создать новый документ
    const doc = new News({
      idNews, // Установить idNews
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
    });

    // Сохранить документ
    const post = await doc.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось создать новость' });
  }
};

