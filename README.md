# Online bookmarking

Trying to fill the void of a certain page that has gone bad...

## Configuration

After you clone the repository and cd into the folder, you have to follow these steps:

    mkdir online-bookmark-config
    cd online-bookmark-config
    touch mongo.json
    touch jwt.json
    touch email.json

The above files configure how the application should run.

### mongo.json

    {
        "password": "<your mongoDB password>",
        "user": "<your mongoDB username>",
        "ip": "<the IP where you run the BE server>",
        "port": <the port to the server>
    }

### jwt.json

Please, check out the [introduction page](https://jwt.io/introduction) of JSON Web Tokens.

    {
        "privateKey": "<your json web token>",
        "tokenExpiry": "15m",
        "expiryThreshold": 300
    }

### email.json

You have to setup an email account so that the server can send sign-up emails to the user.
(Currently, the provider is set for Gmail, but you can change that in the _backend/online-bookmark/api/helpers/email-server.js_ file.)

    {
        "username": "<username at your email provider>",
        "password": "<password at your email provider>",
        "accountName": "<display name for the emails>",
        "verifyEmailUrl": "verifyEmail",
        "resendEmailUrl": "resendVerificationEmail"
    }

## How to start

    npm install
    npm start

[BrowserSync](https://www.browsersync.io/) will do the rest ;)
But if you close the tab by mistake, you can reach the app on [localhost:4000](http://localhost:4000)
