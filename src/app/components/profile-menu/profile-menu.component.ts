import {Component, inject} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'pickem-profile-menu',
  templateUrl: './profile-menu.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgIf
  ],
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent {

  auth: Auth = inject(Auth)
  router: Router = inject(Router);

}
