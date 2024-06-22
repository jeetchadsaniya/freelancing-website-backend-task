const {connect} = require("mongoose");

const connectDb  = async () => {
    try {
        await connect(process.env.DB_URL);
        console.log("DB connect successfully");
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

module.exports = Object.freeze({
    connectDb
})