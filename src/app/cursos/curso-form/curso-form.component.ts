import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CursosService } from './../services/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css'],
})
export class CursoFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private _snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      nome: [null],
      categoria: [null],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSubmit(),
      (error) => this.onError()
    );
  }

  onCancelar() {}
  private onError() {
    this._snackBar.open('Erro ao salvar curso.', '', { duration: 3000 });
  }
}
