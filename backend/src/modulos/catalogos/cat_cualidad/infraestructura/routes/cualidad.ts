import { Router } from 'express';
import { SequelizeRepositorycatCualidad } from '../repositorio';
import { CasoUsoCatCualidad } from '../../aplicacion';
import { ControladorCatCualidad } from '../controlador';





const sequelize = new SequelizeRepositorycatCualidad();
const casoUso = new CasoUsoCatCualidad(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatCualidad(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
