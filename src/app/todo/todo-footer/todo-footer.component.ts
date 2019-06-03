import { Component, OnInit } from '@angular/core';
import { filtrosValidos, SetFilroAction } from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../models/todo.model';
import { BorrarAllTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;
  filtrosValidos: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: filtrosValidos;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.contadorPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro( nuevoFiltro: filtrosValidos ) {
    const action = new SetFilroAction(nuevoFiltro);
    this.store.dispatch(action);
  }

  contadorPendientes( todos: Todo[] ) {
    this.pendientes = todos.filter( todo => !todo.completado ).length;
  }

  limpiarCompletados() {
    const action = new BorrarAllTodoAction();
    this.store.dispatch(action);
  }

}
