let config = {
    dev:{
        server: {
            port: 4000,
            host: "0.0.0.0"
        },
        mongodb: {
            url: "mongodb://localhost:27017",
            database: "url-shortener",
            options: { 
                useNewUrlParser: true 
            }
        },
    },
    prod:{
        server: {
            port: 4000,
            host: "0.0.0.0"
        },
        mongodb: {
            url: "mongodb://database:27017",
            database: "url-shortener",
            options: { 
                useNewUrlParser: true 
            }
        }
    }
}

module.exports = (() => {
    return config[process.env.NODE_ENV]
})();