const { auth } = require('express-oauth2-jwt-bearer');

require("dotenv").config();

const { expressjwt: jwt} = require('express-jwt')
const jwksRsa = require('jwks-rsa')

exports.jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${'https://dev-7wmznkm41wx0ichb.us.auth0.com/'}.well-known/jwks.json`
  }),

  audience: 'uk0msY5QXRml3wLU90f10nsZ8jUw3KSk',
  issuer: 'https://dev-7wmznkm41wx0ichb.us.auth0.com/',
  algorithms: ['RS256']
})

/*exports.jwtCheck = auth({
  audience: 'uk0msY5QXRml3wLU90f10nsZ8jUw3KSk',
  issuerBaseURL: 'https://dev-7wmznkm41wx0ichb.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});*/

