import { Municipio } from './municipio';
import { CalculoEstadistico } from "./calculo_estadistico";

export interface AreaEstadistica {
          
      id_area_estadistica: String;
      nombre: String;
      id_delegacion: String;
      ejercicio: Number;
      tipo_area: String;
      id_grupo_municipio: String;
      lista_municipios: Array<Municipio>;
      id_municipio: String;
      id_distrito: String;
      aa_ponencia_total: Number;
      mbr: Array<Number>;
      mbc: Array<Number>;
      calculos_estadisticos_pt : Array<CalculoEstadistico>;

}