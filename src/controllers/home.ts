import { Request, Response } from "express";
import pug from 'pug';
import { getCompassDirection, getApiConfigs } from "util/parser";
import pugWeather from 'views/weather.pug'
var moment = require('moment-timezone');
const convert = require("xml-js");
var dwmlParser = require('dwml-to-json');

// $postDigits = &$_POST['Digits'];
// $from = &$_POST['From'];
// $to = &$_POST['To'];
// $city = &$_GET['city'];

// if (array_key_exists('Digits',$_GET) || array_key_exists('From',$_GET) || array_key_exists('To',$_GET)) {
//     $postDigits = &$_GET['Digits'];
//     $from = &$_GET['From'];
//     $to = &$_GET['To'];
// }

/**
 * Home page.
 * @route GET /
 */
export const index = async (req: Request, res: Response) => {
  console.error("Request: ", req.params, req.query);

  var params;

  if (req.params.length > 0) {
    params = req.params;
  } else {
    params = req.query;
  }

  res.set('Content-Type', 'application/xml');
  const template = pug.compileFile(pugWeather);
  res.send(template(await renderTimeTemp(params)));
};

/**
 * Home page via lambda
 */
export const lambda = async (queryParams) => {
  console.error("Params: ", queryParams);
  const template = pug.compileFile(pugWeather);
  return template(await renderTimeTemp(queryParams));
};



/******** Begin Weather Parse ***********/

interface Location {
  region: string;
  latitude: string;
  longitude: string;
  elevation: string;
  wfo: string;
  timezone: string;
  areaDescription: string;
  radar: string;
  zone: string;
  county: string;
  firezone: string;
  metar: string;
}

interface Time {
  layoutKey: string;
  startPeriodName: string[];
  startValidTime: string[];
  tempLabel: string[];
}

interface Data {
  temperature: string[];
  pop: (string | null)[];
  weather: string[];
  iconLink: string[];
  hazard: any[];
  hazardUrl: any[];
  text: string[];
}

interface CurrentObservation {
  id: string;
  name: string;
  elev: string;
  latitude: string;
  longitude: string;
  Date: string;
  Temp: string;
  Dewp: string;
  Relh: string;
  Winds: string;
  Windd: string;
  Gust: string;
  Weather: string;
  Weatherimage: string;
  Visibility: string;
  Altimeter: string;
  SLP: string;
  timezone: string;
  state: string;
  WindChill: string;
}

interface WeatherData {
  operationalMode: string;
  srsName: string;
  creationDate: string;
  creationDateLocal: string;
  productionCenter: string;
  credit: string;
  moreInformation: string;
  location: Location;
  time: Time;
  data: Data;
  currentobservation: CurrentObservationObj;
}

async function renderTimeTemp(params:Array<string,string>) {

  // console.error("Got: ",params);
  var apiConfigs:ApiConfigs = getApiConfigs(params);

  // console.error("Now: ", apiConfigs);

  var responseCopy:any;
  const weatherData:WeatherData = await fetch(
      apiConfigs.weather_url,
      {
        headers: new Headers({
          "Accept"       : "application/json",
          "Content-Type" : "application/json",
          "User-Agent"   : "time-temp-typescript"
        })
      }
    )
    .then(res => { responseCopy = res.clone(); return res.json()})
    .catch(error => {
        console.error("Fetch error", error, responseCopy);
    });

  // console.log(weatherData);

  return {
    data: weatherData,
    getCompassDirection: getCompassDirection,
    now: moment().tz(apiConfigs.tz).format('h:mm:ss A, MMMM D, YYYY'),
    voiceA: "Polly.Matthew-Neural",
    voiceB: "Polly.Joanna-Neural",
    apiConfigs: apiConfigs,
    formatObsDate: (d) => moment(d, "DD MMM hh:mm A Z").format('h:mm A'),
    convertFtoC: (f) => Math.round((f - 32) / 1.8),
    getLastPartOfLocation: (l) => { var match = l.match("^(.*)[-,](.*)$"); if (match && match.length > 1) { return match[2]; } else { return l; } }
  };
}