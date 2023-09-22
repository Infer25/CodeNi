import { Router } from 'express';
import { SequelizeRepositoryCatMunicipio } from '../repositorio';
import { CasoUsoCatMunicipio } from '../../aplicacion';
import { ControladorCatMunicipio } from '../controlador';


const sequelize = new SequelizeRepositoryCatMunicipio();
const casoUso = new CasoUsoCatMunicipio(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  obtenerDepartamento,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatMunicipio(casoUso);

const router = Router();
router.get('/get/', obtenerDepartamento);
router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
