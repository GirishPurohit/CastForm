const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
// require("dotenv").config();
app.use(express.static("public"));
app.set("view engine","ejs");



app.get("/",function(req,res){
    const sendData = {location:"Location", country:" ", temp:"Temp", des:"Description", feel:"Feel-like", humidity:"Humidity", speed:"Speed"}
    res.render("index", {sendData:sendData});
});

app.post("/",async(req,res) => {

    res.set("Content-Type", "text/html");

    let location = await req.body.city;
    const apikey = "9dfecebbee81b9b44a7325b7eaefd1cf";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apikey+"&units=metric";
    const response = await fetch(url);
    // console.log(response);
    const weatherData = await response.json();
    console.log(weatherData);
    const temp = Math.floor(weatherData.main.temp);
    // console.log(temp);
    const des = weatherData.weather[0].description;
    const sendData = {};
    sendData.temp = temp;
    sendData.des = des;
    sendData.location = location;
    sendData.feel = weatherData.main.feels_like;
    sendData.humidity = weatherData.main.humidity;
    sendData.speed = weatherData.wind.speed;
    sendData.country = weatherData.sys.country;
    res.render("index",{sendData:sendData});
});

app.listen(3000,function(req,res){
    console.log("server started on port 3000");
});