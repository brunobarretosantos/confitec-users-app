import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { takeUntil, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private destroy$ = new Subject<void>();

  users: any[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userDeleted$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(userId => {
      this.loadUsers();
    });

    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public editUser(userId: number): void {
    this.router.navigate(['/users', userId]);
  }

  confirmDelete(userId: number) {
    const result = confirm(`Tem certeza que deseja excluir o usuário?`);
    if (result) {
      this.deleteUser(userId)
    }
  }

  private deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log(`Usuário excluído com sucesso.`);
        // Atualize a lista de usuários se necessário
      },
      (error) => {
        console.error(`Erro ao excluir o usuário ${userId}:`, error);
      }
    );
  }

  downloadHistoricoEscolar(userId: number) {
    this.userService.downloadHistoricoEscolar(userId)
      .pipe(
        catchError((error) => {
          console.error(error);
          return [];
        })
      )
      .subscribe((response) => {
        console.log('response', response)
        const blob = new Blob([response.body], { type: response.headers.get('content-type') });
        saveAs(blob, `HistoricoEscolar_${userId}.pdf`);
      });
  }
}
