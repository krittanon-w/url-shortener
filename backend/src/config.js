module.exports = {
    server: {
        port: 3000
    },
    mongodb: {
        url: "mongodb://localhost:27017",
        database: "url-shortener",
        options: { 
            useNewUrlParser: true 
        }
    }
}