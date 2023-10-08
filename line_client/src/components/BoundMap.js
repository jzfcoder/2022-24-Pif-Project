import React, { useState, useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function BoundMap(props) {
  const Content = () => {
    const map = useMap();

    useEffect(() => {
      const temp = [];
      props.locations.forEach(location => {
        temp.push([location.latlong[0], location.latlong[1]]);
      });

      map.fitBounds(temp);
    }, []);

    return (
      <>
      </>
    );
  };
  const [selectedImg, setSelectedImg] = useState('https://google.com');
  const [isOpen, setIsOpen] = useState(false);

  const handleImgClick = (e) => {
    if (e.target.id === 'small') {
      setIsOpen(true);
      setSelectedImg(e.target.src);
    }
    else {
      setIsOpen(false);
    }
  }

  return (
    <div onClick={handleImgClick}>
      <div className={isOpen ? 'popup' : 'hidden'} name='popup' id='popup'>
        <img src={selectedImg} alt='big' className='popupImg' />
      </div>
      <MapContainer
        scrollWheelZoom={false}
        doubleClickZoom={false}
        // zoom={5}
        center={[52.3555, 1.1743]}
        style={{ height: "65vh", width: "100wh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          props.locations.map((location) => {
            // console.log(props.locations.length);
            return (
              <Marker position={location.latlong} key={location.id}>
                <Popup>
                  <span>{location.name} <br /> {location.address} </span>
                  <img style={{ width: '100%', objectFit: 'contain', cursor: 'pointer' }} src={location.image} alt="img" id='small' />
                </Popup>
              </Marker>
            );
          })
        }

        <Content />
      </MapContainer>
    </div>
  );
}