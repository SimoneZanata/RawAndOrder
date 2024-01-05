import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: "tnv-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  constructor(public authService: AuthService){}
 
  ngOnInit() {
   
  }

 
}
