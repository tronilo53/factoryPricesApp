import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //* Variables Controller
  private loading: HTMLIonLoadingElement;
  private alert: HTMLIonAlertElement;

  //* Variables del DOM
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  //* Variable con el año actual
  public currentYear: number = new Date().getFullYear();

  public credentials: any = {
    username: '',
    password: ''
  };

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private renderer: Renderer2,
    private __dataService: DataService
  ) { }

  ngOnInit() {
  }

  //* Iniciar sesión
  public onClick() {
    // Si los campos están vacios...
    if(this.credentials.username === '' || this.credentials.password === '') {
      //Se muestra una alerta
      this.crateAlertController('Upss!', 'Todos los campos son requeridos');
      // Si el usuario está vacio...
      if(this.credentials.username === '') this.renderer.addClass(this.username.nativeElement, 'border__error');
      // Si la contraseña está vacia...
      if(this.credentials.password === '') this.renderer.addClass(this.password.nativeElement, 'border__error');
      // Si los campos no están vacios...
    }else {
      // Se muestra el Loaging
      this.crateLoadingController();
      // Peticion al servicio para obtener el usuario
      this.__dataService.http('none', { passCode: '5', username: this.credentials.username, password: this.credentials.password }).subscribe((resp: any) => {
        // Si el usuario no existe o la contraseña no es correcta se muestra una alerta... ERROR[001]
        if(resp.res === '001') this.crateAlertController('Upss!', 'Usuario o contraseña incorrectos. ERR: 001');
        // Si el usaurio está deshabilitado se muestra una alerta... ERROR[002]
        else if(resp.res === '002') this.crateAlertController('Upss!', 'Usuario Deshabilitado. Por favor, ponte en contacto con el administrador. ERR: 002');
        // Si todo está correcto...
        else {
          // Se guarda el token en el localStorage
          localStorage.setItem('credentials', resp[0].token_login);
        }
        this.loading.dismiss();
        console.log(localStorage.getItem('credentials'));
      });
    }
  }
  //* Quitar el borde rojo
  public quitBorderError(input: string) {
    if(input === 'username') this.renderer.removeClass(this.username.nativeElement, 'border__error');
    else this.renderer.removeClass(this.password.nativeElement, 'border__error');
  }
  //* Loading
  private async crateLoadingController() {
    this.loading = await this.loadingCtrl.create({
      message: 'Iniciando Sesión...',
      backdropDismiss: false,
      mode: 'md'
    });
    this.loading.present();
  }
  //* alert
  private async crateAlertController(header: string, message: string) {
    this.alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Aceptar'],
      backdropDismiss: false
    });
    this.alert.present();
  }
}
