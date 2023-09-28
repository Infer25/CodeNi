import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { routerState } from '@/modulos/catalogos/cat_estado/infraestructura/routes';
import { routerCatRegionPais } from '@/modulos/catalogos/cat_region_pais/infraestructura/routes';
import { routerCatDptoregion } from '@/modulos/catalogos/cat_dpto_region/infraestructura/routes';
import { routerCatMunicipio } from '@/modulos/catalogos/cat_municipio/infraestructura/routes';
import { routerTCatTipoRubro } from '@/modulos/catalogos/cat_tipo_rubro/infraestructura/routes';
import { routerCatRubro } from '@/modulos/catalogos/cat_rubro/infraestructura/routes';
import { routerCatColor } from '@/modulos/catalogos/cat_color/infraestructura/routes';
import { routerCatcualidad } from '@/modulos/catalogos/cat_cualidad/infraestructura/routes';
import { routerCatSituacionClimatica } from '@/modulos/catalogos/cat_situacion_climatica/infraestructura/routes';
import { routerCatTemporada } from '@/modulos/catalogos/cat_temporada/infraestructura/routes';
import { routerCatTipoTierra } from '@/modulos/catalogos/cat_tipo_tierra/infraestructura/routes';
import { routerCatTipoIdentificacion } from '@/modulos/catalogos/cat_tipo_identificacion/infraestructura/routes';
import { routerTblPersona } from '@/modulos/catalogos/cat_persona/infraestructura/routes';

const port = process.env.NODE_PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  '/v1/api',
  routerState,
  routerCatRegionPais,
  routerCatDptoregion,
  routerCatMunicipio,
  routerTCatTipoRubro,
  routerCatRubro,
  routerCatColor,
  routerCatcualidad,
  routerCatSituacionClimatica,
  routerCatTemporada,
  routerCatTipoTierra,
  routerCatTipoIdentificacion,
  routerTblPersona
);

app.listen(3001, () => {
  console.log(`Corriendo : ${process.env.NODE_DATABASE} Puerto : ${3001}`);
});
