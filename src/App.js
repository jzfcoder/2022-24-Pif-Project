import './App.css';
import 'leaflet/dist/leaflet.css';

import Map from './components/Map';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {

    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
            <div className="App-header">
                <h1 style={{margin: "0px"}}>FoodLine</h1>
                <p>Food at your convenience</p>
                {/* <button style={{fontSize: "20px"}}>donate</button> */}
            </div>
            <Map />
       </>
    );
}

export default App;
