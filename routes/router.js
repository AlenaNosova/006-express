const express = require('express');
const router = express.Router();

router.get('/api/books/:id/download', (req, res) => {
    const {url} = req;
    res.json({url});
})

module.exports = router;