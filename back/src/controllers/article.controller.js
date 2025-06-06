import { pool } from '../models/db.js';

export const getAllArticles = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles');
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.json(rows[0]);
  } catch (err) {
    return next(err);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const { titre, contenu } = req.body;
    const [result] = await pool.query(
      'INSERT INTO articles (titre, contenu) VALUES (?, ?)',
      [titre, contenu]
    );
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    return next(err);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
