module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/maskstore",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "bxatmrGXcg9Yb4FZIdGPsNRMI",
    "consumerSecret": "1gSJdzARFTHi36i8VIEdjF3xsTnkeqkksi9lT1MdOfAXjUoEsR",
    "callbackUrl": "http://localhost:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "INSERT_FACEBOOK_CLIENTID_HERE",
    "clientSecret": "INSERT_FACEBOOK_CLIENT_SECRET_HERE",
    "callbackURL": "INSERT_FACEBOOK_CALLBACK_HERE"
  },
  "GOOGLE": {
    "clientID": "217081254908-igjmvd9saer4ljjcmiik1igsgdqb42eu.apps.googleusercontent.com",
    "clientSecret": "Ru8wXOHLQythVpidbJoPZVsu",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};
