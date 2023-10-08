import { useState, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Map(props)
{
    const [selectedImg, setSelectedImg] = useState('https://google.com');
    const [isOpen, setIsOpen] = useState(false);
    const locations = props.locations;
    const mapRef = useRef();
    
    const handleImgClick = (e) => {
        if(e.target.id === 'small')
        {
            setIsOpen(true);
            setSelectedImg(e.target.src);
        }
        else
        {
            setIsOpen(false);
        }
    }

    const updateZoom = (e) => {
        e.preventDefault();
        console.log(mapRef);
        mapRef.fitBounds(locations.map(function(val) {return val.slice(0, -1);}));
    }

    return (
        <>
            <button onClick={updateZoom}>update zoom</button>
            <p>{locations}</p>
            <div onClick={handleImgClick}>
                <div className={isOpen ? 'popup' : 'hidden'} name='popup' id='popup'>
                    <img src={selectedImg} alt='big' className='popupImg' />
                </div>
                <MapContainer
                    scrollWheelZoom={true}
                    style={{ height: '60vh', width: '100wh' }}
                    bounds={locations.map(function(val) {return val.slice(0, -1);})}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />

                    {
                        locations.map((location) => {
                            return(
                                <Marker position={location} key={location[2]}>
                                    <Popup>
                                        <span>{location[2]}'s House <br/> [Street Address Here] <br /> {location[0]}, {location[1]}</span>
                                        <img style={{width: '100%', objectFit: 'contain', cursor: 'pointer'}} src='http://192.168.86.28/image/jpeg.cgi' alt="img" id='small'/>
                                    </Popup>
                                </Marker>
                            );
                        })
                    }
                </MapContainer>
            </div>
        </>
    );
}

export default Map;