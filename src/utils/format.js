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

    // Function 
    function getSubject(valueFromFrontend) {
        const subjectsArrayPosition = +valueFromFrontend - 1 //-1 to get the right subject as subjects value in the form starts with 1 , not 0 
        return subjects[subjectsArrayPosition] // return the oject in the array position
        
        }

    
    function convertHoursToMinutes(time)  {
        const  [ hour, minutes ] = time.split(":")
        return Number((hour * 60) + minutes)

    }     



        module.exports  = {

            subjects,
            weekdays,
            getSubject,
            convertHoursToMinutes
            
        }