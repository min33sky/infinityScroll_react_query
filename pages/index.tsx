import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Example from '../components/Example';
import InfinityScrollPractice from '../components/InfinityScrollPractice';
import Optimistic from '../components/Optimistic';
import TodoCounter from '../components/TodoCounter';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <InfinityScrollPractice />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
