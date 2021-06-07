const apiKey = "?api_key=dce09207-2ffb-4fcb-b3f9-d8b526e437ec"

const createNewElement = (element, className) => {
    let el = document.createElement(element);
    el.classList.add(className)
    
    return el
}

const appendElement = (element, parent) => {
    parent.appendChild(element)
    return parent
}

const shows = document.querySelector(".shows")

const showsTitle = createNewElement("h1", "shows__title")
showsTitle.innerText = "Shows"
appendElement(showsTitle, shows)

const showsContainer = createNewElement("div", "shows__container")
appendElement(showsContainer, shows)



function getShowData() {
    axios
    .get(`https://project-1-api.herokuapp.com/showdates${apiKey}`)
    .then((response) => {
        const showsArray = response.data;
        showsArray.forEach((show) =>{
            const showsCard = createNewElement("div", "shows__card")
            appendElement(showsCard, showsContainer)
            
            const datesTitle = createNewElement("p", "shows__card--header")
            datesTitle.innerText = "DATES"
            appendElement(datesTitle, showsCard)
            
            const date = createNewElement("p", "shows__card--info")
            date.innerText = new Date(Number(show.date)).toDateString()
            appendElement(date, showsCard)

            const venueTitle = createNewElement("p", "shows__card--header")
            venueTitle.innerText = "VENUE"
            appendElement(venueTitle, showsCard)
            
            const venue = createNewElement("p", "shows__card--info")
            venue.innerText = show.place
            appendElement(venue, showsCard)

            const locationTitle = createNewElement("p", "shows__card--header")
            locationTitle.innerText = "LOCATION"
            appendElement(locationTitle, showsCard)

            const location = createNewElement("p", "shows__card--info")
            location.innerText = show.location
            appendElement(location, showsCard)
            
            const buyBtn = createNewElement("button", "shows__card--button")
            buyBtn.id = show.id
            buyBtn.innerText = "BUY TICKETS"
            appendElement(buyBtn, showsCard)

            const buyTicket = () => {
                if(buyBtn.id === show.id){
                    console.log(show.place)
                }
            }

            buyBtn.addEventListener("click", buyTicket )
        })
    })
    .catch((error) => console.log(error))
}

getShowData()

