import { useEffect, useState } from 'react';
import { MapContainer, Polyline } from 'react-leaflet';
import './App.css';

import 'leaflet/dist/leaflet.css';
import Form from './Components/Form'
import LocMarker from './Components/LocMarker'

import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

const API = 'AIzaSyBusxHcpEoQcfEM7s-G_-B2foAnnnER1Cw'

function App() {
  const center = [58.0282336, 38.8476556]

  const [marks, setMarks] = useState([]);


  useEffect(() => {
    document.getElementsByClassName('leaflet-marker-pane')[0].style.transform = 'translate(-13px, -40px)'
  }, [marks])

  const route = (marks) => {
    return marks.map((obj) => [obj.lat, obj.lng])
  }
  return (
    <>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <ReactLeafletGoogleLayer apiKey={API} type={'roadmap'} />
        {marks.map((obj, i) => (
          <div key={i}>
            <LocMarker position={[obj.lat, obj.lng]} setMarks={setMarks} name={obj.name} index={i} markerList={marks} />
          </div>
        ))}
        {marks.length > 1 ? <Polyline positions={route(marks)} color={'#70c7f2'} /> : null}
        <Form marks={marks} setMarks={setMarks} />
      </MapContainer>

    </>
  );
}

export default App;
