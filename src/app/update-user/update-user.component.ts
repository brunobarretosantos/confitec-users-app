import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User, UserRequest, userInit } from '../user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public userId: number;
  public user: User = userInit;


  public errors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userService.getUser(this.userId).subscribe(data => {
        this.user = data;
        this.user.dataNascimento = this.datePipe.transform(data.dataNascimento, 'yyyy-MM-dd');
      });
    });
  }

  public update(): void {
    const userRequest: UserRequest = { ...this.user, escolaridade: this.user.escolaridade.descricao }

    this.userService.updateUser(userRequest).subscribe(() => {
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
