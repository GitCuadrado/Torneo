import {Component, Input} from '@angular/core';
import {Game} from "../../types/types";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatDividerModule} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'pickem-series-card',
  standalone: true,
  templateUrl: './series-card.component.html',
  imports: [
    DatePipe,
    MatCardModule,
    NgIf,
    NgForOf,
    MatRadioModule,
    MatDividerModule,
    NgOptimizedImage,
    MatTooltipModule,
    MatButtonModule,
    NgSwitch,
    NgSwitchCase
  ],
  styleUrls: ['./series-card.component.scss']
})
export class SeriesCardComponent {


  @Input() series: Game[] | null = null;

}
