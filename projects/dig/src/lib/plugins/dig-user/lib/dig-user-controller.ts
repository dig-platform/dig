import {Injectable} from '@angular/core';
import {ActionSheetController, ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {DigUserModel} from './dig-user.model';

export interface UserControllerOptions {
  authRedirect?: string;
  noAuthRedirect?: string;
}

@Injectable({
    providedIn: 'root'
})
export class DigUserController {

    public user = null;

    constructor(
        private actionSheetController: ActionSheetController,
        private toastController: ToastController,
        private digUserModel: DigUserModel,
        private auth: AngularFireAuth) {
        this.auth.authState.subscribe(user => this.user = user);
    }

    async showMenu(options: UserControllerOptions = {}) {
        const buttons = [];
        if (this.user) {
            buttons.push({
                text: 'Sign out',
                icon: 'log-out',
                handler: () => {
                    this.auth.signOut().then(res => {
                      if (options.noAuthRedirect) {
                        // we do a hard redirect to reset the session
                        window.location.href = options.noAuthRedirect;
                      }
                    }).catch(console.error);
                }
            });
        } else {
            buttons.push({
                text: 'Sign in with Google',
                icon: 'logo-google',
                handler: () => {
                    this.googleSignIn().then(res => {
                      if (options.authRedirect) {
                        // we do a hard redirect to reset the session
                        window.location.href = options.authRedirect;
                      }
                    }).catch(console.error);
                }
            });
        }
        buttons.push({
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        });

        const actionSheet = await this.actionSheetController.create({buttons});
        await actionSheet.present();
    }

    private googleSignIn(options: any = {}) {
        options.provider = 'google';
        const provider = new firebase.auth.GoogleAuthProvider();
        // todo support scope
        // todo add state
        if (options.scope) {
            // 'repo read:org'
            provider.addScope(options.scope);
        }
        return this.auth.signInWithPopup(provider);
    }

}
