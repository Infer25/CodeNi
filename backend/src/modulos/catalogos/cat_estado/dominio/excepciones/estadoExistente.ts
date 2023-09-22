
export class EstadoExistenteNombre extends Error{
    constructor (nombre:string){
        super(`${nombre}  ya existe`)  
    }
}

