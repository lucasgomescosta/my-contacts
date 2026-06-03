import GlobalStyle from "../../assets/styles/global";
import { ThemeProvider } from "styled-components";
import defaultTheme from "../../assets/styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, ScrollArea, Content } from "./styles"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "../../contexts/AuthContext";

import Header from "../Header";
import Routes from "../../Router";
import ToastContainer from "../Toast/ToastContainer";
import Footer from "../Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} position="top-left" />

            <Container>
              <Header />
              <ScrollArea>
                <Content>
                  <Routes />
                </Content>
              </ScrollArea>

              <Footer />
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
