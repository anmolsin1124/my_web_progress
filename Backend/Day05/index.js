const http = require('http');
const server = http.createServer((req, res) => {
    res.end("Hello Everyone My Name Is Anmol ISngh And Waht is Your Name")
});
server.listen(40000, () => {
    console.log("I am Listern The Your Data  400000 port ")
});

