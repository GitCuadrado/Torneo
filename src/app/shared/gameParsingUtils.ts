import {Game} from "../types/types";

export function groupSeriesGames(games: Game[]) {

  const map = new Map<string, Game[]>();

  games.forEach(game => {
    const key = game.homeTeam_id.toString() + game.awayTeam_id.toString()
    const coll = map.get(key)
    if (!coll){
      map.set(key, [game])
    } else {
      coll.push(game)
    }
  })
  return map;

}

export function findFirstAndLastSeriesGames(series: Map<string, Game[]>) {

  let maxDate = new Date(), minDate = null;

}
