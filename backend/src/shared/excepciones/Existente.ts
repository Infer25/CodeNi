
export class Existente extends Error{
    constructor (nombre:string){
        super(`${nombre}  ya existe`)  
    }
}

