const request = require('request');

const forecast = (latitude , longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/be2c0ed297b8ab9f4fdcdcf1a50bd2e4/' + latitude + ',' + longitude + '?units=si&lang=en';//units = si means degrees go to docs and see more things but syntax is same if we add more thing use &
    request({url , json: true} , (error , {body}) => {
        if(error){
            callback('Unable to connect with weather Service!!!' , undefined);
        }else if(body.error){
            callback('Unable to Find location' + undefined);
        }else{
            callback(undefined , {
                temperature: body.currently.temperature,
                status: body.currently.summary,
                rain: body.currently.precipProbability
            })
        }
    })
}
module.exports = forecast;