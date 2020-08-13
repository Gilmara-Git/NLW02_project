const Database = require("./database/db")

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')



function pageLanding(req, res){

    return res.render("index.html") 
}

async function pageStudy(req, res) {
    const filters = req.query
    
    if(!filters.subject || !filters.weekday || !filters.time) {

        return res.render("study.html", { filters, subjects, weekdays } )
    }

    //console.log("teste -  tudo preenchido")  - Button filter on Study page is workings


    //convert hours in minutes

    const timeToMinutes = convertHoursToMinutes(filters.time)



    const query = `
        SELECT classes.*, proffys.*  
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS ( 
            SELECT class_schedule.*
            from class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}

        )
            AND classes.subject = "${filters.subject}"
    `

    // if there is error when consulting data
    try {

        const db  = await Database
        const proffys = await db.all(query)

        return res.render("study.html", { proffys, subjects, filters, weekdays })


    } catch (error) {
        
        console.log(error)
    }

    // res.render("study.html", { proffys, filters, subjects, weekdays } )
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

async function saveClasses (req, res) {
    
    const createProffy = require("./database/createProffy")

    const proffyValue = {

        name: req.body.name,
        avatar: req.body.avatar,
        wahtsapp: req.body.wahtsapp,
        bio: req.body.bio

    }
    
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) =>{ // map return the object in each array position

            return { 

                weekday,
                time_from:convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index])
            }

    })

        try { // try { } catch {} is a good practice when we have AWAIT

        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues} )

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
    
        return res.redirect("/study" + queryString ) // This query string variable, teacher data saved (on page study)
        
        } catch (error){

          console.log(error)
        }

    }




function pageSuccess(req, res){    
    
       return res.render("success.html")
      
     
}
module.exports = {

    pageLanding,
    pageStudy,
    pageTeach,
    saveClasses,
    pageSuccess
}
