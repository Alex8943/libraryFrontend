import { Grid, GridItem } from "@chakra-ui/layout";
import { Box, CSSReset, ChakraProvider } from "@chakra-ui/react"
import "./App.css";
import '@fontsource/libre-baskerville/700.css'
import '@fontsource/libre-baskerville/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/400.css'
import Theme from "./theme";

import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./components/home/Home"
import NavBar from "./components/navigation/navbar";
import FooterBar from "./components/navigation/footer"
import { UserProvider } from "./components/user/userContext";

const queryClient = new QueryClient();

function App() {

  return (
    <ChakraProvider theme={Theme}>
      <UserProvider>
        <CSSReset />
        <QueryClientProvider client={queryClient}>
          <Grid
            templateAreas={{
              base: `"nav" "main" "footer"`,
              lg: `"nav nav" "aside main" "footer"`,
            }}
          >
            <GridItem gridArea="nav" className="nav" width={"100%"}>
              <NavBar />
            </GridItem>

            <GridItem gridArea="main">
              <Home />
            </GridItem>
            <GridItem gridArea="footer" >
              <FooterBar />
            </GridItem>
          </Grid>
        </QueryClientProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;