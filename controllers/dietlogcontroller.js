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
        foodItem: req.body.user.foodItem,
        calories: req.body.user.calories,
        dateEaten: req.body.user.dateEaten,
        whereEaten: req.body.user.whereEaten,
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

module.exports = router;