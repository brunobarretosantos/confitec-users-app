import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  user: User = new User();
  public errors: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    },
    (error) => {
      if (error.status === 400) {
        this.errors = [ error.error ];
      } else {
        this.errors = ['Ocorreu um erro ao processar a requisição. Tente novamente mais tarde.'];
      }
    }
  );
  }
}
