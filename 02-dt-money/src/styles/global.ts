import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    :root {
        --background: #f8f2f5;
        --red: #e52e4d;
        --blue: #5429cc;
        --blue-light: #6933ff;
        --text-title: #363f5f;
        --text-body: #696cb3;
        --shape:#ffffff;

        @media screen and (max-width: 1000px) {
            font-size: 93.75%;
        }

        @media screen and (max-width: 720) {
            font-size: 87.5%;
        }

    }

    body, textarea, input,button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong, b {
        font-weight: 600;
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }


    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

`;
