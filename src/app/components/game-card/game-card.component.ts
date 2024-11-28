import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {Game} from "../../types/types";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'pickem-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRadioModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {

  @Input() game: Game | null = null;

}
