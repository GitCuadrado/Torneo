import { Component } from '@angular/core';
import {BackendRequestService} from "../../services/backend-request.service";
import { Premio } from 'src/app/types/types';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'pickem-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    MatIconModule
  ]
})
export class PremiosComponent {
  data:Premio[]=[]
  constructor(private backendService:BackendRequestService){

  }
  ngOnInit() {
    //this.viewByDay = true; // May want user preferences later and save it
    //this.refreshGamesByDate()
    this.obtenerPremios();

  }
  obtenerPremios(){
    this.backendService.getPremios().subscribe(resp => {
      resp.sort((a,b) => b.gruposGanados.length - a.gruposGanados.length)
      this.data = resp;
    })
  }
}
