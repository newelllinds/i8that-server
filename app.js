require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let dietlog = require('./controllers/dietlogcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
app.use(express.json())
app.use(require('./middleware/headers'));
app.use('/user', user);
app.use('/dietlog', dietlog)


app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}`)
})