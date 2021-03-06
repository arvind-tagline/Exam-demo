import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changeForm!: FormGroup;
  public token: any;

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private toster: ToastrService) {
    this.token = localStorage.getItem('token');
    this.changeForm = this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    this.userService.tokenCheckPassword().subscribe({
      next: (res) => {
        console.log('res :>> ', res);
      }
    })
  }


  public onChange() {
    this.userService.changePassword(this.token, this.changeForm.value).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.toster.success(res.message);
          console.log('res :>> ', res);
        } else {
          this.toster.error(res.message);
        }
      },
      error: (err) => {
        this.toster.error(err.message);
      }
    })
  }
  get fControl() {
    return this.changeForm.controls;
  }
}
