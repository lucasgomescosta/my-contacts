import GlobalStyle from "../../assets/styles/global";
import { ThemeProvider } from "styled-components";
import defaultTheme from "../../assets/styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { Container, Content } from "./styles"

import Header from "../Header";
import Routes from "../../Routes";
import ToastContainer from "../Toast/ToastContainer";
import Footer from "../Footer";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer />

        <Container>
          <Header />
          <Content>
            <Routes />
          </Content>

          <Footer />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
