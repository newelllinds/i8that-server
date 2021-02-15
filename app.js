let express = require('express');
let app = express();
let sequelize = require('./db');

let dietlog = require('./controllers/dietlogcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', user);
app.use('/dietlog', dietlog)

app.listen(3000, function(){
    console.log("App is listening on port 3000")
})