import conditions from "./conditions.js";


const apiKey = '30f9e89779034dddb29110204232801';

const header = document.querySelector('#header');
const input = document.querySelector('#input');
const form = document.querySelector('#form');

form.addEventListener(('submit'), async function (e) {
    e.preventDefault();

    let city = input.value.trim();
    const data = await getWeather(city);

    
    if (data.error) {
        removeCard();
        showError(data.error.message);
    } else {
        removeCard();

        console.log(data.current.condition.code);

        const info = conditions.find((obj) => obj.code === data.current.condition.code);
        console.log(info.languages[23]['day_text']);

        const condition = data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text']

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: condition,
        };

        showCard(weatherData);
    }
});



// Functions

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    return data;
};

function showCard({name, country, temp, condition}) {
    const html = `
    <div class="card" id='card'>
        <h2 class="card-city">${name} <span>${country}</span></h2>

        <div class="card-weather">
            <div class="card-value">${temp}<sup>°c</sup></div>
            <img class="card-img" src="./img/example.png" alt="Weather">
        </div>

        <div class="card-description">${condition}</div>
    </div>
    `
    header.insertAdjacentHTML('afterend', html);
};

function removeCard() {
    const prevCard = document.querySelector('#card');
    if (prevCard) prevCard.remove();
};

function showError(errorMessage) {
    const html = `
    <div class="card" id='card'>${errorMessage}</div>
    `;

    header.insertAdjacentHTML('afterend', html)
}

