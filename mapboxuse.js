const { response } = require('express')
const request = require('request')

const geocode = (add,callback) =>{

const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+add+'.json?access_token=pk.eyJ1IjoicHJhYmhhc3QxMSIsImEiOiJja3ptamxoNHIwMGIyMnhwZHp0MHY3ZHpyIn0.TXhYhPmQDLV7NzYeF-lCRw'

request({url : url , json : true}, (err,res) => {

if(err)
{
    callback('No Internet connection',undefined)
}

else if(res.body.message)
{
    callback('Incorrect URL',undefined)
}

else if (res.body.features.length == 0)
{
    callback('Incorrect URL',undefined)
}

else{
    callback(undefined, {
        location : res.body.features[0].place_name,
        latitude : res.body.features[0].center[1],
        longitude : res.body.features[0].center[0]
    })
}

})

}

module.exports= geocode;
