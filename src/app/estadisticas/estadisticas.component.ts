import { Component, OnInit } from '@angular/core';
import { Municipio } from './dto/municipio';
import { Delegacion } from './dto/delegacion';
import { EstadisticasService } from '../estadisticas.service';
import { AreaEstadistica } from './DTO/area_estadistica';

import * as jsonexport from 'jsonexport/dist';
import * as FileSaver from 'file-saver';

const CSV_TYPE = 'text/csv;charset=utf-8';
const CSV_EXTENSION = '.csv';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent  implements OnInit  {

  public delegaciones: Delegacion[] = [];
  public municipios: Municipio[] = [];
  public areas: AreaEstadistica[] = [];

  public delegacion: number = 0;
  municipio: number = 0;
  ejercicio: number = 0;
  tipo_area: string = 'NULL';

  check: Boolean =true;

  constructor(public _EstadisticasService: EstadisticasService) { }

  ngOnInit() {
    this.getDelegaciones();
    this.resetValues();
  }

  resetValues() {
    this.delegacion = 0;
    this.municipio  = 0;
    this.ejercicio  = 0;
    this.tipo_area  = 'NULL';
  }

  getDelegaciones() {
    this._EstadisticasService.getDelegacion()
      .subscribe(result => {
        this.delegaciones = result;
      },
      (err) => console.log(err));
  }

  getDel() {
    this.delegacion = +this.delegacion;
    this.getMunicipios(this.delegacion);
  }

  getMunicipios(delegacion: number) {
    this._EstadisticasService.getMunicipios(delegacion)
      .subscribe(result => {
        this.municipios = result;
      },
      (err) => console.log(err));
  }

  getMun(){
      this.municipio = +this.municipio;
  }
  getEj(){
    this.ejercicio = +this.ejercicio;

  }
 
  getType(event) {
    this.tipo_area = '' + event;
  }

  getAreas() {
    this._EstadisticasService.getAreasEstadisticas(this.delegacion, this.ejercicio, this.tipo_area, this.municipio)
        .subscribe(res => {
          this.areas = res;
          console.log(this.areas);
          this.check = false ;
          alert('Cálculo Finalizado!');
        },
        (err) =>{console.log(err); alert('Ha habido un error en el cálculo =C');});
  }

  exportCsv () {

    const options = {
      rowDelimiter: ';',
      handleNumber: function(number, name){
        return number.toFixed(2).toString().replace(/\./g, ',');
      }
    };

    const  del: string = this.delegacion.toString();
    const nombre_fichero: string = 'AreasEstadisticas_' + del + CSV_EXTENSION;

    // El JSON que devuelve le exportamos a CSV
    jsonexport( this.areas , options, function(err, csv){
      if (err) { return  console.log(err); }
      const file = new Blob([csv], {
        type: CSV_TYPE
      });

      // Descarga el CSV a través de navegador
      FileSaver.saveAs(file, '' + nombre_fichero);
      this.resetValues();
    });

  }

}
