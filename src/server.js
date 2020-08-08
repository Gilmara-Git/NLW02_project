
const express = require("express")
const server = express()
const nunjucks = require("nunjucks")
const { pageLanding, pageStudy, pageTeach } = require("./pages")



nunjucks.configure("src/views", {
    express : server,
    noCache:true,
    autoescape:false
}  )



server.use(express.static("public"))

server.get("/", pageLanding)

server.get("/study", pageStudy)

server.get("/teach", pageTeach)




server.listen(5500, function(){

    console.log("estou aqui")
})
//console.log(__dirname)