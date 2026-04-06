import styled from "styled-components";

export const Container = styled.div`
    margin-top: 32px;
    position: relative;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;

    strong {
        font-size: 24px;
    }

    a {
        font-size: 16px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: none;
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
        padding: 8px 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in;

        &:hover {
            background-color: ${({ theme }) => theme.colors.primary.dark};
            color: ${({ theme }) => theme.colors.primary.lighter};
        }
    }
`

export const ListContainer = styled.div`
    margin-top: 24px;

    header {
        margin-bottom: 8px;
        span {
            margin-right: 8px;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.primary.main};
        }

        button {
            background: transparent;
            border: none;
            color: ${({ theme }) => theme.colors.primary.main};
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
`;

export const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
        margin-top: 16px;
    }

    .info {
        .contact-name {
            display: flex;
            align-items: center;

            small {
            background-color: ${({ theme }) => theme.colors.primary.lighter};
            color: ${({ theme }) => theme.colors.primary.main};
            font-weight: bold;
            text-transform: uppercase;
            padding: 4px;
            border-radius: 4px;
            margin-left: 8px;
        }
      }
      span {
       display: block;
       font-size: 14px;
       color: ${({ theme }) => theme.colors.gray[200]};
      }
    }

    .actions {
       display: flex;
       align-items: center;

       button {
        background: transparent;
        border: none;
        margin-left: 8px;
       }
    }

`

export const InputSearchContainer = styled.div`
    /* margin-top: 48px; */
    width: 100%;
    max-width: 450px;

    input {
        width: 100%;
        height: 50px;
        border: none;
        border-radius: 25px;
        padding: 0 16px;
        font-size: 16px;
        color: #000000ff;
        background: #fff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
        outline: 0;
        padding: 0 16px;

        &::placeholder {
            color: #BCBCBC;
        }
    }
`;
