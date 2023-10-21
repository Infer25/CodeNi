import madera from "@/assets/madera1.jpg";
export const ColorFondoMadera = (): string =>
  `url(${madera})`;


  export const ColorFondoMaderaTabla = (): string =>
  `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(0, 1, 1, 0.1)),url(${madera})`;
