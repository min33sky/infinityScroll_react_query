import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetchTodos, Todos } from '../components/Optimistic';

function useTodos<TData = Todos>(options?: UseQueryOptions<Todos, AxiosError, TData>) {
  return useQuery('todos', fetchTodos, options);
}

export default useTodos;
