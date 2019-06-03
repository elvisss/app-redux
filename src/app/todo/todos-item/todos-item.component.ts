import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico', {static: true}) txtInputFisico: ElementRef;
  editando: boolean;

  checkField: FormControl;
  txtInput: FormControl;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {

    this.checkField = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.checkField.valueChanges
      .subscribe( () => {
        const action = new ToggleTodoAction( this.todo.id );
        this.store.dispatch(action);
      });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if ( this.txtInput.invalid || this.txtInput.value === this.todo.texto ) {
      return;
    }

    const action = new EditarTodoAction( this.todo.id, this.txtInput.value );
    this.store.dispatch(action);
  }

  borrarTodo() {
    const action = new BorrarTodoAction( this.todo.id );
    this.store.dispatch(action);
  }

}
