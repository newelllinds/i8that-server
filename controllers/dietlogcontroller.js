let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');
const Dietlog = require('../db').import('../models/dietlog');


router.get('/practice', function(req,res)
{
    res.send('Hey! This is a practice route!')
})



/* ***************************************
    *** DIET LOG CREATE ***
**************************************** */
router.post('/create', validateSession, (req, res) => {
    const dietlogEntry = {
        food_item: req.body.dietlog.food_item,
        calories: req.body.dietlog.calories,
        date_eaten: req.body.dietlog.date_eaten,
        where_eaten: req.body.dietlog.where_eaten,
        feelings: req.body.dietlog.feelings,
        image: req.body.dietlog.image,
        owner: req.user.id
}
    Dietlog.create(dietlogEntry)
    .then(dietlog => res.status(200).json(dietlog))
    .catch(err => res.status(500).json({ error: err }))
})

/* ***************************************
    *** DIET LOG DELETE ***
**************************************** */
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id } };

    Dietlog.destroy(query)
        .then(() => res.status(200).json({ message: "Diet Log Entry Deleted" }))
        .catch((err) => res.status(500).json({ error: err }));
})


/* ***************************************
    *** get all logs for individual user ***
**************************************** */
router.get("/mylogs", validateSession, (req, res) => {
    let id = req.user.id
    Dietlog.findAll({
        where: { owner: id }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************************************
    *** get log entries by date ***
**************************************** */
router.get("/:date_eaten/:id", validateSession, (req, res) => {
    let date = req.params.date_eaten;
    let id = req.user.id
    Dietlog.findAll({
        where: { date_eaten: date, owner: id }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************************************
            *** update log ***
**************************************** */
router.put("/update/:id", validateSession, function (req, res) {
    const updateDietlogEntry = {
      food_item: req.body.dietlog.food_item,
        calories: req.body.dietlog.calories,
        date_eaten: req.body.dietlog.date_eaten,
        where_eaten: req.body.dietlog.where_eaten,
        feelings: req.body.dietlog.feelings,
        image: req.body.dietlog.image,
};

    const query = { where: { id: req.params.id, owner: req.user.id } };

    Dietlog.update(updateDietlogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;