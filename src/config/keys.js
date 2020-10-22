if(process.env.NODE_ENV === "production") {
    module.exports = require("./keys_prod")
    console.log(module.exports)
} else {
    module.exports = require("./keys_dev")
}