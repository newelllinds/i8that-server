const Sequelize = require('sequelize');

// const sequelize = new Sequelize('i8that-database', 'postgres', 'password', {
//     host: 'localhost',
//     dialect: 'postgres'
// });
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})

sequelize.authenticate().then(
    function() {
        console.log('Connected to i8that postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;