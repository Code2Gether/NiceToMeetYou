import { DefaultTheme } from 'styled-components';

const grey = {
    100: 'rgb(230, 230, 230)',
    200: 'rgb(204, 204, 204)',
    300: 'rgb(150, 150, 150)',
    400: 'rgb(110, 110, 110)',
};

const green = {
    100: 'rgb(76, 175, 80)',
    200: 'rgb(62, 117, 45)',
    300: 'rgb(74, 84, 77)',
    400: 'rgb(3, 33, 25)',
};

export const theme: DefaultTheme = {
    colors: {
        grey,
        green,
        white: '#ffffff',
        black: '#000000',
        blue: 'rgb(0, 132, 255)',
        red: 'rgb(244, 66, 54)',
    },
    sizes: {
        none: '0rem',
        xtiny: '0.4rem',
        tiny: '0.8rem',
        xsm: '1.2rem',
        sm: '1.4rem',
        md: '1.6rem',
        big: '1.8rem',
        xbig: '2.4rem',
        lg: '2.8rem',
        xl: '3.6rem',
        huge: '4.8rem',
        giant: '6.4rem',
        massive: '7.2rem',
    },
    fontFamily: {
        sans: ['"Open Sans"', 'helvetica', 'sans-serif'].join(', '),
        title: ['"Butler"', 'serif'].join(', '),
        code: ['"Source Code Pro"', 'monospace'].join(', '),
    },
    fontWeight: { normal: 400, bold: 600, heavy: 800 },
    letterSpacing: {
        sm: '0.75px',
        md: '1px',
        lg: '2px',
    },
    borderRadius: {
        small: '2px',
        medium: '4px',
        default: '8px',
        large: '16px',
        circle: '50%',
    },
    borders: {
        main: `2px solid rgba(0,0,0,0.5)`,
    },
    shadows: {
        main: `0 4px 10px rgba(0,0,0,0.5)`,
    },
};
