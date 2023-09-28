import { Router } from 'express';
import { SequelizeRepositoryTblPersona } from '../repositorio';
import { CasoUsoTblPersona } from '../../aplicacion';
import { ControladorTblPersona } from '../controlador';



const sequelize = new SequelizeRepositoryTblPersona();
const casoUso = new CasoUsoTblPersona(sequelize);
const {
  //cambiarEstado,
  registrar,
  obtenerTodo,
  obtenerMunicipio,
  obtenerTipoIdentificacion

} = new ControladorTblPersona(casoUso);

const router = Router();
router.get('/get/', obtenerMunicipio);
router.get('/getTipo/', obtenerTipoIdentificacion);
router.get('/getAll/:criterio&&:filtro&&:pagina&&:cantidadFila', obtenerTodo);
router.post('/create', registrar);


export { router };

