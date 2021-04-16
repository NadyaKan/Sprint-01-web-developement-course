const port = 3000,
 http = require("http"),
 httpStatus = require("http-status-codes"),
 fs = require("fs"),
 router = require("./router"),
 plainTextContentType = {
    "Content-Type": "text/plain"
    },
    htmlContentType = {
    "Content-Type": "text/html"
    },
    customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
   if (errors) {
   console.log("Error reading the file...");
   }
   res.end(data);
    });
    };

    router.get("/", (req, res) => {
        res.writeHead(httpStatusCodes.OK, plainTextContentType);
        res.end("INDEX");
       });
       router.get("/index.html", (req, res) => {
        res.writeHead(httpStatusCodes.OK, htmlContentType);
        customReadFile("views/index.html", res);
       });
       router.get("/about.html", (req, res) => {
        res.writeHead(httpStatusCodes.OK, htmlContentType);
        customReadFile("views/aboutPage.html", res);
       });
       router.get("/profile.html", (req, res) => {
        res.writeHead(httpStatusCodes.OK, htmlContentType);
        customReadFile("views/profilePage.html", res);
       });
       router.post("/", (req, res) => {
        res.writeHead(httpStatusCodes.OK, plainTextContentType);
        res.end("POSTED");
       });
       http.createServer(router.handle).listen(3000);
       console.log(`The server is listening on port number: ${port}`);


   

