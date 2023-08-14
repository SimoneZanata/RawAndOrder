import Review from "../models/review.js";


export const checkReview = async (req, res) => {
    try {
        const review = await Review.findOne({
            where: {
                userId: req.params.userId,
                movieId: req.params.movieId,
            }
        });

        if (review) {
            res.send({ exists: true });
        } else {
            res.send({ exists: false });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


export const getReview = async (req, res) => {
    try {
        const rating = await Review.findOne({
            where: {
                userId: req.params.userId,
                movieId: req.params.movieId,
            }
        });
        
        if (rating) {
            res.send(rating);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getReviews = async (req, res) => {
    try {
      const ratings = await Review.findAll({
        where: {
          userId: req.params.userId,
        },
      });
      if (ratings) {
        res.send(ratings);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };


export const createReview = async (req, res) => {
    try {
        const rating = await Review.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Rating Created",
            data: rating
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const updateReview = async (req, res) => {
    try {
        const rating = await Review.update(req.body, {
            where: {
                idRating: req.params.idRating

            }
        });
        res.json({
            "message": "Rating Updated",
            data: rating
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const deleteReview = async (req, res) => {
    try {
        await Review.destroy({
            where: {
                idRating: req.params.idRating
            }
        });
        res.json({
            "message": "Rating Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
