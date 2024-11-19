const fs = require('fs'); //FILE SYSTEM

function read(filePath){
    return fs.readFileSync(filePath, "utf8"); //FILE TO STRING    
}

const html = read("./static/index.html");
console.log(html);