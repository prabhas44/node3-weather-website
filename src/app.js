

const express = require('express');
const res = require('express/lib/response');
const path = require('path')  


const app = express();
const port = process.env.PORT  || 3000




const hbs = require('hbs')

const geocode = require('../mapboxuse.js')

const forecast = require('../weatheruse.js')

const viewsPath = path.join(__dirname,'../template')

const partialsPath = path.join(__dirname,'../template/partials')

console.log(partialsPath)

hbs.registerPartials(partialsPath)

app.use(express.static('public'))

app.set('view engine','hbs')

app.set('views',viewsPath)



app.get('/weather',(req,res) =>{

    geocode(req.query.address,(err,{latitude,longitude,location}={}) =>{
        if(err){
        return res.send({Error : err})
        }
    
        else{
        
    
        forecast(latitude,longitude,(err,forecastData)=>{
            if(err){
            return res.send({Error : err})
            }
    
                return res.send({forecast :  forecastData , 
                                   address : req.query.address })
           
        
        })
    
    }
    })
    
    })
    

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Prabhas Thakur'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Prabhas Thakur'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText : 'This is some helpful text',
        name : 'Prabhas Thakur'
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title : '404',
        name : 'Prabhas Thakur',
        errorMessage : 'Help article not found'

    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title : '404',
        name : 'Andrew Mead',
        errorMessage : 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up for listen on port no' +port)
})