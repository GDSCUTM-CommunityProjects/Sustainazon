import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#E5FCF1",
    200: "#27EF96",
    300: "#10DE82",
    400: "#0EBE6F",
    500: "#0CA25F",
    600: "#0A864F",
    700: "#086F42",
    800: "#075C37",
    900: "#064C2E",
    1000: "#DBEAC6",
  },
  secondary: {
    100: "#eff6e6",
    200: "#dbeac6",
    300: "#c7dea6",
    400: "#bdd997",
    500: "#9fc767",
  },
  other: {
    orders: "#eeeeee",
  },
  footer: {
    100: "#497D59",
  },
};

const theme = extendTheme({ colors });
export default theme;
