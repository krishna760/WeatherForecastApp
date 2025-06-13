// DOM elements
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

// Main function
const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value.trim();

    if (cityVal === "") {
        city_name.innerText = `⚠️ Please enter a city name before searching.`;
        datahide.classList.add("data_hide");
        return;
    }

    try {
        const apiKey = "031328cbc0a80ec10083ef3d994dcd74";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Update UI with weather data
        city_name.innerText = `${data.name}, ${data.sys.country}`;
        temp_real_val.innerText = data.main.temp;

        const tempMood = data.weather[0].main;
        console.log("Weather Condition:", tempMood);

        // Set icon based on weather condition
        if (tempMood === "Clear") {
            temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
        } else if (tempMood === "Clouds") {
            temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        } else if (tempMood === "Rain") {
            temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
        } else {
            temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        }

        datahide.classList.remove("data_hide");
        cityName.value = "";

    } catch (error) {
        console.error("Error:", error.message);
        city_name.innerText = `⚠️ ${error.message}`;
        datahide.classList.add("data_hide");
        cityName.value = "";
    }
};

// Event listener
submitBtn.addEventListener("click", getInfo);
