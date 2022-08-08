const dotenv = require("dotenv");

const nodeEnv = process.env.NODE_ENV || process.env.ENVIRONMENT || "local";

console.log(`Using ${nodeEnv} environment.`);

dotenv.config({
    path: `.${nodeEnv}.env`,
});

module.exports = {
    app: {
        port: process.env.PORT,
    }
};