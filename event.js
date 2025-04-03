//creating the state to hold the events data 
let events = []

//creating link to the div in the html file
const eventList = document.querySelector("#event")
const schedule = document.querySelector("#schedule")

// creating a render function 
const render = () =>{
      const html = events.map((planned) =>
      {
          return `
            <div>
              <h2>${planned.name}</h2>
              <p>${planned.description}</p>
              <p>${planned.date}</p>
              <p>${planned.location}</p>
              <button class="deleteButton" name="${planned.id}">Delete</button>
            </div>
          `
      })
      eventList.innerHTML = html.join("")
}

//linking api to the Js File 
const getEvent = async () => 
    {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-web-am/events")
        //console.log(plan)
        const json = await response.json()
        //console.log(json.data)
        events = json.data;
        console.log(events)
        render()
    }
getEvent()

schedule.addEventListener("submit", async (planner) =>
{
    planner.preventDefault();
    const newEvent =
    {
      name: planner.target.name.value,
      description: planner.target.description.value,
      date:planner.target.date.value,
      location:planner.target.location.value 
    }
    console.log(newEvent)
  try
  {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-web-am/events",
    {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    })
    const eventData = await response.json()
    console.log(eventData)
    events.push(eventData.data)
    render()
  }
  catch(error)
  {
    console.error(error);
  }
})

eventList.addEventListener("click", async (event) => 
  {
    if (event.target.classList.contains("deleteButton"))
    {
      const eventId = event.target.name;
     try 
     {
       await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-web-am/events/${eventId}`, {
         method: "DELETE"
       });
       event.target.parentElement.remove()
     } catch (error) {
      console.error(error)
     }
    }
  })