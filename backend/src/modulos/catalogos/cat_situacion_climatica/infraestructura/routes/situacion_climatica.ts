import { Router } from 'express';
import { SequelizeRepositoryCatSituacionClimatica } from '../repositorio';
import { CasoUsoCatSituacionClimatica } from '../../aplicacion';
import { ControladorCatSituacionClimatica } from '../controlador';

const sequelize = new SequelizeRepositoryCatSituacionClimatica();
const casoUso = new CasoUsoCatSituacionClimatica(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatSituacionClimatica(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
