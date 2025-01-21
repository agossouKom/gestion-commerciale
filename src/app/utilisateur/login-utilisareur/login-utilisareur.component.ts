import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/my-service/user-info.service';
import { UtilisateurService } from 'src/app/my-service/utilisateur.service';

@Component({
  selector: 'app-login-utilisareur',
  templateUrl: './login-utilisareur.component.html',
  styleUrls: ['./login-utilisareur.component.css'],
})
export class LoginUtilisareurComponent {
  signinForm: FormGroup;
  public usenameTest: any;
  public passwordTest: any;
  isLoading = false;
  checkLoading = false;
  message:any;
  userNotExist:any='Mot de passe ou identifian non valide';
  constructor(
    public fb: FormBuilder,
    public authService: UtilisateurService,
    public router: Router,
      public userInfoService: UserInfoService
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
   // window.location.reload();
   // return;
  }

  loginUser() {
     // this.isLoading = true;
    if (this.signinForm.value.username && this.signinForm.value.password) {
      this.isLoading = true;
      this.authService.signIn(this.signinForm.value);
      //  console.log(this.signinForm.value);

    this.userInfoService.sleep(this.userInfoService.ms).then(() => {
      this.checkLoading = true;
      this.message= this.userInfoService.connexion;

        // console.log('data   = ', data);
    });

    }else{
      this.isLoading = false;
//userNotExist
    }
  }

}
