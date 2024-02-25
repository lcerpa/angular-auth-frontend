import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

    private fb             = inject( FormBuilder );
    private authService    = inject( AuthService );
    private router         = inject( Router );

    public myForm: FormGroup = this.fb.group({
      email:    ['', [ Validators.required, Validators.email ] ],
      password: ['', [ Validators.required, Validators.minLength(6) ] ]
    })

    login() {
      console.log( this.myForm.value );

      const { email, password } = this.myForm.value;

      this.authService.login( email, password )
        .subscribe({
         next: () => this.router.navigateByUrl('/dashboard'),
        //  next: () => console.log("Todo bien"),
         error: (message) => {
          console.log( { logginError: message} );
          Swal.fire({
            title: message,
            showClass: {
              popup: `
                animate__animated
                animate__backInLeft
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__lightSpeedOutRight
                animate__faster
              `
            }
          });
         }

        } )
    }

}
