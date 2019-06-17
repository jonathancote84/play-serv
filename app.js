const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

const playstore = require('./playstore');

app.get('/apps', (req, res) => {
    const { genres="", order  } = req.query;

// sort in query 
    if(order) {
        // if not rating or app in sort 
        if(!['Rating','App'].includes(order)) {
            return res 
                .status(400)
                .send( 'Sort must be rating or app' );
        }
    }

    if(genres) {
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)) {
            return res 
                .status(400)
                .send('Genre must be from list.');
        }
    }
    
    let results = playstore
            .filter(movie => movie
                .Genres
                .toLowerCase()
                .includes(genres.toLowerCase()));
                

        // .filter(playstore => 
        //     playstore
        //         .Genres
        //         .toLowerCase()
        //         filter has to have boolean 


    if(order) {
        results.sort((a, b) => a[order] > b[order] ? 1 : a[order] < b[order] ? -1 : 0) 

    }
    res 
        .json(results);
});



module.exports = app;
