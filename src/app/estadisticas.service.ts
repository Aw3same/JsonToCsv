import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Delegacion } from './estadisticas/dto/delegacion';
import { Municipio } from './estadisticas/dto/municipio';
import { AreaEstadistica } from './estadisticas/DTO/area_estadistica';

@Injectable()
export class EstadisticasService {

  constructor(private _http: HttpClient) { }

  // Url base para la consulta de delegaciones y municipios
  private urlLocalizacion = 'http://vmversioncarto/apilocalizacion/v1/delegaciones';
  // Url base para la consulta de areas estadísticas
  private urlEstadisticas = 'http://vmversioncarto/apiareasestadisticas/v1/areas_estadisticas_producto_tipo'

  // Método que devuelve todas las delegaciones
  getDelegacion() : Observable<Delegacion[]> {

    return this._http.get<Delegacion[]>(this.urlLocalizacion);
  }

  // Método que devuelve todos los municipios pertenecientes a una delegación
  getMunicipios(delegacion: number) : Observable<Municipio[]> {

    return this._http.get<Municipio[]>(this.urlLocalizacion+'/'+delegacion+'/municipios?flag_geometria=false');
  }

  // Método que llama al microservicio Áreas Estadísticas 
  getAreasEstadisticas(delegacion:number, ejercicio: number, tipo_area: string, municipio:number) : Observable<AreaEstadistica[]>{

    let url: string = this.urlEstadisticas;

    if(delegacion !== 0)  url = url + '?id_delegacion='+delegacion ;
    if(ejercicio !== 0)   url = url + '&ejercicio='+ejercicio;
    if(tipo_area !== '')  url = url + '&tipo_area='+tipo_area;
    if(municipio !== 0)   url = url + '&id_municipio='+municipio;

    console.log('URL de petición: ' + url);

    return this._http.get<AreaEstadistica[]>(url);
  }
} 
