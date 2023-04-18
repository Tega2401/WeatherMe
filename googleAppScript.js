//backend code 

function doPost(e) {
  const location = JSON.parse(e.postData.contents).location;
  const apiKey = {ENTER_YOUR_API_KEY};
  if (isNaN(location)) { //runs if the input is the name of the city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`; 

    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  }

  else {  //runs if the input is the zipcode of a city
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&units=imperial&appid=${apiKey}`; 

    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  }
  
}
