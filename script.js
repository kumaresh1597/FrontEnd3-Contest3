
const api_key = "rwU5mckApmwRDtkLmHG6hZK6ZmcpPsEj4cVNWt1m";

const searchInput = document.getElementById("search-input"); 

const searchBtn = document.getElementById("sumbmit-btn");

const outsideContainer = document.getElementById("outside-container");

const historyList = document.getElementById("search-history");

const currentDate = new Date().toISOString().split("T")[0];

const history = [];

searchBtn.addEventListener("click",(event)=>{
    event.preventDefault();

    const date = searchInput.value;
    if(date ===""){
        return alert("Please Enter Date");
    }
    getImageOfTheDay(date);

    saveSearch(date);

    addSearchToHistory();

});

async function getImageOfTheDay(date){

    outsideContainer.innerHTML = "";

    const endpoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`;
    try {
        const response = await fetch(endpoint);
        const result = await response.json();

        const container = document.createElement("div");
        container.id = "current-image-container";

        let title = `Picture taken on ${result.date}`;
        if(date === currentDate){
            title = "NASA Picture Of The Day";
        }

        container.innerHTML = `
        <h1 id="Picture-Date">${title}</h1>
        <img src="${result.url}" alt="">
        <h3 id="desc-title">${result.title}</h3>
        <p id="description">${result.explanation}</p>
        `

        outsideContainer.append(container);
    } catch (error) {
        return alert(error);
    }   
}

 function saveSearch(date){

    const dateObj = {
        date:date,
    }
    
    history.push(dateObj);

    localStorage.setItem("searches",JSON.stringify(history));
 }

 function addSearchToHistory(){
    const list = JSON.parse(localStorage.getItem("searches"));
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.innerText = list[list.length-1].date;
    link.href = "#";

    link.addEventListener("click",()=>{
        getImageOfTheDay(link.innerText);
    })

    li.append(link);

    historyList.append(li);
 }

getImageOfTheDay(currentDate);











/*
{copyright: 'Antonio Tartarini', date: '2023-09-30', explanation: "For northern hemisphere dwellers, September's Full…s will be updated if the US goverment shuts down.", hdurl: 'https://apod.nasa.gov/apod/image/2309/HarvestMoonNest.jpg', media_type: 'image', …}
copyright
: 
"Antonio Tartarini"
date
: 
"2023-09-30"
explanation
: 
"For northern hemisphere dwellers, September's Full Moon was the Harvest Moon. Reflecting warm hues at sunset, it rises behind cypress trees huddled on a hill top in Tuscany, Italy in this telephoto view from September 28.  Famed in festival, story, and song, Harvest Moon is just the traditional name of the full moon nearest the autumnal equinox.  According to lore the name is a fitting one. Despite the diminishing daylight hours as the growing season drew to a close, farmers could harvest crops by the light of a full moon shining on from dusk to dawn. This Harvest Moon was also known to some as a supermoon, a term becoming a traditional name for a full moon near perigee. It was the fourth and final supermoon for 2023.   Note: Non-NASA APOD mirror sites will be updated if the US goverment shuts down."
hdurl
: 
"https://apod.nasa.gov/apod/image/2309/HarvestMoonNest.jpg"
media_type
: 
"image"
service_version
: 
"v1"
title
: 
"A Harvest Moon over Tuscany"
url
: 
"https://apod.nasa.gov/apod/image/2309/HarvestMoonNest.jpg"
[[Prototype]]
: 
Object
*/