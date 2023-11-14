import 'leaflet/dist/leaflet.css';
import BoundMap from './BoundMap';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { Link, useLocation } from 'react-router-dom';
import { useState} from 'react';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

function Result() {
    let inputs = useLocation()
    const initialAddress = inputs.state === null ? '' : inputs.state.address;
    const [parameters, setParameters] = useState({"address": initialAddress, "filters": {"distance": 10}});
    const [locations, setLocations] = useState(
            [{
                latlong: [37.358266890525876, -121.96525098921404],
                address: '[address here]',
                name: 'Noah',
                image: 'http://67.188.236.168:9000/response.jpeg',
                id: 0,
            }]
    );
    const [status, setStatus] = useState('find pantries near you');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("searching...");

        if(parameters.address === '')
        {
            alert("enter an address");
            setStatus("find pantries near you");
            return;
        }

        let x = JSON.stringify({parameters: parameters});
        let response = await fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: x,
        });

        // TODO: STATUS
        let result = await response.json().catch({ status: "not found"});

        if(result.status === "found")
        {
            setLocations(result.locations);
            // mapComponent.setBounds(result.locations.map(function(val) {return val.slice(0, -1);}))
            // console.log(result.locations);
            // const map = this.mapRef.current.leafletElement;
            // map.fitBounds(locations);
            // setBounds(result.locations.map(function(val) {return val.slice(0, -1);}));
        }
        else
        {
            alert("none found with search parameters");
        }

        setStatus("find pantries near you");
    }

    const handleChange = e => {
        e.preventDefault();
        let temp = {
            "address": e.currentTarget.elements.address.value,
            "filters": {
                "distance": isNaN(e.currentTarget.elements.distance.value) ? 10 : e.currentTarget.elements.distance.value,
            }
        };
        setParameters(temp);
    }

    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />

            <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                <h1 style={{margin: '0px'}}>FoodLine</h1>
            </Link>

            <br />
        
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <input type='text' className='homeInput' placeholder='address' id='address' defaultValue={parameters.address} />
                <br />
                <img className='filter' src='https://drive.google.com/uc?export=view&id=1nMjkqHpQhXAdJNkGcFNIkZJcKCWAXHdj' alt=''/>
                <label>distance (mi): </label>
                <input type='text' className='resultParameter' placeholder='distance (mi)' defaultValue={parameters.filters.distance} id='distance' />
                <label>type of food: </label>
                <input type='text' className='resultParameter' placeholder='type of food' id='foodtype' />
                <br />
                <button type='submit' className='homeSubmit'>{status}</button>
                <br />
                {/* <Map locations={locations} ref={mapComponent}/> */}
                <BoundMap locations={locations}/>
            </form>
       </>
    );
}

export default Result;