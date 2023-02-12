var moment = require('moment');

export interface ApiConfigs {
  weather_url: string;
  city_name: string;
  tz: string;
}

export var getApiConfigs:ApiConfigs = function(params:Array<string,string>) {
  var first_number = "+12225551212";
  var second_number = "+13335554343";

  var now = moment().format('Y-m-d');

  var out:ApiConfigs = {};

  if (params['To'] == first_number || params['city'] == "first") {
    out.weather_url = "https://forecast.weather.gov/MapClick.php?lat=34.052&lon=-118.243&unit=0&lg=english&FcstType=json";
    out.city_name = "Los Angeles";
    out.tz = "America/Los_Angeles";
  } else if (params['To'] == second_number || params['city'] == "second") {
    out.weather_url = "https://forecast.weather.gov/MapClick.php?lat=39.739&lon=-104.984&unit=0&lg=english&FcstType=json";
    out.city_name = "Denver";
    out.tz = "America/Denver";
  } else {
    out.weather_url = "https://forecast.weather.gov/MapClick.php?lat=40.7146&lon=-74.0071&unit=0&lg=english&FcstType=json";
    out.city_name = "New York";
    out.tz = "America/New_York";
  }

  return out;
}

export var getCompassDirection = function(bearing:number) {
  var direction:string;
  const tmp = Math.round(bearing / 22.5);
  switch(tmp) {
    case 1:
       direction = "North Northeast";
       break;
    case 2:
       direction = "North East";
       break;
    case 3:
       direction = "East Northeast";
       break;
    case 4:
       direction = "East";
       break;
    case 5:
       direction = "East Southeast";
       break;
    case 6:
       direction = "South East";
       break;
    case 7:
       direction = "South Southeast";
       break;
    case 8:
       direction = "South";
       break;
    case 9:
       direction = "South Southwest";
       break;
    case 10:
       direction = "South West";
       break;
    case 11:
       direction = "West Southwest";
       break;
    case 12:
       direction = "West";
       break;
    case 13:
       direction = "West Northwest";
       break;
    case 14:
       direction = "North West";
       break;
    case 15:
       direction = "North Northwest";
       break;
    default:
       direction = "North";
  }
  return direction;
}