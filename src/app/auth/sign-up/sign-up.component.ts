import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { LoginForm } from '../models/LoginForm';
import { Subscription } from 'rxjs';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signInForm: LoginForm;
  public loggedInMessage: string;
  public loggedInError: string;
  public register$: Subscription;
  public signUpForm: LoginForm;

  constructor(private _registerService: RegisterService,
              private _router: Router,
              private _sessionStorage: SessionStorageService) {
  }

  public ngOnInit() {
    this.signUpForm = <LoginForm>{};
  }

  public onSumbit(form: LoginForm) {
    this.register$ = this._registerService.register(form)
      .subscribe((res) => {
          this.loggedInError = null;
          this.loggedInMessage = res;
          this._router.navigate(['/app']);
          this._sessionStorage.put('name', form.username);
        },
        (err) => {
          this.loggedInMessage = null;
          this.loggedInError = err;
        });
  }
}
