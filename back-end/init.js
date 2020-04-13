import app from "./app"

const PORT = 8000;

const http_app = require('http').createServer(app)
const handleListening = () => {
    console.log(`✅  Listening on : https://localhost:${PORT} ✌`);
}

http_app.listen(PORT, handleListening);





