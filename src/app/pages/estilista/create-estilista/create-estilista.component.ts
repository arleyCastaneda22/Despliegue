import { EstilistaService } from 'src/app/services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';

@Component({
  selector: 'app-create-estilista',
  templateUrl: './create-estilista.component.html',
  styleUrls: ['./create-estilista.component.css']
})
export class CreateEstilistaComponent implements OnInit {

  constructor(
    private servicioEstilista: EstilistaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

  }
  id!: string;
  sExiste: boolean = false;
  myForm: FormGroup = this.fb.group({

    telefono: ['', [Validators.required,  Validators.pattern(/^[1-9]\d{6,9}$/
    )]],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],
    contrasena: ['', [Validators.required, this.atLeastOneUppercase]],
    recontrasena: ['', [Validators.required, this.atLeastOneUppercase]],

  });

  get correo() {
    return this.myForm.get('nombre');
  }

  validarExtensionCom(control: any) {
    const email = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.org') && !email.endsWith('.co') && !email.endsWith('.edu')) {
      return { sinExtensionCom: true };
    }
    return null;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.servicioEstilista.getOneEstilista(this.id).subscribe((res: Estilista) => {
        this.myForm.patchValue({
          nombre: res.nombre,
          apellido: res.apellido,
          email: res.email,
          telefono: res.telefono,
          contrasena:res.contrasena

        })
      })
    }
  }

  atLeastOneUppercase(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value || '';

    // Verificar si la cadena tiene al menos un carácter y si contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) ) {
      return { noUppercase: true };
    }

      // Verificar la longitud de la contraseña
    if (value.length < 8 || value.length > 15) {
    return { invalidLength: true };
    }


    return null;
  }

  onSave(estilista: Estilista) {
    const contrasena = this.myForm.get('contrasena')?.value;
    const recontrasena = this.myForm.get('recontrasena')?.value;

    if (contrasena && contrasena.length < 6) {
      Swal.fire('Error', 'La nueva contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    // Actualizar usuario y/o contraseña
    const body = { ...estilista, contrasena: contrasena || contrasena };

    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario correctamente', 'error');
      return;
    } else if (contrasena.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }else if (contrasena !== recontrasena){
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }else if (this.sExiste) {
      this.servicioEstilista.actualizarEstilista(this.id, estilista).subscribe((res: Estilista) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#745af2',
          title: '¡Actualizado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/estilista/list")
      })
    } else {
      this.servicioEstilista.createEstilista(estilista).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            iconColor: '#745af2',
            title: '¡Guardado!',
            text: 'La información se ha guardado exitosamente.',
          });
          this.router.navigateByUrl("/dashboard/estilista/list");
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            iconColor: '#f25252',
            title: 'Error en la recuperación',
            text: 'El correo ya existe',
          });
        }
      });
    }
    }
  }

