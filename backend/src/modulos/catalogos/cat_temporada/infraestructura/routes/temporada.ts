import { Router } from 'express';
import { ControladorCatTemporada } from '../controlador';
import { CasoUsoCatTemporada } from '../../aplicacion';
import { SequelizeRepositorycatTemporada } from '../repositorio';




const sequelize = new SequelizeRepositorycatTemporada();
const casoUso = new CasoUsoCatTemporada(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatTemporada(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
