import { Router } from 'express';


import { CasoUsoCatColor } from '../../aplicacion';
import { SequelizeRepositorycatColor } from '../repositorio';
import { ControladorCatColor } from '../controlador';



const sequelize = new SequelizeRepositorycatColor();
const casoUso = new CasoUsoCatColor(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatColor(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
