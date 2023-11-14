require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});

app.use(express.static('../line_client/build'));
app.use(express.static('public'));
app.use(express.json());

const downloadLatest = () => {
    var options = {
        'method': 'GET',
        'url': 'http://192.168.86.28/image/jpeg.cgi',
        'headers': {
            'Authorization': 'Basic YWRtaW46amVyZW15'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
    }).pipe(fs.createWriteStream('./public/response.jpeg')).on('close', function() { console.log('downloaded'); });
}

//Here you can add your routes
//Here's an example
app.get('/', (req, res) => {
    console.log('homepage request recieved...');
    req.sendFile('../line_client/build/index.html');
});

app.post('/post', (req, res) => {
    console.log(req.body);
    downloadLatest();
    res.json({
        status: 'found',
        locations: [
            {
                latlong: [37.358266890525876, -121.96525098921404],
                address: '[address here]',
                name: 'Noah',
                image: 'http://67.188.236.168:9000/response.jpeg',
                id: 0,
            },
            {
                latlong: [37.335183304628565, -121.96910427572426],
                address: '[address here]',
                name: 'Ryan',
                image: 'http://67.188.236.168:9000/response.jpeg',
                id: 1,
            },
            {
                latlong: [37.33785314629252, -121.97825565410065],
                address: '[address here]',
                name: 'Bien',
                image: 'http://67.188.236.168:9000/response.jpeg',
                id: 2,
            },
        ]
    });
});



downloadLatest();