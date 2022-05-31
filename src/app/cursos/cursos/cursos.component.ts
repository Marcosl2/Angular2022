



import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Curso } from './../model/curso';
import { CursosService } from './../services/cursos.service';



@Component({
  selector: 'app-curso-form',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos$: Observable<Curso[]>;
  displayedColumns = ['nome', 'categoria', 'acoes'];

  // cursosService: CursosService;

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute
    ) {
    // this.cursosService = new CursosService();
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar cursos');
        return of([])
      })
    );
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });

  }
  ngOnInit(): void {

  }
onAdd(){
this.router.navigate(['new'] , {relativeTo: this.route});
}

}




