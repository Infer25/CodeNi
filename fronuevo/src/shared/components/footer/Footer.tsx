import { Stack } from '@mui/material';
import './styles.css'
export const Footer = () => {
    return (
      <Stack mt={9}>
          <footer>
        <div className="contenedor">
            <div className="contenedorRedes">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-square-instagram"></i>
                <i className="fa-brands fa-square-twitter"></i>
            </div>
            <p>Copyright @2023 derechos de autor</p>
        </div>
    </footer>
      </Stack>
    );
};

