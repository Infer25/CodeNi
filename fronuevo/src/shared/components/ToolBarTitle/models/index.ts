
type ModelRuta={
    id:number,
    title: string,
    ruta:string
}

export type ModelToolBarTitle={
    modulo:string,
    subMenu:string,
    children?:JSX.Element | JSX.Element[],
    url?:ModelRuta[]
    close?:JSX.Element | JSX.Element[],


}