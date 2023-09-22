export const utils = {
  formatoFechaActual: (): string => {
    const fecha = new Date();
    let fechaFormateada = `${fecha.getFullYear()}-${(
      '0' +
      (fecha.getMonth() + 1)
    ).slice(
      -2
    )}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

    return fechaFormateada;
  },
  formatoFecha: (Date_:string): string => {
    const fecha = new Date(Date_);
    let fechaFormateada = `${fecha.getFullYear()}-${(
      '0' +
      (fecha.getMonth() + 1)
    ).slice(
      -2
    )}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

    return fechaFormateada;
  },
};
