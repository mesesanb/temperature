
temperature();



function temperature() {
    
    document.getElementById('container').addEventListener('click', function (e) {  //se asculta ptr un click in intregul div
        
        cityCode = document.getElementById('citySelect').value;// citim id-ul orasului
        
        document.cookie = "cityCode=" + cityCode;
        if (e.target.id == "label_C" || e.target.id == "celsius") {

            localStorage.setItem("units", "C"); // local storage - > grade Celsius
            getTemp();

        }
        if (e.target.id == "label_F" || e.target.id == "fahrenheit") {

            localStorage.setItem("units", "F");//local storage - >  fahrenheit 
            getTemp();
        }
    });

    document.getElementById('citySelect').addEventListener('change', function (e) {
        
        var cityCode = document.getElementById('citySelect').value;
        
        document.cookie = "cityCode=" + cityCode; // punem in cookie valoarea codului de oras
        
        var checkedRadio = document.getElementById('celsius').checked; //verificam in momentul schimbului de oras din dropdown ce buton radio e selectat
        
        if (checkedRadio) {
            localStorage.setItem("units", "C"); // local storage - > grade Celsius

            getTemp();

        } else {

            localStorage.setItem("units", "F"); //local storage - >  fahrenheit 

            getTemp();
        }
    });


}

function getTemp() {

    var cityC = document.cookie; //citim cookie creat mai devreme
    var cityCode = cityC.split("=")[1];  //extragem valoarea codului de oras
    var tempUnits = localStorage.getItem("units"); //scoatem  tipul de unitati de temperatura dorite din local storage
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=" + cityCode + "&APPID=40688dc3be160449f53b33ea2207e3e9"; // json vreme 



    // var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=" + cityName + "&format=jsonfm"; //articol wiki
    //key 40688dc3be160449f53b33ea2207e3e9  cheia API pentru json de temperatura 
    // news API  https://newsapi.org/  Your API key is: 0c3062d310aa4e9d8b6fa2adcef4d58f 

    //https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Cluj-Napoca&format=jsonfm  format link articol wiki




    fetch(queryURL)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (json) {

            

            if (tempUnits == "C") {
                var tempCelsius = json.main.temp - 273.15; // transforma din grade kelvin date de JSON in grade celsius
                var temp = tempCelsius.toFixed(1); // temperatura este fixata la o zecimala - ea are sase zecimale in JSON
                document.getElementById("temperature").innerHTML = "";
                document.getElementById('temperature').innerHTML += "Temperature: " + temp + "°C"; //afisare temperatura
            } else {
                var tempFahrenheit = (json.main.temp - 273.15) * 9 / 5 + 32; // transforma din grade kelvin date de JSON in grade celsius
                var temp = tempFahrenheit.toFixed(1); // temperatura este fixata la o zecimala - ea are sase zecimale in JSON
                document.getElementById("temperature").innerHTML = "";
                document.getElementById('temperature').innerHTML += "Temperature: " + temp + "°F"; //afisare temperatura
            }

            

            let iconCode = json.weather[0].icon; //imaginea cu starea vremii 
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"; //calea catre imaginea cu starea vremii 
            document.getElementById('weatherIcon').setAttribute("src", iconUrl); // afisare in DOM a icoanei
            var windDirection = json.wind.deg; //directia vantului
            var windSpeed = json.wind.speed; // viteza vantului 
            

            document.getElementById('winds').innerHTML = "Wind direction: <b> " + windDirection + "</b> degrees<br> Wind speed: <b> " + windSpeed + "</b> meter/sec"; // afisare viteza vant
            document.getElementById('lat').innerHTML = "Lat:" + json.coord.lat + " Long: " + json.coord.lon; // afisare coordonate oras 
        });

  

}




