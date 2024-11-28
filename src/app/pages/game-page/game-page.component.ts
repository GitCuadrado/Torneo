import {Component,Inject,OnDestroy,inject} from '@angular/core';
import {Game} from '../../types/types'
import {BackendRequestService} from "../../services/backend-request.service";
import {GameCardComponent} from "../../components/game-card/game-card.component";
import {DatePipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDividerModule} from "@angular/material/divider";
import {groupSeriesGames} from "../../shared/gameParsingUtils";
import {SeriesCardComponent} from "../../components/series-card/series-card.component";
import { Grupo } from '../../types/types';
import {getAuth,onAuthStateChanged } from 'firebase/auth'
import {Auth} from "@angular/fire/auth";
import { CommonModule } from '@angular/common';

//import { Auth, authInstance$ } from '@angular/fire/auth';
@Component({
  selector: 'pickem-game-page',
  standalone: true,
  templateUrl: './game-page.component.html',
  imports: [
    GameCardComponent,
    NgForOf,
    MatGridListModule,
    MatButtonToggleModule,
    NgIf,
    MatDividerModule,
    SeriesCardComponent,
    KeyValuePipe,
    CommonModule
  ],
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnDestroy{
  constructor(private backendService: BackendRequestService) {
    this.selectOpts = new Map();
  }
  selectOpts:Map<string,string>;
  data:Grupo[] = []
  subs:any[]=[]
  protected auth: Auth = inject(Auth);
  public onViewChange(val: boolean) {
    //save options
    
  }
  
  ngOnInit() {
    //this.viewByDay = true; // May want user preferences later and save it
    //this.refreshGamesByDate()

    this.subs.push(onAuthStateChanged(getAuth(),(x) => {
      console.log("AUTHHHHH")
      console.log(x)
      this.obtenerGrupos();
      this.obtenerUsuario(); 
    }))
  }

  obtenerGrupos(){
    this.backendService.getGrupos(this.auth.currentUser?.uid || '').subscribe(grupos => {
      let map = new Map();
      grupos.forEach(grupo => {
        grupo.opciones.forEach(opc => {
          if(opc.estado == 'activo' && !map.has(grupo.id)){
            map.set(grupo.id,opc.id)
          }
        })
      })
      this.selectOpts = map;
      this.data = grupos;
    })
  }
  obtenerUsuario(){
    this.backendService.GetUsuario("").subscribe(usuario => {
      console.log("DATA USER");
      console.log(usuario);
    })
  }
  onClickOpcion(idOpcion:string,idGrupo:string){
    console.log("click " + idGrupo + '-' + idOpcion)
    this.backendService.ActualizarPrediccion(this.auth.currentUser?.uid || '',idGrupo,idOpcion).subscribe(x => {
      console.log("OK " + idGrupo + '-' + idOpcion)
      this.selectOpts.set(idGrupo,idOpcion);
      this.selectOpts = new Map(this.selectOpts);//triggereo el re render
    })
    
  }
  ngOnDestroy(): void {
    console.log(this.subs)
  }
  marcarSelec(idGrupo:string,idOpcion:string){
   
  }

}
