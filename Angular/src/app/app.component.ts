import { Component } from '@angular/core';
import { AuthGuard } from './@core/helpers/auth-guard';
import { AuthService } from './@core/services/auth.service';

@Component({
  selector: 'tnv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tnv-project-template';
}
