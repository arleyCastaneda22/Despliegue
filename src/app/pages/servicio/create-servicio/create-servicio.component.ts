import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-servicio',
  templateUrl: './create-servicio.component.html',
  styleUrls: ['./create-servicio.component.css']
})
export class CreateServicioComponent implements OnInit {
  //Me trae estilistas
  estilista: Estilista[] = []
  //Variable del id que recupero
  id!: string;
  sExiste: boolean = false;
  constructor(
    private fb: FormBuilder,
    private estilistaService: EstilistaService,
    private servicioService: ServiciosService,
    private route: ActivatedRoute,
    private router:Router) { }

    //Validación formulario
  myForm: FormGroup = this.fb.group({
    nombre_servicio: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    duracion: ['00:00', Validators.required],
    precio: ['', Validators.required],
    estilista: ['', Validators.required]
  })
  ngOnInit(): void {
    this.estilistaService.getEstilistas().subscribe(data => {
      console.log(this.estilista = data)
    });

    //Me permite recuperar el id
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.servicioService.getOneServicio(this.id).subscribe((servicio: Servicio) => {
        this.myForm.patchValue({
          nombre_servicio: servicio.nombre_servicio,
          duracion: servicio.duracion,
          precio: servicio.precio,
          estilista: servicio.estilista.nombre

        })
      })
    }
  }

  onSave(servicio:Servicio) {
    if (this.sExiste) {
        this.servicioService.actualizarServicio(this.id, servicio).subscribe((servicio:Servicio)=>{
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'La información se ha actualizado exitosamente.',
          });
          this.router.navigateByUrl("/dashboard/servicio/list")
        })      
    }else{
      this.servicioService.createServicio(servicio).subscribe(res=>{
        Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        console.log(res)
        this.router.navigateByUrl("/dashboard/servicio/list")
      })
          this.myForm.markAllAsTouched()
    }
  }

}
