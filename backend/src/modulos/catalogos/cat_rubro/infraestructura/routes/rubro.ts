import { Router } from 'express';
import { SequelizeRepositoryCatMunicipio } from '../repositorio';
import { CasoUsoCatRubro } from '../../aplicacion';
import { ControladorCatRubro } from '../controlador';



const sequelize = new SequelizeRepositoryCatMunicipio();
const casoUso = new CasoUsoCatRubro(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  obtenerTipoRubro,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatRubro(casoUso);

const router = Router();
router.get('/get/', obtenerTipoRubro);
router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
