var { expressjwt: jwt } = require("express-jwt");

//Authentification JWT Middleware
function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URI;
    return jwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

//Condition to revoke an Admin


module.exports = authJwt;