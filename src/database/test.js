const Database = require("./db")
const createProffy = require ("./createProffy")

Database.then(async(db) =>{

// Insert data

     proffyValue = {

        name: "Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "3134777788", 
        bio : "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        
     }

     classValue = {

        subject: 1,
        cost: "20",
       //proffy_id will be inserted by the database

     }

     classScheduleValues = [ // as there will be more than 1 schedule we need an array
         {

        weekday: 1,
        time_from: 720, 
        time_to: 220  
     },
        {
        weekday: 0,
        time_from:520, 
        time_to:1333  
     }


    ]

    //Create object on table
    //await createProffy(db, {proffyValue, classValue, classScheduleValues}) //this will be executed later

    // consult data on table (db)
    const selectedProffys = await db.all("SELECT* FROM proffys")
    //console.log(selectedProffys)

    const selectClassesAndProffys = await db.all(`

        SELECT classes.*, proffys.*  
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;     
    
    `)

    //.log(selectClassesAndProffys)


    //time that a proffy works from 08 - 18 h 
    // horario time_from (8h)  needs to be before or same as time requested
    //time_to needs to be bigger
})