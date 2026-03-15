const API_KEY = "df289f007eb27d6c6fba4c27ca67d804"

async function getWeather(){

const city = document.getElementById("cityInput").value;

if(city===""){
alert("Enter city name");
return;
}

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

const res = await fetch(weatherURL);
const data = await res.json();

if(data.cod != 200){
alert("City not found");
return;
}

document.getElementById("city").innerText=data.name;

document.getElementById("temp").innerText=
Math.round(data.main.temp)+"°C";

document.getElementById("desc").innerText=
data.weather[0].description;

document.getElementById("humidity").innerText=
data.main.humidity+"%";

document.getElementById("wind").innerText=
data.wind.speed+" km/h";

document.getElementById("icon").src=
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

const today=new Date();
document.getElementById("date").innerText=today.toDateString();

/* AQI */

/* AQI */

const lat = data.coord.lat;
const lon = data.coord.lon;

const aqiURL =
`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

const aqiRes = await fetch(aqiURL);
const aqiData = await aqiRes.json();

const aqiLevel = aqiData.list[0].main.aqi;

let aqiNumber;
let aqiText;
let aqiColor;

switch(aqiLevel){

case 1:
aqiNumber = Math.floor(Math.random()*50);
aqiText = "Good";
aqiColor = "#00e400";
break;

case 2:
aqiNumber = Math.floor(Math.random()*50)+51;
aqiText = "Moderate";
aqiColor = "#ffff00";
break;

case 3:
aqiNumber = Math.floor(Math.random()*50)+101;
aqiText = "Unhealthy (Sensitive)";
aqiColor = "#ff7e00";
break;

case 4:
aqiNumber = Math.floor(Math.random()*50)+151;
aqiText = "Unhealthy";
aqiColor = "#ff0000";
break;

case 5:
aqiNumber = Math.floor(Math.random()*100)+201;
aqiText = "Very Unhealthy";
aqiColor = "#8f3f97";
break;

}

const aqiElement = document.getElementById("aqi");

aqiElement.innerText = `${aqiNumber} (${aqiText})`;
aqiElement.style.color = aqiColor;

/* Background change */

const weather=data.weather[0].main.toLowerCase();

const bg=document.getElementById("weatherBackground");

bg.innerHTML="";

if(weather.includes("rain")){

document.body.style.backgroundImage=
"url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21')";

for(let i=0;i<120;i++){

const drop=document.createElement("span");

drop.style.left=Math.random()*100+"%";

drop.style.animationDuration=(0.3+Math.random()*0.5)+"s";

bg.appendChild(drop);

}

bg.classList.add("rain");

}

else if(weather.includes("cloud")){

document.body.style.backgroundImage=
"url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')";

const cloud=document.createElement("div");

cloud.className="cloud";

bg.appendChild(cloud);

}

else{

document.body.style.backgroundImage=
"url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')";

}

}