
export const formatoFecha=(fecha_:string):string=>{
    const fecha =new Date(fecha_)
    const fechaFormateada = `${fecha.getFullYear()}-${(
      "0" +
      (fecha.getMonth() + 1)
    ).slice(
      -2
    )}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
 
    return fechaFormateada
}