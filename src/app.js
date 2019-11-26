const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
const app = express();
const port = process.env.PORT || 3000;

//define path for express config
const publicDirectoryPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname , '../templates/partials');

//setup handlebars engine and views location
app.set('view engine' , 'hbs');//must see the documentation
app.set('views' , viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve up
app.use(express.static(publicDirectoryPath));

app.get('' , (req , res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Waleed Rafi'
    });
})

app.get('/about' , (req , res)=>{
    res.render('about' , {
        title: 'About',
        name: 'Waleed Rafi'
    })
})

app.get('/help' , (req ,  res) => {
    res.render('help' , {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Waleed Rafi'
    })
})

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address , (error , {latitude , longitude , location} = {})=>{//if address is not true server crashed thats why we use default arg {}
        if(error){
            return res.send({error})
        }
        forecast(latitude , longitude , (error , forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});
app.get('/products' , (req , res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})
app.get('/help/*' , (req , res) => {
    res.render('404' , {
        title: '404',
        name: 'Waleed Rafi',
        errorMessage: 'Help article not found!!'
    });
})
app.get('*' , (req , res) => {
    res.render('404' , {
        title: '404',
        name: 'Waleed Rafi',
        errorMessage: 'Page not found'
    });
})

app.listen(port , () => {
    console.log('Server is up on port ' + port);
});