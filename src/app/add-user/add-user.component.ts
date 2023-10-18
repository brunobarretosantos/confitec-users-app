import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User, UserRequest, userInit } from '../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  user: User = userInit;
  public errors: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (!this.user.nome || this.user.nome === '') {
      this.errors = ['Informe o nome']
      return
    }

    if (!this.user.sobrenome || this.user.sobrenome === '') {
      this.errors = ['Informe o sobrenome']
      return
    }

    if (!this.user.email || this.user.email === '') {
      this.errors = ['Informe o e-mail']
      return
    }

    if (!this.user.dataNascimento || this.user.dataNascimento === '') {
      this.errors = ['Informe a Data de Nascimento']
      return
    }

    const userRequest: UserRequest = { ...this.user, escolaridade: this.user.escolaridade.descricao }

    this.userService.addUser(userRequest).subscribe((response) => {
      console.log('response', response)
      this.router.navigate(['/users/', response.id]);
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
