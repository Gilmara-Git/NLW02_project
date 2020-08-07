const proffys = [

    { 
        name: "Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "3134777788", 
        bio : "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from:[720], 
        time_to:[1220]  
    },
    
    { 
        name: "Danielle Evangelista", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "3134777788", 
        bio : "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from:[820], 
        time_to:[1320]  
    },
    { 
        name: "Gilmara Pimentel", 
        avatar:"https://avatars2.githubusercontent.com/u/66445234?s=460&u=a22e4a4100f4cc46018961477d9192047f2930e6&v=4",
        whatsapp: "3134777788", 
        bio : "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from:[820], 
        time_to:[1320]  
    }

]

const subjects = [

"Artes",
"Biologia",
"Ciências",
"Educação Física",
"Física",
"Geografia",
"História",
"Matemática",
"Português",
"Química",
    
]

const weekdays = [

    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",

]


const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express : server,
    noCache:true,
    autoescape:false
}  )





server.use(express.static("public"))



server.get("/", pageLanding)

server.get("/study", pageStudy)

server.get("/teach", pageTeach)

function pageLanding(req, res){

    return res.render("index.html") 
}


function getSubject(valueFromFrontend) {
const subjectsArrayPosition = +valueFromFrontend - 1 //-1 to get the right subject as subjects value in the form starts with 1 , not 0 
return subjects[subjectsArrayPosition] // return the oject in the array position

}

function pageStudy(req, res) {
    filters = req.query

    return res.render("study.html", { proffys, filters, subjects, weekdays } )
}

function pageTeach(req, res){

    const data = req.query
    
    const isNotEmpty = Object.keys(data).length > 0
    
   
    if(isNotEmpty) {  
        
        data.subject = getSubject(data.subject)

        proffys.push(data)

        return res.redirect("/study")

    }


    return res.render("teach.html" , {subjects, weekdays })

}


server.listen(5500, function(){

    console.log("estou aqui")
})
//console.log(__dirname)