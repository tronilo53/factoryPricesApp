import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //* Variable para guardar la url de la solicitud http
  private destiny: string = 'https://freelsdevcamp.es/factoryPrices/src/assets/backend/query.php';

  /**
   ** Constructor de DataService
   * @param httpClient Peticiones Http
   */
  constructor(private httpClient: HttpClient) { }

  /**
   ** Peticiones http
   * @param destiny Destino de petición
   * @param data Datos Post para la petición
   * @returns Retorna un Observable
   */
   public http(destiny: string, data: any) {
    if(destiny === 'uploadInvoice') return this.httpClient.post('https://freelsdevcamp.es/factoryPrices/src/assets/backend/uploadInvoice.php', data);
    else if(destiny === 'modifyUploadInvoice') return this.httpClient.post('https://freelsdevcamp.es/factoryPrices/src/assets/backend/modifyUploadInvoice.php', data);
    else return this.httpClient.post(this.destiny, data);
  }
}
