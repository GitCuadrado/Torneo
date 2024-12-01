import { Component } from '@angular/core';
import {BackendRequestService} from "../../services/backend-request.service";
import { Ranking } from 'src/app/types/types';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'pickem-ranking',
  standalone:true,
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  imports:[
    CommonModule,
    MatIconModule
  ]
})
export class RankingComponent {
  data:Ranking[] = []
  constructor(private backendService:BackendRequestService){

  }
  ngOnInit() {
    //this.viewByDay = true; // May want user preferences later and save it
    //this.refreshGamesByDate()
    this.obtenerRanking();

  }
  obtenerRanking(){
    this.backendService.getRanking().subscribe(resp => {
      resp.sort((a,b) => (Number(b.puntos) - Number(a.puntos)))
      this.data = resp;
    })
  }
}
