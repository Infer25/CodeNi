import { Router } from 'express';
import { SequelizeRepositorycatTipo_Tierra } from '../repositorio';
import { CasoUsoCatTipoTierra } from '../../aplicacion';
import { ControladorCatTipoTierra } from '../controlador';



const sequelize = new SequelizeRepositorycatTipo_Tierra();
const casoUso = new CasoUsoCatTipoTierra(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatTipoTierra(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
