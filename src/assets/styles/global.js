import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Sora', sans-serif;
    }

    body {
        background-color: ${({ theme }) => theme.colors.background};
        font-size: 16px;
        color: ${({ theme }) => theme.colors.gray[900]};
        overflow: hidden;
    }

    button {
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 999px;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    }
`;
