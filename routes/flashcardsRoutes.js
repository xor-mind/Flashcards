const express = require('express');
const router = express.Router();
const db = require('../db'); // Update the path as necessary to your db module


router.get('/', async (req, res) => {
    try {
        const categoryId = req.query.category_id;
        let flashcards = [];

        if (categoryId && !isNaN(categoryId)) {
            const categoryIds = await getAllDescendantIds(categoryId, db);
            const placeholders = categoryIds.map(() => '?').join(',');
            const sql = `SELECT * FROM flashcards WHERE category_id IN (${placeholders})`;
            const [rows] = await db.query(sql, categoryIds);
            flashcards = rows;
        } else {
            const [rows] = await db.query("SELECT * FROM flashcards");
            flashcards = rows;
        }

        res.json(flashcards);
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        res.status(500).send('Server error');
    }
});

async function getAllDescendantIds(categoryId, db) {
    let descendantIds = [];
    let queue = [categoryId];

    while (queue.length > 0) {
        const currentId = queue.shift();
        descendantIds.push(currentId);

        const [rows] = await db.query("SELECT id FROM categories WHERE parent_id = ?", [currentId]);
        rows.forEach(row => queue.push(row.id));
    }

    return descendantIds;
}

module.exports = router;
