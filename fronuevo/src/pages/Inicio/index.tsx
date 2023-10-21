import { Box } from "@mui/material";
import "./style.css";
import img1  from '../../../src/assets/plantando.png'
import img2  from '../../../src/assets/gestion-de-proyectos.png'
import img3  from '../../../src/assets/cucaracha.png'
import img4  from '../../../src/assets/demoledor.png'
import img5  from '../../../src/assets/calidad.png'
import img6  from '../../../src/assets/adaptar.png'
import img7  from '../../../src/assets/Anuncio2.png'

import img8 from '../../../src/assets/Noticia1.jpeg'
import img9  from '../../../src/assets/Noticia2.jpg'


export const Inicio_Pagina = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <section className="inicio" id="inicio">
        <header>
          <section className="carrucelInicio">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="../../../src/assets/Agricultura.jpg" alt="img" />
                </div>
                {/*  <div className="carousel-item">
                  <img
                    src="{{ asset('resources/imagenes/Siembra.jpeg') }}"
                    className="d-block w-100"
                    alt="img"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="{{ asset('resources/imagenes/Tablet.jpg') }}"
                    className="d-block w-100"
                    alt="img"
                  />
                </div> */}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
        </header>
        <section className="nosotros-inicio">
          <div className="contenedor">
            <div className="row">
              <div className="col-lg-4">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img1}
                      className="d-block"
                      width="90px"
                      height="90px"
                      alt="img"
                    />
                  </div>
                  <h4>Sostenibilidad ambiental</h4>
                  <p>
                    Implementamos prácticas sostenibles para proteger el suelo,
                    el agua y la biodiversidad.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img2}
                      className="d-block"
                      width="90px"
                      height="90px"
                      alt="img"
                    />
                  </div>
                  <h4>Gestión de recursos</h4>
                  <p>
                    Implementamos sistemas de riego eficientes y ajusta la
                    fertilización según las necesidades de los cultivos.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img3}
                      className="d-block"
                      width="90px"
                      height="90px"
                      alt="img"
                    />
                  </div>
                  <h4>Control de plagas</h4>
                  <p>
                    Establecemos un programa de manejo integrado de plagas y
                    enfermedades que incluya métodos preventivos.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img4}
                      className="d-block"
                      width="90px"
                      height="90px"
                      alt="img"
                    />
                  </div>
                  <h4>Tecnología y maquinaria</h4>
                  <p>
                    Actualizamos regularmente la maquinaria agrícola para
                    garantizar su eficiencia y seguridad.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img5}
                      className="d-block"
                      width="90px"
                      height="90px"
                      alt="img"
                    />
                  </div>
                  <h4>Calidad alimentaria</h4>
                  <p>
                    Llevamos un registro adecuado de los insumos utilizados y de
                    las prácticas agrícolas aplicadas.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img6}
                      className="d-block"
                      width="90px"
                      height="90px"
                      alt="img"
                    />
                  </div>
                  <h4>Innovación</h4>
                  <p>
                    Nos mantenemos abiertos a la innovación y adaptación de
                    nueva tecnologías y prácticas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="anuncio">
          <img
            src={img7}
            className="d-block w-100"
            alt="img"
          />
        </section>
        <section className="ultimasNoticias">
          <h1>Últimas noticias</h1>
          <div className="titulo">
            <div className="linea"></div>
          </div>
          <div className="contenedor">
            <div className="row">
              <div className="col-lg-6">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img9}
                      className="d-block"
                      alt="img"
                    />
                  </div>
                  <h4>La vida en el campo</h4>
                  <span>10 de julio</span>
                  <p>
                    Nicaragua, con su posición geográfica, tiene un clima que
                    favorece la producción de sus alimentos, sus ecosistemas
                    albergan riquezas naturales.
                  </p>
                  <a
                    type="button"
                    href="https://www.visitanicaragua.com/explora-la-nicaragua-rural/amp/"
                    target="_BLANK"
                    className="btn btn-success"
                  >
                    Leer más
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="elemento">
                  <div className="img">
                    <img
                      src={img8}
                      className="d-block"
                      alt="img"
                    />
                  </div>
                  <h4>Las máquinas del futuro</h4>
                  <span>10 de julio</span>
                  <p>
                    Se desarrolló una sesión de trabajo en donde se presentó y
                    promocionó las “Tecnologías Digitales para el desarrollo de
                    la agricultura en Nicaragua”.
                  </p>
                  <a
                    type="button"
                    href="https://iica.int/es/prensa/noticias/iica-promueve-tecnologias-digitales-para-la-agricultura-en-nicaragua"
                    target="_BLANK"
                    className="btn btn-success"
                  >
                    Leer más
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Box>
  );
};
