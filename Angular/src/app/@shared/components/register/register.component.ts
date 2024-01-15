import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";
import { RegisterDTO } from "src/app/models/user";

@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})


export class RegisterComponent /*implements OnInit*/ {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }

  register(form: NgForm) {
    form.control.markAllAsTouched();
    if (form.valid) {
      const registerForm: RegisterDTO = form.value;
      this.authService.register(registerForm).subscribe({
        next: () => {
          this.router.navigateByUrl("/login");
          setTimeout(() => {
            alert('Registrazione effettuata con successo');
          }, 200);
        },
        error: (error) => {
          console.error('Errore durante la registrazione:', error);
          setTimeout(() => {
            alert('Errore durante la Registrazione: ' + error.error);
          }, 200);
        }  
      });
    }
  }

}











  



