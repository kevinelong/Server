// CREATE A WEB SERVER!!!

const http = require('node:http'); //FREE CODE!!! THe http protocol for node.

const hostname = '127.0.0.1'; // AKA localhost or home or loopback (talk to ourselves)
const port = 3000; // like a specific telphone ext e.g. 123, 80/443 5000 8000

const server = http.createServer((req, res) => {
    res.statusCode = 200; // say all is OK

    if (req.url.includes("json") && req.method === "GET") {
        res.setHeader('Content-Type', 'text/json'); //how to parse, what kind of text

        const data = [{ name: "apple" }, { name: "banana" }];
        const jsonText = JSON.stringify(data);

        res.end(jsonText); //end by sending the response CONTENT 
    } else if (req.url.includes("html") && req.method === "GET") {
        res.setHeader('Content-Type', 'text/html'); //how to parse, what kind of text
        res.end(`
            <h1>Home Page</h1>
            Welcome to our first web SERVER
            <form method="POST" action="/login/">
                <input type="text"     name="username" placeholder="User Name">    
                <input type="password" name="password" placeholder="Password">
                <input type="submit"   value="LOGIN"> 
            </form>   
        `); //end by sending the response CONTENT  
    } else if (req.url.includes("login")) { //POST is cool
        res.setHeader('Content-Type', 'text/plain'); //how to parse, what kind of text
        let body = '';
        req.on('data', chunk => body += chunk.toString()); // convert Buffer to string
        req.on('end', () => res.end(body));
    } else {
        res.setHeader('Content-Type', 'text/plain'); //how to parse, what kind of text
        res.end(`Hello, World!\nMETHOD: ${req.method}\nURL: ${req.url}`); //end by sending the response CONTENT  
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});