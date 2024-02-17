import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  id!:string;
  sExiste:boolean;
  search:string;
  citas:Citas[]=[]


    // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
    dataSource = new MatTableDataSource<Citas>();
    displayedColumns: string[] = ['nombre', 'apellido', 'nombre_servicio', 'duracion', 'fechaCita', 'horaCita', 'horaFinCita', 'estado'];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private citasService:CitaService,
    private router:ActivatedRoute){}
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    if (this.id) {
      this.sExiste = true;
      this.citasService.getByEstilistaId(this.id).subscribe(data => {
      
         this.citas = data
         this.dataSource.data = data;
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      });
    }
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.search.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  toggleEstadoCita(cita: Citas): void {
    let nuevoEstado = '';

    switch (cita.estado) {
      case 'confirmada':
        nuevoEstado = 'cancelada';
        break;
      case 'cancelada':
        nuevoEstado = 'en espera';
        break;
      case 'en espera':
        nuevoEstado = 'pendiente';
        break;
      case 'pendiente':
        nuevoEstado = 'confirmada';
        break;
    }

    this.citasService.actualizarEstado(cita._id, nuevoEstado).subscribe(
      () => {
        // Realiza acciones adicionales después de la actualización si es necesario
      },
      (error) => {
        console.error('Error al cambiar el estado de la cita:', error);
      }
    );
  }
}
