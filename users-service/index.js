
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');


//Middleware
app.use(express.json());
app.use(authJwt());
app.use(errorHandler);

//Routers
const usersRoutes = require("./routes/users");

const api = process.env.API_URI;

app.use(`${api}/users`, usersRoutes);


//MongoDB Database Connection 
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'banking-db'
})
    .then(() => {
        console.log('Database Connection is Ready...')
    })
    .catch((err) => {
        console.log(err)
    })


//Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(api);
    console.log(`User Service en cours d'exécution sur le port ${PORT}`);
});
