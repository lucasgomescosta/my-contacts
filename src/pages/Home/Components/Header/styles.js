import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
    display: flex;
    justify-content: ${({ $justifyContent }) => $justifyContent};
    align-items: center;
    margin-top: 32px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};


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

export const AddContactButton = styled(Link)`
  height: 44px;
  padding: 0 20px;
  border-radius: 8px;
  background: #4f6cff;
  color: #fff;
  font-weight: 700;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;
