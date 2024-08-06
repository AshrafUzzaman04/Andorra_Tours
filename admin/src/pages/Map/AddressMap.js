import React, { useEffect,useState,useRef,useCallback } from 'react'
import { GoogleMap, useJsApiLoader, useLoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption,ComboboxOptionText,} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
const AddressMap = ({AddressHandle,latlang}) => {
    const mapsRef = useRef()
    const [markers,setMarkers] = useState({})
    const [center,setCenter] = useState({lat:47.516232,lng:14.550072})
    const libraries = ["places"]
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyBy6i0pZBTIjP_02fR-YC2Tq0yA8nXp6aM",
        libraries
    })
    
    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }
    
    const {ready,value, suggestions: {status, data} ,setValue,clearSuggestions} = usePlacesAutocomplete({
        requestOptions:{
            location:{lat: ()=> 47.516232,lng:()=> 14.550072},
            radius: 200 * 1000,
        }
    })
    const onMapLoad = useCallback((map)=>{
        mapsRef.current = map
    },[]);
    const panTo = useCallback(({lat,lng})=>{
        mapsRef.current.panTo({lat,lng})
        mapsRef.current.setZoom(10)
    },[])

    const mapContainerStyle = {
        width: "100%",
        height: "500px"
    }
    // const AddressHandle = (event) =>{setMarkers({lat: event.latLng.lat(),lng: event.latLng.lng()})}
    if(loadError)return "Error loading maps"
    if(!isLoaded)return "Loading Maps"
    

     
    
   
  return(
    <>
    <div className=" card" >
                <div className=' card-header pb-0' >
                <div className='container-fluid p-0 z-index-3' >
                        <div className='row z-index-3' >
                            <div className='col-md-3 mb-2 z-index-3' >
                            <Combobox 
                            onSelect={ async (address)=>{
                                setValue(address,false)
                                clearSuggestions()
                                try{
                                    const results = await getGeocode({address})
                                    const {lat,lng} = await getLatLng(results[0])
                                    setMarkers({lat,lng})
                                    panTo({lat,lng})
                                }catch{

                                }
                            }} >
                                <ComboboxInput
                                value={value} 
                                onChange={(e)=>{setValue(e.target.value)}}
                                // disabled={!ready}
                                placeholder="Search"
                                className=" form-control"
                                />
                                <ComboboxPopover>
                                <ComboboxList>
                                    {data.map(({id,place_id, description})=>(
                                        
                                        <ComboboxOption key={place_id} value={description} />
                                        
                                    )) }
                                </ComboboxList>
                                </ComboboxPopover>
                            </Combobox>
                            </div>
                        </div>
                    </div>
                </div>
            <div className=" card-body" >
            <div style={{ height: "550px", width: "100%" }} className="" >
                <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={7}
                        center={center}
                        options={options}
                        onClick={(event)=>AddressHandle(event)}
                        onLoad={onMapLoad}
                    >
                    {markers ? <Marker position={{ lat: parseFloat(latlang?.latitude), lng: parseFloat(latlang?.longitude) }} />:<></>}
                </GoogleMap>
            </div>
        </div>
    </div>
        
    </>
  )
}

export default AddressMap