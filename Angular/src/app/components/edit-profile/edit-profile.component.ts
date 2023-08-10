import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "src/app/@core/services/auth.service";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router:Router) { }


  updateUser(form: NgForm) {
    console.log("login component.ts", form.value);
    form.control.markAllAsTouched();
    if (form.valid) {
      const updatedUser = {
        email: form.value.newEmail,
        password: form.value.newPassword,
        id: this.authService.getCurrentUser().id
      };
      this.authService.updateProfile(updatedUser).subscribe({
        next: (user) => {
          localStorage.setItem("user", JSON.stringify(user));
            this.router.navigateByUrl("/profile");  
            setTimeout(() => {
              alert('Profilo aggiornato correttamente');
            }, 200);
        },
        error: (error) => {
          console.error('Errore durante l\'aggiornamento del profilo', error);
        }
      });
  }
}

}
