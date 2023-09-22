import { Router } from 'express';
import { CasoUsoEstado } from '../../aplicacion/casoUso';
import { SequelizeRepository } from '../repositorio/sequelize/repoSequelize';
import { ControladorEstado } from '../controlador';

const sequelize = new SequelizeRepository();
const casoUso = new CasoUsoEstado(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorEstado(casoUso);

const router = Router();

router.get('/:num_estado', buscarPorId);
router.get('/searchByName/:nombreestado', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila',obtenerTodo);
router.post('/create', registrar);
//router.put('/change/:numestado', cambiarEstado);
router.put('/update/:id', actualizar);

export { router };
