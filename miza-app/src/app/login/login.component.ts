import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  currentUser: User | undefined;
  isLogin: boolean = false;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
      if (authService.currentUser != null){
        this.currentUser = this.authService.currentUser;
        this.isLogin = true;
        this.router.navigate(['/product']);
      }
    }

  GetControl(name:string): AbstractControl | null{
    return this.formLogin.get('username');
  }
  onSubmit(){
    if (this.formLogin.valid){
      this.authService.login(this.formLogin.value).subscribe(next => {
        this.isLogin = true;
        this.currentUser = next.user;
        this.router.navigate(['/product']);
      }
      , err => {
        console.log(err);
        this.formLogin.setErrors({isLogin: true});
      });
    }
  }
  ngOnInit() {
  }

}
