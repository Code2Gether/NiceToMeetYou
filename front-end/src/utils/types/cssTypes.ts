import 'styled-components';

export type Color =
    | 'grey.100'
    | 'grey.200'
    | 'grey.300'
    | 'grey.400'
    | 'green.100'
    | 'green.200'
    | 'green.300'
    | 'green.400'
    | 'black'
    | 'white'
    | 'blue'
    | 'red';

export interface Colors {
    100: string;
    200: string;
    300: string;
    400: string;
}

export type Size =
    | 'none'
    | 'xtiny'
    | 'tiny'
    | 'xsm'
    | 'sm'
    | 'md'
    | 'big'
    | 'xbig'
    | 'lg'
    | 'xl'
    | 'huge'
    | 'giant'
    | 'massive';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            grey: Colors;
            green: Colors;
            white: string;
            black: string;
            blue: string;
            red: string;
        };
        sizes: { [size in Size]: string };
        fontFamily: { sans: string; title: string; code: string };
        fontWeight: { normal: 400; bold: 600; heavy: 800 };
        letterSpacing: { sm: string; md: string; lg: string };
        borderRadius: {
            small: string;
            medium: string;
            default: string;
            circle: string;
            large: string;
        };
        borders: { main: string };
        shadows: {
            main: string;
            button: string;
            buttonClick: string;
        };
    }
}
