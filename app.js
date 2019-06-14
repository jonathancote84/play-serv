const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

const playstore = require('./playstore');

app.get('/apps', (req, res) => {
    const { genres="", sort } = req.query;

// sort in query 
    if(sort) {
        // if not rating or app in sort 
        if(!['rating','app'].includes(sort)) {
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
        .filter(playstore => 
            playstore
                .Genres
                .toLowerCase()
                .includes(search.toLowerCase()))

    if(sort !== "") {
        results.sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
    }
  
    res 
        .json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});