import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Rectangle, useMap } from 'react-leaflet';

function SetBoundsRectangles() {
    const [bounds, setBounds] = useState(outerBounds)
    const map = useMap()

    const innerHandlers = useMemo(
        () => ({
            click() {
                setBounds(innerBounds)
                map.fitBounds(innerBounds)
            },
        }),
        [map],
    )
    const outerHandlers = useMemo(
        () => ({
            click() {
                setBounds(outerBounds)
                map.fitBounds(outerBounds)
            },
        }),
        [map],
    )

    return (
        <>
            <Rectangle
                bounds={outerBounds}
                eventHandlers={outerHandlers}
                pathOptions={bounds === outerBounds ? redColor : whiteColor}
            />
            <Rectangle
                bounds={innerBounds}
                eventHandlers={innerHandlers}
                pathOptions={bounds === innerBounds ? redColor : whiteColor}
            />
        </>
    )
}

export default SetBoundsRectangles;