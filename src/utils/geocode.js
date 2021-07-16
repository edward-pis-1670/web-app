const request = require('request')
const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoiaHVzdDE2NzAiLCJhIjoiY2tyNGR3aWRkMXQzNzMwbW42Nzk5ZWU1YiJ9.DFDQc5wyuwITc537pTTHHQ";
    request({ url: url, json: true }, (err, {body}) => {
      if (err) {
        callback("Unable to connect to location service!", undefined);
      } else if (body.featulength === 0) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name
        });
      }
    });
  };

  module.exports = geocode