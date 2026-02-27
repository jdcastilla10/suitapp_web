import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const colorTheme = createTheme({
    // se lista la paleta de colores de la app
    palette:{
        primary:{
            main:'#87CBB9'
        },
        secondary:{
            main:'#543884'
        },
        error:{
            main:red.A400
        }
    }
})
