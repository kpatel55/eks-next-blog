import { createTheme, Theme, responsiveFontSizes } from "@mui/material/styles";

let theme: Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1920
        }
    },
    palette: {
        background: {
            default: '#111111',
            paper: '#FFFFFF'
        },
        primary: {
            main: '#DBDFFD',
            dark: '#000000',
            contrastText: '#FFFFFF'
        }
    },
    typography: {
        button: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.375,
            letterSpacing: '0.2rem',
        },
        h1: {
            fontWeight: 700,
            fontSize: '9.6rem',
            lineHeight: 1,
        },
        h2: {
            fontWeight: 700,
            fontSize: '7.3rem',
            lineHeight: 1.175
        },
        h3: {
            fontWeight: 700,
            fontSize: '5.15rem',
            lineHeight: 1.375
        },
        h4: {
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.375
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.5rem',
            lineHeight: 1.375
        },
        h6: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.375,
            letterSpacing: '0.2rem'
        },
    }
});

theme = responsiveFontSizes(theme);

export default theme;