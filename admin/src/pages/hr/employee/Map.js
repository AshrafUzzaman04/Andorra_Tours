
import React, { useEffect,useState,useRef,useCallback } from 'react'
import { GoogleMap, useJsApiLoader, useLoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import { Country, State, City }  from 'country-state-city';
import IconMaps from "../../../assets/images/IconMaps.png"
import { ComboboxPopover } from '@reach/combobox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mapContainerStyle = {
    width: "100%",
    height: "500px"
}
  const center = {
    lat: 51.991879,
    lng: 51.991879
  };

const Map = ({info,area}) => {
    const { t } = useTranslation();
    const [value,setValue] = useState({lat:'',lng:''})
    const [isLoad,setIsLoad] = useState({})
    const [latlng,setLatLang] = useState("")
    const [markers,setActiveMarkers] = useState(null)
    const [center,setCenter] = useState({lat:47.516232,lng:14.550072})
    const [data,setData] = useState(area)
    const libraries = ["places"]
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyBy6i0pZBTIjP_02fR-YC2Tq0yA8nXp6aM",
        libraries
    })
 
    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }
    useEffect(()=>{
        setData(area)
    },[area])
    const AddressHandle = (event) =>{
        if(event){
            const keys = ["name","email","phone"]
            const SearchData = data?.filter((item)=>keys.some(key => item[key].toLowerCase().includes(event)))
            SearchData.map(user=>{ setData({lat: parseFloat(user.latitute) ,lng: parseFloat(user.longitute)}) })
            setData(SearchData)
            if(data !== undefined)setIsLoad(data)
        }else{
            setData(area)
        }
        
        
    }
    if(loadError)return "Error loading maps"
    if(!isLoaded)return "Loading Maps"
    
return <div style={{ height: `${info?.id !== null ?"auto":"auto"}`, width: "100%" }}>
    {
        info?.id !== undefined ? <div className='container-fluid p-0 mb-3'>
        <div className='row'>
            <div className='col-md-3'>
                <input type="text" className="form-control" onChange={(e)=>AddressHandle(e.target.value)} placeholder={t('name, email, phone')} />
            </div>
        </div>
    </div>:<></>
    }

    {
        area !== undefined ? <div className='container-fluid p-0 mb-3'>
        <div className='row'>
            <div className='col-md-3'>
                <input type="text" className="form-control" onChange={(e)=>AddressHandle(e.target.value)} placeholder={t('name, email, phone')} />
            </div>
        </div>
    </div>:<></>
    }

<GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={7}
    center={center}
    options={options}
    onClick={()=>setActiveMarkers(null)}
    onMouseOver={()=>setActiveMarkers(null)}
>
    {
        info !== undefined &&info?.id !== null ?
        <div style={{ backgroundImage:"linear-gradient(310deg, #a5c212 0%, #1d1d1b 100%)"}}>
            <Marker onMouseOver={()=>setActiveMarkers(info.id)} onClick={()=>setActiveMarkers(info.id)} key={info.id} 
            position={{ lat: parseFloat(info.latitute), lng: parseFloat(info.longitute) }}
            >
            {
            markers === info.id ? <InfoWindow key={info.mobile} position={{ lat: parseFloat(info.latitute), lng: parseFloat(info.longitute) }}>
                    <div>
                        <b>Name: {info.name}</b><br/>
                        <span className='mt-2' >{t('Street')}: {info.street}</span><br/>
                        <span className='mt-2' >{t('phone')}: {info.mobile}</span>
                    </div>
                </InfoWindow>:<></>
            }
            </Marker>
        </div>:<></> 
             
    }

{
        isLoad?.id !== null && data?.map((addres,index)=>(
            <div key={addres.id} style={{ backgroundImage:"linear-gradient(310deg, #a5c212 0%, #1d1d1b 100%)"}}>
                <Marker onMouseOver={()=>setActiveMarkers(addres.id)} onClick={()=>setActiveMarkers(addres.id)} key={addres.id} 
                position={{ lat: parseFloat(addres.latitute), lng: parseFloat(addres.longitute) }}
                >
                    
                {
                    
                markers === addres.id ? <InfoWindow key={addres.phone} position={{ lat: parseFloat(addres.latitute), lng: parseFloat(addres.longitute) }}>
                        <div>
                            <b>Name: {addres.name}</b><br/>
                            <span className='mt-2' ><b>{t('Street')}:</b> {addres.street}</span><br/>
                            <span className='mt-2' ><b>{t('phone')}:</b> <a href={'tel:'+addres.phone} style={{ color:"#0000FF" }} className="text-decoration-underline">{addres.phone}</a></span> <br/>
                            {
                                JSON.parse(addres.contact_person).slice(0,1).map((contact,index)=>{
                                     return<>
                                        <span key={index} className='mt-2' ><b>{t('Contact Person')}:</b> {contact.name}</span> <br/>
                                    </>
                                })
                            }
                            
                            <span className='mt-2' ><NavLink className="text-decoration-underline" style={{ color:"#0000FF" }} to={'/customer-management/customers/' + addres.identity_number+ '/details'} >{t('More')}</NavLink></span>
                        </div>
                    </InfoWindow>:<></>
                    
                }
                </Marker>
            </div>
             
        ))
    }
    
    
    
</GoogleMap>
</div>
    
}

export default React.memo(Map)