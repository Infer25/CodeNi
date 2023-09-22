import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const routerCatRegionPais = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split('.').shift();
  console.log(PATH_ROUTER);
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  console.log(PATH_ROUTER);
  const cleanName = cleanFileName(fileName);
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      routerCatRegionPais.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { routerCatRegionPais };
