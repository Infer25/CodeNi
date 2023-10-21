import { Box } from '@mui/material';
import './styles.css'
export const Contactto = () => {
  return (
  <Box sx={{mt:20,mx:5}}>
      <section id="contacto" className="contacto">
      <div className="row">
        <div className="col-lg-6 ">
          <iframe
            className="mb-4 mb-lg-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124838.69973880047!2d-86.34086334660103!3d12.09781471676065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f71560dd907880b%3A0x6c5ef4a2144f4c6a!2sManagua%2C%20Nicaragua!5e0!3m2!1ses-419!2sus!4v1693979621480!5m2!1ses-419!2sus"
            frameBorder="0"
            style={{ border: 0, width: "100%", height: "384px" }}
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-lg-6">
          <form
            action="https://formsubmit.co/espinozasteven659@gmail.com"
            method="POST"
          >
            <div className="row">
              <div className="col form-group mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control inputNombre"
                  id="inputNombre"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="col form-group  mb-3">
                <input
                  type="email"
                  className="form-control inputEmail"
                  name="email"
                  id="inputEmail"
                  placeholder="Tu email"
                  required
                />
              </div>
            </div>
            <div className="form-group  mb-3">
              <input
                type="text"
                className="form-control inputAsunto"
                name="subject"
                id="inputAsunto"
                placeholder="Asunto"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control inputMensaje"
                id="inputMensaje"
                name="comments"
                rows={5}
                placeholder="Mensaje"
                required
              ></textarea>
            </div>
            <div className="botonArea mb-3">
              <a type="submit" id="enviarCorreo" className="btn btn-success">
                Enviar
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Box>
  );
};
