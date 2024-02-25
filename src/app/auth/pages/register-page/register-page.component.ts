import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb             = inject( FormBuilder );
    private authService    = inject( AuthService );
    private router         = inject( Router );

    public myForm: FormGroup = this.fb.group({
      name:    ['', [ Validators.required ] ],
      email:    ['', [ Validators.required, Validators.email ] ],
      password: ['', [ Validators.required, Validators.minLength(6) ] ],
      //password2: ['', [ Validators.required, Validators.minLength(6) ] ]
    })

    register() {
      console.log( this.myForm.value );

      this.authService.register( this.myForm.value )
        .subscribe({
         next: () => {
          Swal.fire({
            title: "Registro exitoso, por favor ingrese sus credenciales",
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
          this.router.navigateByUrl('/login')
         },
        //next: () => console.log("Todo bien"),
         error: (message) => {
          console.log( { RegisterError: message} );
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
