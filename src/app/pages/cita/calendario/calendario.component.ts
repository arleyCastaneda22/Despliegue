import { TurnosService } from 'src/app/services/turnos.service';
import interactionPlugin from '@fullcalendar/interaction';

import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import esLocale from '@fullcalendar/core/locales/es';
import { FullCalendarComponent } from '@fullcalendar/angular';




@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  turnos: ITurnos[] = []
  constructor(private fb: FormBuilder, private turnosService: TurnosService) { }
  myForm :FormGroup=this.fb.group({
    start:['', Validators.required],
    end:['', Validators.required],
    estilista:['', Validators.required]
  })
  ngOnInit(): void {
    this.turnosService.getTurnos().subscribe(data => {
      const eventos = data.map((evento: ITurnos) => {
        return {
          
          title: evento.title, // Puedes cambiar el título según tu estructura de datos
          start: evento.start,
          end: evento.end,
  
        }
      });
      this.calendarOptions.events = eventos;
      console.log(data)


    })


  };
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin], // Agrega listPlugin a la lista de plugins
    initialView: 'timeGridWeek',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay, listWeek' // user can switch between the two
    },

    // validRange: {
    //   start: new Date(), // Solo permite fechas desde la fecha actual
    // },
    dayMaxEvents: 3,

    events: [
   
    ],
    eventBackgroundColor:'#dbcbf7',
    eventClick: this.handleEventClick.bind(this),
    // Otros ajustes y opciones...
    
  
  }

  handleEventClick(clickInfo: { event: EventApi }) {
    const event = clickInfo.event;
  
    // Obtiene los valores de nombre y apellido de extendedProps
  
  
    // Puedes usar estas propiedades como necesit  
    this.myForm.patchValue({
      start: event.start,
      end: event.end,
// O establece otros campos según tus necesidades
    });
  }
  




}



