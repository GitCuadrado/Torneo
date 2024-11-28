export interface Game {
  id: number,
  date: Date,
  venue: string,
  homeTeam_id: number,
  awayTeam_id: number,
  startTimeUTC: Date,
  finished: boolean,
  homeName: string,
  awayName: string,
}
export interface Grupo{
  nombre:string,
  id:string,
  opciones:Opcion[]
}
export interface Opcion{
  id:string,
  nombre:string
  estado:string
}
export interface Usuario{
  nombre:string,
  puntos:string
}