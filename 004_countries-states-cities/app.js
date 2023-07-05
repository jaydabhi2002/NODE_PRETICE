var headers = new Headers();
headers.append("X-CSCAPI-KEY", "TnhkcGRwNDR5NEdQcWFZd2xGMXhJT3FKbnBGSXBzVW1MT0o5a0tESA==");

var requestOptions = {
   method: 'GET',
   headers: headers,
   redirect: 'follow'
};

const getCountries = ()=>{

  fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
  .then(data=>{
      return data.json()
  }).then(result=>{
      
      var rows="";
      for(var i=0;i<result.length;i++)
      {
          rows = rows+"<option value="+result[i].iso2+">"+result[i].name+"</option>"
      }
      country.innerHTML=rows
  }).catch(err=>{
      console.log(err);
  })
}

var countrycode;
const getStates=(cname)=>{
    countrycode = cname
//  alert(cname)
  fetch(`https://api.countrystatecity.in/v1/countries/${cname}/states`, requestOptions)
  .then(data=>{
      return data.json()
  }).then(result=>{
      
      var rows="";
      for(var i=0;i<result.length;i++)
      {
          rows = rows+"<option value="+result[i].iso2+">"+result[i].name+"</option>"
      }
      state.innerHTML=rows
  }).catch(err=>{
      console.log(err);
  })
}
const getCities=(scode)=>{
    var statecode;
    statecode = scode

    // alert(scode)
    
      fetch(`https://api.countrystatecity.in/v1/countries/${countrycode}/states/${scode}/cities`,requestOptions)

      .then(data=>{
          return data.json()
      }).then(result=>{

          var rows=""; 
          for(var i=0;i<result.length;i++)  
          {
            rows = rows+"<option>"+result[i].name+"</option>"
          }
          city.innerHTML=rows
      }).catch(err=>{
          console.log(err);
      })
    }

    const getWeather = (name) => {

        const location = name + "," + statecode + "," + countrycode
    
        fetch(`/weather?location=${location}`).then(result => {
            return result.json()
        }).then(data => {
    
            city.innerHTML = data.city
            temp.innerHTML = data.temp
            pressure.innerHTML = data.pressure
            humidity.innerHTML = data.humidity
            lat.innerHTML = data.lat
            lng.innerHTML = data.lon
    
    
        }).catch(err => {
            console.log(err);
        })
     
    
    }