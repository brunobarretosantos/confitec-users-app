import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-upload-historico-escolar',
  templateUrl: './upload-historico-escolar.component.html',
  styleUrls: ['./upload-historico-escolar.component.scss']
})
export class UploadHistoricoEscolarComponent {
  userId: number | undefined;
  file: File | undefined;
  user: User;
  public errors: string[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userService.getUser(this.userId).subscribe(data => {
        this.user = data;
      },
      error => {
        if (error.status === 404) {
          this.router.navigate(['/users']);
        }
      });
    });
  }

  onSubmit() {
    this.errors = [];

    console.log('this.file', this.file)

    if (!this.file || !this.file.name) {
      this.errors = ['Selecione um arquivo válido']
      return
    }

    const fileExtension = this.file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'pdf' && fileExtension !== 'doc' && fileExtension !== 'docx') {
      this.errors = ['Por favor, selecione um arquivo PDF ou DOC.'];
      return;
    }

    const formData = new FormData();
    formData.append('historicoEscolar', this.file, this.file.name);

    this.userService.uploadHistoricoEscolar(this.user.id, formData).subscribe(response => {
      this.router.navigate(['/users']);
    },
      (error) => {
        console.log("error", error)
        if (error.status === 400) {
          this.errors = [ error.error ];
        } else {
          this.errors = ['Ocorreu um erro ao processar a requisição. Tente novamente mais tarde.'];
        }
      }
    );
  }

  onFileSelected(event: any) {
    this.errors = [];
    const file: File = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'pdf' && fileExtension !== 'doc' && fileExtension !== 'docx') {
        this.errors = ['Por favor, selecione um arquivo PDF ou DOC.'];
        return;
      }

      this.file = file;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

}
