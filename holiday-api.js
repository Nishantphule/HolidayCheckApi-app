
const holidayArea = document.getElementById("holidays-area")
const formObj = document.getElementById('holidaysForm');

function formValidation(data) {
    const country = data.countryCode.split("").length
    const month = data.month
    if (country !== 2) {
        document.getElementById("countryError").style.display = "block"
    }
    else if (month < 0 || month > 12) {
        document.getElementById("monthError").style.display = "block"
    }
    else {
        document.getElementById("countryError").style.display = "none"
        document.getElementById("monthError").style.display = "none"
        getHolidays(data.countryCode, data.month);
    }
}



// getting form details on submit

formObj.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {};
    Array.from(e.target.elements).forEach((element) => {
        if (element.nodeName === 'INPUT') {
            data[element.name] = element.value;
        }
    });
    formValidation(data)

})





// fetching monthly holidays using form data
const getHolidays = async (code, month) => {

    // clearing previous data
    holidayArea.innerHTML = ""

    // creating a element for loading text
    const loading = document.createElement("span")
    loading.innerHTML = '<div class="spinner-border"></div>'
    holidayArea.appendChild(loading)


    try {
        // fetching holiday api
        const response = await fetch(`https://holidays.abstractapi.com/v1/?api_key=0cff6f896b4747eaacce2349b2167c14&country=${code}&year=2020&month=${month}`)

        // removeing element for loading text
        holidayArea.removeChild(loading)


        // creating title
        const title = document.createElement("h1")
        title.id = 'title'
        title.style.width = "100%"
        title.style.backgroundColor = "#D8C1DE"
        const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let monthName = monthList[month - 1]


        // iterating through each holiday to create a card
        const holidays = await response.json();
        const location = await holidays[0].location

        title.innerText = `Holidays of ${monthName} month in ${location}`
        holidayArea.appendChild(title)

        holidays.forEach((holiday) => {

            // card for each holiday
            const holidayDetails = document.createElement("div")
            holidayDetails.classList += "holidayCard"

            // name element
            const holidayName = document.createElement("h2")
            holidayName.style.color = "black"
            holidayName.innerText = `${holiday.name}`

            // day and date element
            const holidayDay = document.createElement("h3")
            holidayDay.innerText = `${holiday.date} ${holiday.week_day}`

            // type of holiday element
            const holidayType = document.createElement("h3")
            holidayType.innerText = `Holiday Type-${holiday.type}`

            holidayDetails.append(holidayName, holidayDay, holidayType)
            holidayArea.append(holidayDetails)
        })
    } catch (error) {
        alert("Invalid Input")
        console.error(error)
    }

};