import { Router } from 'express';

import { CasoUsoDptoRegion } from '../../aplicacion';
import { ControladorCatDptoRegion } from '../controlador';
import { SequelizeRepositoryCatDptoRegion } from '../repositorio';



const sequelize = new SequelizeRepositoryCatDptoRegion();
const casoUso = new CasoUsoDptoRegion(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  obtenerRegion,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorCatDptoRegion(casoUso);

const router = Router();
router.get('/get/', obtenerRegion);
router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
