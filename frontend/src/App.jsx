import { Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

/*
isLoading is now called isPending

The cacheTime option is now called gcTime
*/
