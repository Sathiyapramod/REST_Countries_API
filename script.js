// All the HTML elements shall be created by DOM elements
// creating dummy variables to store values

let details = [];

fetch("https://restcountries.com/v3.1/all")
    .then((data) => { return data.json() })
    .then((data) => {
        details = data;
        showDetails(details);  //Calling the external function to displaydetails 
 });

function showDetails(arr) {
    //Using Map function of array and returning the display details 
    const final = arr.map((arr,index)=>{
        //Using DOM to create a card to display the Various country data

    //Creating a Card using DOM 
    let card = document.createElement("div");
    card.type = "div";
    card.style.width="25rem";
    card.style.height ="40rem";
    card.style.backgroundColor="beige";
    card.style.boxShadow = "5px 5px 8px 5px lightgrey";
    card.classList.add("mx-auto","card","rounded-5","align-items-center","col-lg-8","col-sm-12","col-md-6");

    //Creating a Card Header inside Card using DOM
    let cardHeader = document.createElement("div");
    cardHeader.type = "div";
    cardHeader.style.height="5rem";
    cardHeader.innerHTML = `${arr.name.common}`;
    cardHeader.classList.add("justify-content-center","mt-3","align-items-center","fs-4","card-header","fw-bold","row");
    
    //Creating a Card Body inside Card using DOM
    let cardBody = document.createElement("div");
    cardBody.type = "div";
    cardBody.style.height="15rem";
    cardBody.classList.add("card-body","text-center");
    
    //Creating an Image, Capital, Latitude, Longitude and Country-code details inside Card Body 
    let flag = document.createElement("img");
    flag.type="img";
    flag.setAttribute("src",`${arr.flags.svg}`);
    flag.style.width="20rem";
    flag.style.height = "10rem";
    flag.setAttribute("alt","flagdesign");
    flag.classList.add("img-fluid");

    let capital = document.createElement("div");
    capital.type = "div";
    capital.classList.add("fs-5","mt-3");
    capital.innerHTML = `<b>Capital</b> : &nbsp ${arr.capital}`;

    let lats = document.createElement("div");
    lats.type="div";

    lats.classList.add("fs-5");
    lats.innerHTML = `<b>Latitude</b> = &nbsp ${Math.round(arr.latlng[0]).toFixed(2)}`;

    let longs = document.createElement("div");
    longs.type = "div";

    longs.classList.add("fs-5");
    longs.innerHTML = `<b>Longitude</b> = ${Math.round(arr.latlng[1]).toFixed(2)}`;

    let cc = document.createElement("div");
    cc.type = "div";
    cc.classList.add("fs-5");
    cc.innerHTML = `<b>Country-code</b> = ${arr.cca3}`;

    //Adding a Click button to facilitate details on Weather API
    let btn = document.createElement("button");
    btn.innerText = "Click Weather"
    btn.classList.add("btn","btn-primary","mt-2","mb-2");
    btn.setAttribute("onclick",`getweather(${Math.round(arr.latlng[0]).toFixed(2)},${Math.round(arr.latlng[1]).toFixed(2)},${index})`);
    
    let weather = document.createElement("para");
    weather.type="para";
    weather.style.visibility="hidden";
    weather.style.backgroundColor="lightgrey";
    weather.style.width="auto";
    weather.style.height="8rem";
    weather.classList.add("row","mt-2","fs-4","rounded-3","justify-content-center","align-items-center");
    weather.setAttribute("id",`btn${index}`);


    cardBody.append(flag,capital,lats,longs,cc,btn,weather);
    card.append(cardHeader,cardBody);
    
    document.body.append(card);
    });
}

function getweather(lats,longs,index){
     
    let lats1 = lats;
    let longs1 = longs;
    let btn = document.getElementById('btn'+index);

    let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lats1}&lon=${longs1}&appid=cfe629503bf7407edba47d68c8ff572e&units=metric`);
    weather.then((data)=>data.json())
    .then((data1)=>{
        console.log(data1,index);

        btn.style.visibility = "visible";
        btn.innerHTML = `<p><b>Temperature</b>: &nbsp ${data1.main.temp} °C<br>
        <b>Humidity</b>: &nbsp ${data1.main.humidity} %</p>`;

    });

}


