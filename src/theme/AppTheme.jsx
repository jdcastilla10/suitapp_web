import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { colorTheme } from './colorTheme';

export const AppTheme = ({children}) => {
  return (
    //proporciona los estilos de la app
    <ThemeProvider theme={colorTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
