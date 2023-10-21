import  './styles.css'
import img1 from '../../../src/assets/Arroz.jpeg'
import img2 from '../../../src/assets/policia.jpg'
import img3 from '../../../src/assets/Vivero.png'
import img4 from '../../../src/assets/Regaderas.jpg'

export const Nosotros = () => {

  return (
    <section className="nosotros" id="nosotros">
      <div className="contenedor">
        <div className="row">
          <div className="col-lg-6">
            <div className="elemento">
              <h4>Nuestra Compañía</h4>
              <div className="linea"></div>
              <div className="img">
                <img
                  src={img1}
                  className="d-block"
                  alt="img"
                />
              </div>
              <p>
                Somos una empresa agrícola dedicada a la producción de granos
                básicos, comprometida con la seguridad, la estrategia y la
                protección del medio ambiente.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="elemento">
              <h4>Seguridad</h4>
              <div className="linea"></div>
              <div className="img">
                <img
                  src={img2}
                  className="d-block"
                  alt="img"
                />
              </div>
              <p>
                Nuestra compañía se esfuerza constantemente por garantizar la
                seguridad de nuestros empleados, clientes y comunidades vecinas.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="elemento">
              <h4>Estrategia</h4>
              <div className="linea"></div>
              <div className="img">
                <img
                  src={img3}
                  className="d-block"
                  alt="img"
                />
              </div>
              <p>
                Nuestra estrategia se basa en la excelencia operativa y la
                innovación constante para garantizar un suministro confiable de
                granos básicos.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="elemento">
              <h4>Medio ambiente y sustentabilidad</h4>
              <div className="linea"></div>
              <div className="img">
                <img
                  src={img4}
                  className="d-block"
                  alt="img"
                />
              </div>
              <p>
                Nos aseguramos de cumplir con todas las regulaciones ambientales
                y trabajamos para superar las expectativas de sostenibilidad en
                la industria agrícola.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
