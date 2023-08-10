import express from "express";

const API_ROOT = '/api';

import { getReview, checkReview, createReview, updateReview, deleteReview, getReviews } from "../controllers/review-controller.js";

const router = express.Router();
router.get(`${API_ROOT}/ratings/search/:userId/:movieId`, checkReview);
router.get(`${API_ROOT}/ratings/:userId`, getReviews);
router.get(`${API_ROOT}/ratings/:userId/:movieId`, getReview);
router.post(`${API_ROOT}/ratings`, createReview);
router.put(`${API_ROOT}/ratings/:idRating`, updateReview);
router.delete(`${API_ROOT}/ratings/:idRating`, deleteReview);

export default router;
