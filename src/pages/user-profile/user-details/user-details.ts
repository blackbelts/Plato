import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public user={}
  ionViewDidLoad() {
    this.user=this.navParams.get("user")
    console.log(this.user)
  }

}
