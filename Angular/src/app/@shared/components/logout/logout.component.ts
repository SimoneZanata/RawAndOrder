import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'tnv-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logoutApi().subscribe({
      next: () => {
        localStorage.removeItem("user");
        localStorage.removeItem('moviesSortedByUser');
        localStorage.removeItem('sortedCriteria');
        localStorage.removeItem('saveState');
        localStorage.removeItem('Authorization');
        localStorage.removeItem('XSRF-TOKEN');
        this.router.navigateByUrl("/login");
      },
      error: (error) => console.log(error),
    });
  }
}


