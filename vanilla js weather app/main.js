//when the page loads, everything inside this function loads 
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)

            long = position.coords.longitude
            lat = position.coords.latitude

            //include a proxy below, to prevent a CORS error
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            //this is where we pull in the API below, the api key is included in the url
            const API = `${proxy}https://api.darksky.net/forecast/fe9dfefff70ca43cac386255fb52d08a/${lat},${long}`

            // fetch brings in the information from the api url above...
            fetch(API)
                // after you fetch, you do something with the data..
                //.then will run only when the information is received from the api
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    const { temperature, summary } = data.currently
                    //set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                })
        })

    } else {
        h1.textContent = 'Hey Girl, you need to get it together ok'
    }

})