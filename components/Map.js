import { useState } from 'react';
import Map,{ Marker, Popup, NavigationControl } from 'react-map-gl';
import {getCenter} from "geolib";

function Maps({ searchResults }){

    const [selectedlocation, setselectedLocation] = useState({});

    // trasnform search result object into latitude and longitude

    const coordinates = searchResults.map( (result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);

    const [viewPort, setviewPort ] = useState({
        width: "100vw",
        heigth:"100vh",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom:11,
    }
    )

    return(
        <Map
            mapStyle={"mapbox://styles/ulisess96/cl9xd3cl9000014mgqmiz72na"}
            mapboxAccessToken={process.env.mapbox_key}
            {...viewPort}
            onMove={({viewPort}) => setviewPort(viewPort)}
        >
            <NavigationControl />
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        key={result.long}
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                        anchor={"center"}
                        pitchAlignment="auto"

                    >
                        <p
                            role={"img"}
                            onClick={() => setselectedLocation(result)}
                            className='cursor-pointer text-2xl animate-bounce'
                            aria-label='push-pin'
                        >
                            📌
                        </p>
 
                        {selectedlocation.long === result.long ? (
                            <Popup
                                onClose={() => setselectedLocation({})}
                                closeOnClick={true}
                                latitude={result.lat}
                                longitude={result.long}
                            >
                                {result.title}
                            </Popup>
                        ): false }

                    </Marker>
                </div>
            ))}
        </Map>
    )
}

export default Maps;

