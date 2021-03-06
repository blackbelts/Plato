import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MoodleProvider } from '../../providers/moodle/moodle';

/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  username = '7mda';
  password = 'Admin@123';
  error='';
  userId;

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public moodleProvider: MoodleProvider
  ) {
    this.menu.swipeEnable(false);
  }
  setUser(user){
    this.userId = user[0].id;
    this.moodleProvider.setUserId(this.userId);
  }

  // go to register page

  // login and go to home page
  login() {
    this.moodleProvider.loginRequest(this.username,this.password)
    .subscribe((res)=>{
      this.moodleProvider.setToken(res.token);
      if(typeof this.moodleProvider.getToken() === "undefined"){
        console.log("error");

      }
      else {
        this.nav.setRoot(HomePage);
        this.moodleProvider.setUserName(this.username);
        this.moodleProvider.setPassword(this.password);
        this.moodleProvider.getUserInformation('username',this.username)
        .map(res=>res)
        .subscribe((user)=>{
          this.setUser(user);
        });
      }
    });


    /*if(this.moodleProvider.loginRequest(this.username,this.password)){
      this.error='';
      this.nav.setRoot(HomePage);
    }
    else{
      this.nav.setRoot(LogInPage);
      this.error='invalid user name and password';
    }*/
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

}
