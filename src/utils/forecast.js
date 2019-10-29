const request = require('request')

const forecast = (lattitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/447d50734db02251d0a122ae2cc87ffa/${lattitude},${longitude}`
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability}% change of rain.`)
    }
  })
}



module.exports = forecast