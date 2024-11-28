import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'pickem-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    MatToolbarModule],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

}
