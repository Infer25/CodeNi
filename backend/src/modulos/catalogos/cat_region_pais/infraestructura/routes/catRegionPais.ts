import { Router } from 'express';
import { SequelizeRepositoryCatRegionPais } from '../repositorio';
import { CasoUsoRegionPais } from '../../aplicacion';
import { ControladorCatRegionPais } from '../controlador';



const sequelize = new SequelizeRepositoryCatRegionPais();
const casoUso = new CasoUsoRegionPais(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatRegionPais(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
