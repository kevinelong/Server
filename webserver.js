// CREATE A WEB SERVER!!!
const fs = require('fs'); //FILE SYSTEM
const http = require('node:http'); //FREE CODE!!! THe http protocol for node.

const hostname = '127.0.0.1'; // AKA localhost or home or loopback (talk to ourselves)
const port = 3000; // like a specific telphone ext e.g. 123, 80/443 5000 8000

function read(filePath){
    return fs.readFileSync(filePath, "utf8"); //FILE TO STRING    
}

const server = http.createServer((req, res) => {
    res.statusCode = 200; // say all is OK
    //IF ELSE IF ELSE - ROUTING
    if (req.url.includes("json") && req.method === "GET") {
        res.setHeader('Content-Type', 'text/json'); //how to parse, what kind of text
        const data = [{ name: "apple" }, { name: "banana" }];
        const jsonText = JSON.stringify(data);
        res.end(jsonText); //end by sending the response CONTENT 
    } else if (req.url === "/" || req.url.includes("html") && req.method === "GET") {
        res.setHeader('Content-Type', 'text/html'); //how to parse, what kind of text
        res.end(read("./static/index.html")); //end by sending the response CONTENT  
    } else if (req.url.includes("login")) { //POST is cool
        res.setHeader('Content-Type', 'text/plain'); //how to parse, what kind of text
        let body = '';
        req.on('data', chunk => body += chunk.toString()); // convert Buffer to string
        req.on('end', () => res.end(body));
    } else {
        res.statusCode = 404; // NOT FOUND
        res.setHeader('Content-Type', 'text/plain'); //how to parse, what kind of text
        //end by sending the response CONTENT  
        res.end(`404 - File Not Found! \nMETHOD: ${req.method}\nURL: ${req.url}`); 
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});