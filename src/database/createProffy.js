// all the logic to treat data will be done here and then this function will be imported somewhere
// in order to create the object on the database tables
module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {

// code to insert date into proffys
const insertedProffy = await db.run(`

    INSERT INTO proffys (
        name, 
        avatar,
        whatsapp,
        bio
    ) VALUES (
        "${proffyValue.name}",
        "${proffyValue.avatar}",
        "${proffyValue.whatsapp}",
        "${proffyValue.bio}"     
    );

`) 

const proffy_id = insertedProffy.lastID

// code to insert data into table classes
const insertedClass = await db.run(`

    INSERT INTO classes (
        subject,
        cost, 
        proffy_id

    ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"

        );

`)
const class_id = insertedClass.lastID

// code to insert date into table class_schedule


const insertedAllClassScheduleValues = classScheduleValues.map((valueOnClassSchedule)=>{ //map return an array 

    return db.run(`
    
    INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
        

    ) VALUES (
        "${class_id}",
        "${valueOnClassSchedule.weekday}",
        "${valueOnClassSchedule.time_from}",
        "${valueOnClassSchedule.time_to}"
    );
    
    `)
  

})
    await Promise.all(insertedAllClassScheduleValues)
}
