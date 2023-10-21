
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */

if( typeof mymap === "undefined" ) {

const mymap =L.map('map');

// Añade un mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// eslint-disable-next-line no-undef
}).addTo(mymap);

// Obtiene la ubicación actual del usuario (solicita permiso)
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat1 = position.coords.latitude;
        let lon1 = position.coords.longitude;

        // Centra el mapa en la ubicación actual del usuario
        mymap.setView([lat1, lon1], 7);

        // Crea un marcador en la ubicación actual
        L.marker([lat1, lon1]).addTo(mymap)
            .bindPopup('Tu ubicación actual')
            .openPopup();
    });

} else {
    console.log("Geolocalización no está disponible en este navegador.");
}

//crear la separacion de los departamentos
let geojsonCheckbox = document.getElementById('geojsonCheckbox');

// Declarar la letiable para la capa GeoJSON
let geojsonLayer;

// Agregar el control personalizado
let checkboxControl = L.control({
    position: 'topright'
});

// Manejar el evento change del checkbox
geojsonCheckbox.addEventListener('change', function () {
    if (geojsonCheckbox.checked) {
        // Si el checkbox está marcado, cargar y agregar la capa GeoJSON al mapa
        fetch('../../../../src/shared/components/mapa_/departamentos.geojson')
            .then(response => response.json())
            .then(data => {
                let departamentos = data;
                geojsonLayer = L.geoJSON(departamentos, {

                });
                geojsonLayer.setStyle({ fillColor: 'white', fillOpacity: 0 }).addTo(mymap);
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

        checkboxControl.onAdd = function () {
            let div = L.DomUtil.create('div', 'leaflet-control');
            div.innerHTML = `
       <div style="background-color: white; border: 1px solid black;">
            <div style="margin: 10px;"> 
        <h4 style="margin-bottom: 10px;">Tipos:</h4> 
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion1"> Arroz Secano</label><br> 
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion4"> Maiz</label><br>
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion2"> Frijol Rojo</label><br> 
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion3"> Sorgo Rojo</label><br> 
    </div>
        </div>
    `;
            return div;
        };
        checkboxControl.addTo(mymap);
        //Conseguir coordenas aleatorias dentro del poligono
        function getRandomPosition(center, bounds) {
            let latSpan = bounds._northEast.lat - bounds._southWest.lat;
            let lngSpan = bounds._northEast.lng - bounds._southWest.lng;

            let lat = center.lat - latSpan / 16 + Math.random() * latSpan / 8;
            let lng = center.lng - lngSpan / 16 + Math.random() * lngSpan / 8;

            return L.latLng(lat, lng);
        }

        // Agregar el evento de cambio al checkbox "Sorgo Rojo"
        let sorgoRojoCheckbox = document.getElementById('opcion3');
        let nombres = ["Chinandega", "León", "Estelí", "Matagalpa", "Managua", "Masaya", "Carazo", "Granada", "Rivas", "Madriz", "Nueva Segovia"];
        let sorgo = [];

        sorgoRojoCheckbox.addEventListener('change', function () {
            if (sorgoRojoCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad = layer.feature.properties.name;
                        if (nombres.includes(nombreEntidad)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: '../../../../src/assets/sorgo.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            sorgo.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                sorgo.forEach(function (punto) {
                    mymap.removeLayer(punto);
                });
                // Vaciar el array
                sorgo = [];
            }
        });

        // Agregar el evento de cambio al checkbox "frijol"
        let frijolCheckbox = document.getElementById('opcion2');
        let nombres1 = ["Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada", "Jinotega", "León", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "Río San Juan", "Rivas", "RAAN", "RAAS"];
        let frijol = [];

        frijolCheckbox.addEventListener('change', function () {
            if (frijolCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad1 = layer.feature.properties.name;
                        if (nombres1.includes(nombreEntidad1)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: '../../../../src/assets/bean.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            frijol.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                frijol.forEach(function (punto2) {
                    mymap.removeLayer(punto2);
                });
                // Vaciar el array
                frijol = [];
            }
        });

        // Agregar el evento de cambio al checkbox "Arroz"
        let arrozCheckbox = document.getElementById('opcion1');
        let nombres2 = ["Chinandega", "León", "Granada", "Masaya", "Rivas", "Río San Juan", "Matagalpa", "Nueva Segovia", "Jinotega", "RAAN", "RAAS"];
        let arroz = [];

        arrozCheckbox.addEventListener('change', function () {
            if (arrozCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad2 = layer.feature.properties.name;
                        if (nombres2.includes(nombreEntidad2)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: '../../../../src/assets/grano.svg',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            arroz.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                arroz.forEach(function (punto3) {
                    mymap.removeLayer(punto3);
                });
                // Vaciar el array
                arroz = [];
            }
        });

        // Agregar el evento de cambio al checkbox "Maiz"
        let maizCheckbox = document.getElementById('opcion4');
        let nombres3 = ["Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada", "Jinotega", "León", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "RAAN", "RAAS", "Río San Juan", "Rivas"];
        let maiz = [];

        maizCheckbox.addEventListener('change', function () {
            if (maizCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad3 = layer.feature.properties.name;
                        if (nombres3.includes(nombreEntidad3)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: '../../../../src/assets/corn.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            maiz.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                maiz.forEach(function (punto4) {
                    mymap.removeLayer(punto4);
                });
                // Vaciar el array
                maiz = [];
            }
        });

    } else {
        // Si el checkbox no está marcado, quitar la capa GeoJSON del mapa (si existe)
        if (geojsonLayer) {
            mymap.removeLayer(geojsonLayer);
        }
        if (checkboxControl) {
            mymap.removeControl(checkboxControl);
        }
    }
});

// Crea y agrega un marcador con los datos de la base de datos
let geojsonCheckbox2 = document.getElementById('geointu');
let inti = [];

geojsonCheckbox2.addEventListener('change', function () {
    if (geojsonCheckbox2.checked) {

        fetch('/api/markers')
            .then((response) => response.json())
            .then((data) => {
                console.log('Datos de marcadores obtenidos:', data);
                data.forEach(function (marker) {
                    let coords = marker.coordenadas.match(/POINT\(([^ ]+) ([^)]+)\)/);
                    if (coords && coords.length === 3) {
                        let lat = parseFloat(coords[1]);
                        let lon = parseFloat(coords[2]);
                        let nombre = marker.nombre;

                        // Crea y agrega un marcador con las coordenadas
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        let intitu = L.marker([lat, lon]).addTo(mymap)
                            .bindPopup(nombre)
                            .openPopup();

                    }
                    inti.push(intitu);
                });

            })
            .catch((err) => {
                console.error('Error al obtener los datos de los marcadores: ' + err.stack);
            });
    } else {
        inti.forEach(function (punto1) {
            mymap.removeLayer(punto1);
        });
        // Vaciar el array después de eliminar los puntos
        inti = [];

    }
});


//Crear capa para el tipo de suelo
let geosuelo = document.getElementById('suelos');

// Declarar la letiable para la capa GeoJSON
let suelolayer;

// Agregar el control personalizado
let checkboxsu = L.control({
    position: 'topright'
});
let checkboxph = L.control({
    position: 'bottomleft'
});
let checkboxzc = L.control({
    position: 'bottomleft'
});

function openPopup(layer, properties) {
    if (properties.name === 'Chontales') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Mollisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.5-0.9%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.7%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a alta</b><br>
            <li>Suelos Ultisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.7%</li>
                    <li>Nivel de fósforo (P): 0.1-0.4%</li>
                    <li>Nivel de potasio (K): 0.2-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a media</b><br>
        </ul>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Boaco') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Mollisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.4-0.8%</li>
                    <li>Nivel de fósforo (P): 0.3-0.6%</li>
                    <li>Nivel de potasio (K): 0.4-0.7%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a alta</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'León') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Vertisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.6-1%</li>
                    <li>Nivel de fósforo (P): 0.3-0.7%</li>
                    <li>Nivel de potasio (K): 0.5-0.9%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Chinandega') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Vertisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.6-1%</li>
                    <li>Nivel de fósforo (P): 0.4-0.8%</li>
                    <li>Nivel de potasio (K): 0.5-0.9%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>
            <li>Suelos Entisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.7%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>
        </ul>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Madriz') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Entisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.6%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Nueva Segovia') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Entisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.6%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Río San Juan') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Inceptisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.2-0.5%</li>
                    <li>Nivel de fósforo (P): 0.1-0.4%</li>
                    <li>Nivel de potasio (K): 0.2-0.5%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Muy baja a alta</b><br>
            <li>Suelos Oxisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.1-0.3%</li>
                    <li>Nivel de fósforo (P): 0.1-0.3%</li>
                    <li>Nivel de potasio (K): 0.1-0.4%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Muy baja</b><br>
        </ul>
        <li>Suelos Histosoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.7%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.4-0.8%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a alta</b><br>
        </ul>`;
        layer.bindPopup(popupContent).openPopup();
    }
}

// Manejar el evento change del checkbox
geosuelo.addEventListener('change', function () {
    if (geosuelo.checked) {
        // Si el checkbox está marcado, cargar y agregar la capa GeoJSON al mapa
        fetch('../../../../src/shared/components/mapa_/departamentos.geojson')
            .then(response => response.json())
            .then(data => {
                let suelos = data;
                suelolayer = L.geoJSON(suelos, {
                    onEachFeature: function (feature, layer) {
                        // Agregar eventos de mouseover y mouseout a cada división
                        layer.on({
                            click: function (e) {
                                let layer = e.target;
                                // Elelet la división con una transformación CSS cuando el mouse entra
                                layer.getElement().style.transform = 'translateY(-10px)';
                                if (layer.isPopupOpen()) {
                                    closePopup(layer); // Si ya está abierto, cierra el popup al hacer clic en el polígono
                                } else {
                                    openPopup(layer, feature.properties); // Si está cerrado, abre el popup al hacer clic en el polígono
                                }
                            },
                            mouseout: function (e) {
                                let layer = e.target;
                                // Restaurar la transformación cuando el mouse sale
                                layer.getElement().style.transform = 'translateY(0)';
                            }
                        });
                    }
                });
                suelolayer.setStyle({ fillColor: 'white', fillOpacity: 0 }).addTo(mymap);
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

        checkboxsu.onAdd = function () {
            let div1 = L.DomUtil.create('div', 'leaflet-control');
            div1.innerHTML = `
        <div style="background-color: white; border: 1px solid black;">
            <div style="margin: 10px;"> 
                <h4 style="margin-bottom: 10px;">Tipos:</h4>  
                <label style="margin-right: 10px;"><input type="checkbox" id="zona"> Zona climatica</label><br> 
                <label style="margin-right: 10px;"><input type="checkbox" id="ph"> PH</label><br> 
            </div>
        </div> 
    `;
            return div1;
        };
        checkboxsu.addTo(mymap);

        // Agregar el evento de cambio al checkbox "PH"
        let phCheckbox = document.getElementById('ph');
        let fuerte = ["RAAN", "RAAS"];
        let neutros = ["León", "Managua", "Masaya", "Granada", "Carazo"];
        let medios = ["Boaco", "Chinandega", "Chontales", "Estelí", "Jinotega", "Madriz", "Matagalpa", "Nueva Segovia", "Río San Juan", "Rivas"];


        phCheckbox.addEventListener('change', function () {
            if (phCheckbox.checked) {
                checkboxph.onAdd = function () {
                    let div1 = L.DomUtil.create('div', 'leaflet-control');
                    div1.innerHTML = `
     <div style="background-color: white; border: 1px solid black;">
    <div style="margin: 10px;">
        <h4 style="margin-bottom: 10px;">Explicación:</h4>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: yellow; margin-right: 5px;"></div> 4.5 - 5, Muy fuerte ácido
        </div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: green; margin-right: 5px;"></div>5.6 - 6,Medianamente ácido </div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: gray; margin-right: 5px;"></div>6.6 - 7.3, Neutro
        </div>
    </div>
</div>

    `;
                    return div1;
                };
                checkboxph.addTo(mymap);
                // Valores fuertes
                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad = layer.feature.properties.name;
                        if (fuerte.includes(nombreEntidad)) {
                            layer.setStyle({ fillColor: 'yellow', fillOpacity: 0.4 });
                        } else if (medios.includes(nombreEntidad)) {
                            layer.setStyle({ fillColor: 'green', fillOpacity: 0.4 });
                        } else if (neutros.includes(nombreEntidad)) {
                            layer.setStyle({ fillColor: 'gray', fillOpacity: 0.4 });
                        }
                    });
                }
            } else {

                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        layer.setStyle({ fillColor: 'white', fillOpacity: 0 });
                    });
                } if (checkboxph) {
                    mymap.removeControl(checkboxph);
                }
            }
        });

        // Agregar el evento de cambio al checkbox "zonas climaticas"
        let zcCheckbox = document.getElementById('zona');
        let seco = ["Managua", "Madriz", "Estelí", "León", "Carazo"];
        let semi = ["Boaco", "Chinandega", "Chontales", "Granada", "Jinotega", "Masaya", "Matagalpa", "Nueva Segovia", "Río San Juan", "Rivas"];
        let humeda = ["RAAN", "RAAS"];


        zcCheckbox.addEventListener('change', function () {
            if (zcCheckbox.checked) {
                checkboxzc.onAdd = function () {
                    let div2 = L.DomUtil.create('div', 'leaflet-control');
                    div2.innerHTML = `
     <div style="background-color: white; border: 1px solid black;">
    <div style="margin: 10px;">
        <h4 style="margin-bottom: 10px;">Explicación:</h4>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: gray; margin-right: 5px;"></div>Zona seca: 1,200 mm/anuales</div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: green; margin-right: 5px;"></div>Zona subhumeda: 1,2000 a 2,000 mm/anuales</div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: blue; margin-right: 5px;"></div>Zona Humeda: 2,000 y 3,500 mm/anuales</div>
    </div>
</div>

    `;
                    return div2;
                };
                checkboxzc.addTo(mymap);
                // Valores del clima
                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        let nombreEntidad = layer.feature.properties.name;
                        if (humeda.includes(nombreEntidad)) {

                            layer.setStyle({ fillColor: 'blue', fillOpacity: 0.4 });
                        } else if (seco.includes(nombreEntidad)) {

                            layer.setStyle({ fillColor: 'gray', fillOpacity: 0.4 });
                        } else if (semi.includes(nombreEntidad)) {

                            layer.setStyle({ fillColor: 'green', fillOpacity: 0.4 });
                        }
                    });
                }
            } else {

                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        layer.setStyle({ fillColor: 'white', fillOpacity: 0 });
                    });
                } if (checkboxzc) {
                    mymap.removeControl(checkboxzc);
                }
            }
        });
    } else {
        // Si el checkbox no está marcado, quitar la capa GeoJSON del mapa (si existe)
        if (suelolayer) {
            mymap.removeLayer(suelolayer);
        }
        if (checkboxsu) {
            mymap.removeControl(checkboxsu);
        }
    }
});



}else{
  
// Obtiene la ubicación actual del usuario (solicita permiso)
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat1 = position.coords.latitude;
        let lon1 = position.coords.longitude;

        // Centra el mapa en la ubicación actual del usuario
        mymap.setView([lat1, lon1], 7);

        // Crea un marcador en la ubicación actual
        L.marker([lat1, lon1]).addTo(mymap)
            .bindPopup('Tu ubicación actual')
            .openPopup();
    });

} else {
    console.log("Geolocalización no está disponible en este navegador.");
}

//crear la separacion de los departamentos
let geojsonCheckbox = document.getElementById('geojsonCheckbox');

// Declarar la letiable para la capa GeoJSON
let geojsonLayer;

// Agregar el control personalizado
let checkboxControl = L.control({
    position: 'topright'
});

// Manejar el evento change del checkbox
geojsonCheckbox.addEventListener('change', function () {
    if (geojsonCheckbox.checked) {
        // Si el checkbox está marcado, cargar y agregar la capa GeoJSON al mapa
        fetch('../../../../src/shared/components/mapa_/departamentos.geojson')
            .then(response => response.json())
            .then(data => {
                let departamentos = data;
                geojsonLayer = L.geoJSON(departamentos, {

                });
                geojsonLayer.setStyle({ fillColor: 'white', fillOpacity: 0 }).addTo(mymap);
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

        checkboxControl.onAdd = function () {
            let div = L.DomUtil.create('div', 'leaflet-control');
            div.innerHTML = `
       <div style="background-color: white; border: 1px solid black;">
            <div style="margin: 10px;"> 
        <h4 style="margin-bottom: 10px;">Tipos:</h4> 
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion1"> Arroz Secano</label><br> 
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion4"> Maiz</label><br>
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion2"> Frijol Rojo</label><br> 
        <label style="margin-right: 10px;"><input type="checkbox" id="opcion3"> Sorgo Rojo</label><br> 
    </div>
        </div>
    `;
            return div;
        };
        checkboxControl.addTo(mymap);
        //Conseguir coordenas aleatorias dentro del poligono
        function getRandomPosition(center, bounds) {
            let latSpan = bounds._northEast.lat - bounds._southWest.lat;
            let lngSpan = bounds._northEast.lng - bounds._southWest.lng;

            let lat = center.lat - latSpan / 16 + Math.random() * latSpan / 8;
            let lng = center.lng - lngSpan / 16 + Math.random() * lngSpan / 8;

            return L.latLng(lat, lng);
        }

        // Agregar el evento de cambio al checkbox "Sorgo Rojo"
        let sorgoRojoCheckbox = document.getElementById('opcion3');
        let nombres = ["Chinandega", "León", "Estelí", "Matagalpa", "Managua", "Masaya", "Carazo", "Granada", "Rivas", "Madriz", "Nueva Segovia"];
        let sorgo = [];

        sorgoRojoCheckbox.addEventListener('change', function () {
            if (sorgoRojoCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad = layer.feature.properties.name;
                        if (nombres.includes(nombreEntidad)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: 'iconos/sorgo.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            sorgo.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                sorgo.forEach(function (punto) {
                    mymap.removeLayer(punto);
                });
                // Vaciar el array
                sorgo = [];
            }
        });

        // Agregar el evento de cambio al checkbox "frijol"
        let frijolCheckbox = document.getElementById('opcion2');
        let nombres1 = ["Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada", "Jinotega", "León", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "Río San Juan", "Rivas", "RAAN", "RAAS"];
        let frijol = [];

        frijolCheckbox.addEventListener('change', function () {
            if (frijolCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad1 = layer.feature.properties.name;
                        if (nombres1.includes(nombreEntidad1)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: '../../../../src/assets/bean.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            frijol.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                frijol.forEach(function (punto2) {
                    mymap.removeLayer(punto2);
                });
                // Vaciar el array
                frijol = [];
            }
        });

        // Agregar el evento de cambio al checkbox "Arroz"
        let arrozCheckbox = document.getElementById('opcion1');
        let nombres2 = ["Chinandega", "León", "Granada", "Masaya", "Rivas", "Río San Juan", "Matagalpa", "Nueva Segovia", "Jinotega", "RAAN", "RAAS"];
        let arroz = [];

        arrozCheckbox.addEventListener('change', function () {
            if (arrozCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad2 = layer.feature.properties.name;
                        if (nombres2.includes(nombreEntidad2)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: 'iconos/rice.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            arroz.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                arroz.forEach(function (punto3) {
                    mymap.removeLayer(punto3);
                });
                // Vaciar el array
                arroz = [];
            }
        });

        // Agregar el evento de cambio al checkbox "Maiz"
        let maizCheckbox = document.getElementById('opcion4');
        let nombres3 = ["Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada", "Jinotega", "León", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "RAAN", "RAAS", "Río San Juan", "Rivas"];
        let maiz = [];

        maizCheckbox.addEventListener('change', function () {
            if (maizCheckbox.checked) {
                // Agregar un punto en el centro del polígono
                if (geojsonLayer) {
                    geojsonLayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad3 = layer.feature.properties.name;
                        if (nombres3.includes(nombreEntidad3)) {
                            // Obtener el centro del polígono
                            let center = layer.getBounds().getCenter();
                            let bounds = layer.getBounds();
                            // Obtener una posición aleatoria cercana al centro
                            let randomPosition = getRandomPosition(center, bounds);
                            // Agregar un marcador
                            let marker = L.marker(randomPosition, {
                                icon: L.icon({
                                    iconUrl: 'iconos/corn.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    shadowSize: [41, 41]
                                })
                            }).addTo(mymap);
                            maiz.push(marker);
                        }
                    });
                }
            } else {
                // eliminar el marcador
                maiz.forEach(function (punto4) {
                    mymap.removeLayer(punto4);
                });
                // Vaciar el array
                maiz = [];
            }
        });

    } else {
        // Si el checkbox no está marcado, quitar la capa GeoJSON del mapa (si existe)
        if (geojsonLayer) {
            mymap.removeLayer(geojsonLayer);
        }
        if (checkboxControl) {
            mymap.removeControl(checkboxControl);
        }
    }
});

// Crea y agrega un marcador con los datos de la base de datos
let geojsonCheckbox2 = document.getElementById('geointu');
let inti = [];

geojsonCheckbox2.addEventListener('change', function () {
    if (geojsonCheckbox2.checked) {

        fetch('/api/markers')
            .then((response) => response.json())
            .then((data) => {
                console.log('Datos de marcadores obtenidos:', data);
                data.forEach(function (marker) {
                    let coords = marker.coordenadas.match(/POINT\(([^ ]+) ([^)]+)\)/);
                    if (coords && coords.length === 3) {
                        let lat = parseFloat(coords[1]);
                        let lon = parseFloat(coords[2]);
                        let nombre = marker.nombre;

                        // Crea y agrega un marcador con las coordenadas
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        let intitu = L.marker([lat, lon]).addTo(mymap)
                            .bindPopup(nombre)
                            .openPopup();

                    }
                    inti.push(intitu);
                });

            })
            .catch((err) => {
                console.error('Error al obtener los datos de los marcadores: ' + err.stack);
            });
    } else {
        inti.forEach(function (punto1) {
            mymap.removeLayer(punto1);
        });
        // Vaciar el array después de eliminar los puntos
        inti = [];

    }
});


//Crear capa para el tipo de suelo
let geosuelo = document.getElementById('suelos');

// Declarar la letiable para la capa GeoJSON
let suelolayer;

// Agregar el control personalizado
let checkboxsu = L.control({
    position: 'topright'
});
let checkboxph = L.control({
    position: 'bottomleft'
});
let checkboxzc = L.control({
    position: 'bottomleft'
});

function openPopup(layer, properties) {
    if (properties.name === 'Chontales') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Mollisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.5-0.9%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.7%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a alta</b><br>
            <li>Suelos Ultisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.7%</li>
                    <li>Nivel de fósforo (P): 0.1-0.4%</li>
                    <li>Nivel de potasio (K): 0.2-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a media</b><br>
        </ul>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Boaco') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Mollisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.4-0.8%</li>
                    <li>Nivel de fósforo (P): 0.3-0.6%</li>
                    <li>Nivel de potasio (K): 0.4-0.7%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a alta</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'León') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Vertisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.6-1%</li>
                    <li>Nivel de fósforo (P): 0.3-0.7%</li>
                    <li>Nivel de potasio (K): 0.5-0.9%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Chinandega') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Vertisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.6-1%</li>
                    <li>Nivel de fósforo (P): 0.4-0.8%</li>
                    <li>Nivel de potasio (K): 0.5-0.9%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>
            <li>Suelos Entisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.7%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>
        </ul>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Madriz') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Entisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.6%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Nueva Segovia') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Entisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.6%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.3-0.6%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Alta a baja</b><br>`;
        layer.bindPopup(popupContent).openPopup();
    } else if (properties.name === 'Río San Juan') {
        let popupContent = `
        <b>Departamento: </b>${properties.name}<br>
        <b>Tipos de Suelo:</b>
        <ul>
            <li>Suelos Inceptisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.2-0.5%</li>
                    <li>Nivel de fósforo (P): 0.1-0.4%</li>
                    <li>Nivel de potasio (K): 0.2-0.5%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Muy baja a alta</b><br>
            <li>Suelos Oxisoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.1-0.3%</li>
                    <li>Nivel de fósforo (P): 0.1-0.3%</li>
                    <li>Nivel de potasio (K): 0.1-0.4%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Muy baja</b><br>
        </ul>
        <li>Suelos Histosoles
                <ul>
                    <li>Nivel de nitrógeno (N): 0.3-0.7%</li>
                    <li>Nivel de fósforo (P): 0.2-0.5%</li>
                    <li>Nivel de potasio (K): 0.4-0.8%</li>
                </ul>
            </li>
            <b>Nivel de Fertilidad: Baja a alta</b><br>
        </ul>`;
        layer.bindPopup(popupContent).openPopup();
    }
}

// Manejar el evento change del checkbox
geosuelo.addEventListener('change', function () {
    if (geosuelo.checked) {
        // Si el checkbox está marcado, cargar y agregar la capa GeoJSON al mapa
        fetch('../../../../src/shared/components/mapa_/departamentos.geojson')
            .then(response => response.json())
            .then(data => {
                let suelos = data;
                suelolayer = L.geoJSON(suelos, {
                    onEachFeature: function (feature, layer) {
                        // Agregar eventos de mouseover y mouseout a cada división
                        layer.on({
                            click: function (e) {
                                let layer = e.target;
                                // Elelet la división con una transformación CSS cuando el mouse entra
                                layer.getElement().style.transform = 'translateY(-10px)';
                                if (layer.isPopupOpen()) {
                                    closePopup(layer); // Si ya está abierto, cierra el popup al hacer clic en el polígono
                                } else {
                                    openPopup(layer, feature.properties); // Si está cerrado, abre el popup al hacer clic en el polígono
                                }
                            },
                            mouseout: function (e) {
                                let layer = e.target;
                                // Restaurar la transformación cuando el mouse sale
                                layer.getElement().style.transform = 'translateY(0)';
                            }
                        });
                    }
                });
                suelolayer.setStyle({ fillColor: 'white', fillOpacity: 0 }).addTo(mymap);
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

        checkboxsu.onAdd = function () {
            let div1 = L.DomUtil.create('div', 'leaflet-control');
            div1.innerHTML = `
        <div style="background-color: white; border: 1px solid black;">
            <div style="margin: 10px;"> 
                <h4 style="margin-bottom: 10px;">Tipos:</h4>  
                <label style="margin-right: 10px;"><input type="checkbox" id="zona"> Zona climatica</label><br> 
                <label style="margin-right: 10px;"><input type="checkbox" id="ph"> PH</label><br> 
            </div>
        </div> 
    `;
            return div1;
        };
        checkboxsu.addTo(mymap);

        // Agregar el evento de cambio al checkbox "PH"
        let phCheckbox = document.getElementById('ph');
        let fuerte = ["RAAN", "RAAS"];
        let neutros = ["León", "Managua", "Masaya", "Granada", "Carazo"];
        let medios = ["Boaco", "Chinandega", "Chontales", "Estelí", "Jinotega", "Madriz", "Matagalpa", "Nueva Segovia", "Río San Juan", "Rivas"];


        phCheckbox.addEventListener('change', function () {
            if (phCheckbox.checked) {
                checkboxph.onAdd = function () {
                    let div1 = L.DomUtil.create('div', 'leaflet-control');
                    div1.innerHTML = `
     <div style="background-color: white; border: 1px solid black;">
    <div style="margin: 10px;">
        <h4 style="margin-bottom: 10px;">Explicación:</h4>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: yellow; margin-right: 5px;"></div> 4.5 - 5, Muy fuerte ácido
        </div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: green; margin-right: 5px;"></div>5.6 - 6,Medianamente ácido </div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: gray; margin-right: 5px;"></div>6.6 - 7.3, Neutro
        </div>
    </div>
</div>

    `;
                    return div1;
                };
                checkboxph.addTo(mymap);
                // Valores fuertes
                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        // Verificar la propiedad de la capa
                        let nombreEntidad = layer.feature.properties.name;
                        if (fuerte.includes(nombreEntidad)) {
                            layer.setStyle({ fillColor: 'yellow', fillOpacity: 0.4 });
                        } else if (medios.includes(nombreEntidad)) {
                            layer.setStyle({ fillColor: 'green', fillOpacity: 0.4 });
                        } else if (neutros.includes(nombreEntidad)) {
                            layer.setStyle({ fillColor: 'gray', fillOpacity: 0.4 });
                        }
                    });
                }
            } else {

                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        layer.setStyle({ fillColor: 'white', fillOpacity: 0 });
                    });
                } if (checkboxph) {
                    mymap.removeControl(checkboxph);
                }
            }
        });

        // Agregar el evento de cambio al checkbox "zonas climaticas"
        let zcCheckbox = document.getElementById('zona');
        let seco = ["Managua", "Madriz", "Estelí", "León", "Carazo"];
        let semi = ["Boaco", "Chinandega", "Chontales", "Granada", "Jinotega", "Masaya", "Matagalpa", "Nueva Segovia", "Río San Juan", "Rivas"];
        let humeda = ["RAAN", "RAAS"];


        zcCheckbox.addEventListener('change', function () {
            if (zcCheckbox.checked) {
                checkboxzc.onAdd = function () {
                    let div2 = L.DomUtil.create('div', 'leaflet-control');
                    div2.innerHTML = `
     <div style="background-color: white; border: 1px solid black;">
    <div style="margin: 10px;">
        <h4 style="margin-bottom: 10px;">Explicación:</h4>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: gray; margin-right: 5px;"></div>Zona seca: 1,200 mm/anuales</div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: green; margin-right: 5px;"></div>Zona subhumeda: 1,2000 a 2,000 mm/anuales</div>
        <div style="margin-right: 10px; margin-bottom: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: blue; margin-right: 5px;"></div>Zona Humeda: 2,000 y 3,500 mm/anuales</div>
    </div>
</div>

    `;
                    return div2;
                };
                checkboxzc.addTo(mymap);
                // Valores del clima
                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        let nombreEntidad = layer.feature.properties.name;
                        if (humeda.includes(nombreEntidad)) {

                            layer.setStyle({ fillColor: 'blue', fillOpacity: 0.4 });
                        } else if (seco.includes(nombreEntidad)) {

                            layer.setStyle({ fillColor: 'gray', fillOpacity: 0.4 });
                        } else if (semi.includes(nombreEntidad)) {

                            layer.setStyle({ fillColor: 'green', fillOpacity: 0.4 });
                        }
                    });
                }
            } else {

                if (suelolayer) {
                    suelolayer.eachLayer(function (layer) {
                        layer.setStyle({ fillColor: 'white', fillOpacity: 0 });
                    });
                } if (checkboxzc) {
                    mymap.removeControl(checkboxzc);
                }
            }
        });
    } else {
        // Si el checkbox no está marcado, quitar la capa GeoJSON del mapa (si existe)
        if (suelolayer) {
            mymap.removeLayer(suelolayer);
        }
        if (checkboxsu) {
            mymap.removeControl(checkboxsu);
        }
    }
});
}
