//find button + Novo horario and when there is a click, add .schedule-items
document.querySelector("#add-time").addEventListener("click", function cloneField (){
    
const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true) // This is the element duplicated. Now we need do defined where we are going to place it on the page
document.querySelector("#schedule-items").appendChild(newFieldContainer)  //Node is refered to objects html (DOM - Document Object Model - than we are going to clone the node)
// we will see child, parent

//when  the node child is cloned we want to clear the input fields 
const fields = newFieldContainer.querySelectorAll("input")

fields.forEach(function(field) {
    //get the field of the moment. This is will execute twice as there are 2 fields
    field.value=""
 
})

})

//what to do when we find the button

