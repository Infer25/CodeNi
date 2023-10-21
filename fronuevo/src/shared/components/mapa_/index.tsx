

import { useEffect } from 'react';
import { FormContainer } from "../Frm";


const Mapa = () => {

    
    useEffect(() => {


        const script_ = document.createElement('script');
        script_.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script_.async = true;
        document.body.appendChild(script_);

        const script = document.createElement('script');
        script.src = '../../../../src/shared/components/mapa_/script.js';
        script.async = true;
        document.body.appendChild(script);
    

        return () => {
            document.body.removeChild(script_);
          document.body.removeChild(script);
        };


      }, []);
  return (
    <FormContainer>
   
    <div id="categoriaCheckboxes">
      <label><input type="checkbox" id="geojsonCheckbox" value="opcion1"/>Granos basicos</label>
      <label><input type="checkbox" id="suelos" value="opcion2"/> Suelo</label>
      <label><input type="checkbox" id="geointu" value="opcion3"/> Instituciones</label>
    </div>
    <div id={"map"} style={{height:'100%'}}></div>
    
  

    </FormContainer>
  );
};

export default Mapa;
/*
<div id="categoriaCheckboxes">
<label><input type="checkbox" id="geojsonCheckbox" value="opcion1">Granos basicos</label>
<label><input type="checkbox" id="suelos" value="opcion2"> Suelo</label>
<label><input type="checkbox" id="geointu" value="opcion3"> Instituciones</label>
</div>
<div id="map" style="height: 60vh;" ></div>*/
