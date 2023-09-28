import { Router } from 'express';
import { CasoUsoCatTipoIdentificacion } from '../../aplicacion';
import { ControladorCatTipoIdentificacion } from '../controlador';
import { SequelizeRepositorycatTipo_Identificacion } from '../repositorio';



const sequelize = new SequelizeRepositorycatTipo_Identificacion();
const casoUso = new CasoUsoCatTipoIdentificacion(sequelize);
const {
  buscarPorId,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatTipoIdentificacion(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };

