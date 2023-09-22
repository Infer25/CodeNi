import { Router } from 'express';

import { ControladorTipoRubro } from '../controlador';
import { SequelizeRepositoryTipoRubro } from '../repositorio/sequelize';
import { CasoUsoTipoRubro } from '../../aplicacion';

const sequelize = new SequelizeRepositoryTipoRubro();
const casoUso = new CasoUsoTipoRubro(sequelize);
const {
  buscarPorId,
  //cambiarEstado,
  actualizar,
  registrar,
  obtenerTodo,
  buscarPorNombre
} = new ControladorTipoRubro(casoUso);

const router = Router();

router.get('/:id', buscarPorId);
router.get('/searchByName/:nombre', buscarPorNombre);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);
router.put('/update/:id', actualizar);

export { router };
