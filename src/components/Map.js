import { useState } from 'react';
import render from 'react-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Map()
{
    const noah = [37.358266890525876, -121.96525098921404, 'Noah'];
    const ryan = [37.335183304628565, -121.96910427572426, 'Ryan'];
    const aidan = [37.3329298491937, -121.97470311805132, 'Aidan'];
    const bien = [37.33785314629252, -121.97825565410065, 'Bien'];
    const wow = [37.36602690431823, -121.97862577386812, 'wow'];

    const [locationState, setLocationState] = useState(
        [
            noah,
            ryan,
            aidan,
            bien
        ]
    );

    let deg_south_avg = 0;
    let deg_east_avg = 0;
    let smin = locationState[0][0];
    let emin = locationState[1][1];
    let smax = locationState[0][0];
    let emax = locationState[1][1];

    locationState.forEach((location) => {
        const s = location[0];
        const e = location[1];
        deg_south_avg += s;
        deg_east_avg += e;

        smin = s < smin ? s : smin;
        emin = e < emin ? e : emin;

        smax = s > smax ? s : smax;
        emax = e > emax ? e : emax;
    })
   
    deg_south_avg = deg_south_avg / locationState.length;
    deg_east_avg = deg_east_avg / locationState.length;

    const position = [deg_south_avg, deg_east_avg];
    const zoom = 1 / (2.5 * Math.sqrt(((smax - smin) ** 2) + ((emax - emin) ** 2)));
    
    console.log(zoom);

    return (
        <>
            <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: '70vh', width: '100wh' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />

                {
                    locationState.map((location) => {
                        return(
                            <Marker position={location} key={location[3]}>
                                <Popup>
                                    <span>{location[2]}'s House <br/> {location[0]}, {location[1]}</span>
                                </Popup>
                            </Marker>
                        );
                    })
                }
            </MapContainer>
        </>
    );
}

export default Map;