// import { Route, Routes } from 'react-router-dom';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import Login from './pages/Login';
// import Homepage from './pages/Homepage';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60 * 1000,
//     },
//   },
// });

import GlobalStyle from './styles/GlobalStyles';
import styled from 'styled-components';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.main`
  background-color: var(--color-blue-100);
  padding: 20px;
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Row type="horizontal">
          <Heading as="h1">Hello World</Heading>
          <div>
            <Heading as="h2">Email</Heading>
            <Input type="email" placeholder="Email" />
          </div>
        </Row>

        <Row type="vertical">
          <Heading as="h3">Submit</Heading>
          <form>
            <Button>Log in</Button>
            <Button variation="secondary" size="medium">
              Sign up
            </Button>
          </form>
        </Row>
      </StyledApp>
    </>
    // <QueryClientProvider client={queryClient}>
    //   <ReactQueryDevtools initialIsOpen={false} />
    //   <Routes>
    //     <Route index element={<Homepage />} />
    //     <Route path="login" element={<Login />} />
    //   </Routes>
    // </QueryClientProvider>
  );
}

export default App;

/*
isLoading is now called isPending

The cacheTime option is now called gcTime
*/
