import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const routerCatMunicipio = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split('.').shift();
  console.log(PATH_ROUTER);
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      routerCatMunicipio.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { routerCatMunicipio };
