import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [new Todo('Salvar al mundo'), new Todo('Vencer a Thanos'), new Todo('Conocer al diablo')];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, textoToEdit }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: textoToEdit,
        };
      } else {
        return todo;
      }
    });
  }),
  // Aqui se puede usar el filter pq retorna un nuevo objeto y asi no muta el state
  on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(limpiarCompletados, (state) => state.filter((todo) => !todo.completado)),
  on(toggleAll, (state, { isToggleAll }) =>
    state.map((todo) => {
      return {
        ...todo,
        completado: isToggleAll,
      };
    })
  )
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
