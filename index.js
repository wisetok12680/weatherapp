window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");

    
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-proxy.htmldriven.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            
          console.log(data);  
          let { temperature, summary ,icon} = data.currently;
          temperature = parseInt(((temperature - 32) * 5) / 9);
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          timezone=data.timezone;
          locationTimezone.textContent = timezone;
          setIcons(icon,document.querySelector(".icon"));
        });
    });
}
        function setIcons(icon, iconID){
            const skycons = new Skycons({color:"white"});
            const currentIcon=icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);
        } 
});
