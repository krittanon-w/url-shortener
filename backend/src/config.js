module.exports = {
    server: {
        port: 4000
    },
    mongodb: {
        url: "mongodb://localhost:27017",
        database: "url-shortener",
        options: { 
            useNewUrlParser: true 
        }
    }
}