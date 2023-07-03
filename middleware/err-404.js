module.exports = (req, res) => {
    res.status(404);
    res.json({error: '404 | Стараница не найдена'});
}