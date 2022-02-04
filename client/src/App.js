import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "./theme";

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            Sustainazon
        </ChakraProvider>
    );
}

export default App;
