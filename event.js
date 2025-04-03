//creating the state to hold the events data 
const events = [];

//creating link to the div in the html file
const eventList = document.querySelector("#event");

//linking api to the Js File 
const getEvent = async () => 
    {
        const plan = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/events")
        //console.log(plan)
        const json = await plan.json()
       // console.log(json.data)
        events= json.data;
        render()
    }

// creatin g a render function 
const render = () => 
{
    const added = events.map((planner) =>
    {
        return `
          <div>
            <h2>${planner.name}</h2>
            <p>${planner.description}
            </p>
          </div>
        `
    })
    eventList.innerHTML = added.join("")
}

//creating a function to display the events in the html file
getEvent();