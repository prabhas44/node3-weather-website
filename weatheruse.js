const request = require('request')

const forecast = (lat,lon,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=3b5eb978a721f5157dff03d56adfbb5e&query='+lat+','+lon

    request({url, json : true} , (err,res) => {

        if(err)
        {
            callback('No Internet Connection',undefined)
        }

        else if(res.body.error)
        {
            callback('Incorrect Url', undefined)


        }

        else
        {
            callback(undefined, {
                Location : res.body.location.name,
                temperature : res.body.current.weather_descriptions[0] + '. It is currently ' +res.body.current.temperature +' degrees out. It feels like ' + res.body.current.feelslike +' degrees out.'
            })
        }

    })
}

module.exports = forecast;

