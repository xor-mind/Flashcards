const express = require('express');

// create a router for this file (app.js will mount it)
const router = express.Router();
const db = require('../db'); // Update the path as necessary to your db module

router.get('/', async (req, res) => 
{
    try {
        const sql = "SELECT id, name, parent_id FROM categories ORDER BY parent_id ASC, name ASC";
        const [rows] = await db.query(sql);

        const categories = {};
        rows.forEach(row => {
            if (row.parent_id === null) {
                // If the category is a root category
                row.children = [];
                categories[row.id] = row;
            } else {
                // If the category is a child, add it to the parent's children array
                if (categories[row.parent_id]) {
                    categories[row.parent_id].children.push(row);
                }
            }
        });

        // Convert the categories object to an array to ensure a numerical array for JSON, as in PHP
        res.json(Object.values(categories));
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
