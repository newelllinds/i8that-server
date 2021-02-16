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
        food_item: req.body.user.food_item,
        calories: req.body.user.calories,
        date_eaten: req.body.user.date_eaten,
        where_eaten: req.body.user.where_eaten,
        feelings: req.body.user.feelings,
        image: req.body.user.image,
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
    *** get log entries by user id ***
**************************************** */
router.get("/:id",(req, res) => {
    let id = req.params.id
    Dietlog.findAll({
        where: { id: id }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************************************
    *** get log entries by date ***
**************************************** */
router.get("/date", (req, res) => {
    let date = req.params.date
    Dietlog.findAll({
        where: { date: date }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************************************
            *** update log ***
**************************************** */
router.put("/:id", function (req, res) {
    const updateDietlogEntry = {
      food_item: req.body.user.food_item,
        calories: req.body.user.calories,
        date_eaten: req.body.user.date_eaten,
        where_eaten: req.body.user.where_eaten,
        feelings: req.body.user.feelings,
        image: req.body.user.image,
        owner: req.user.id
};

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Dietlog.update(updateDietlogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;