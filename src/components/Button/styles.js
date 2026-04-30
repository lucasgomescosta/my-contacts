import styled, { css } from "styled-components";


export const StyledButton = styled.button`
  height: 52px;
  border: none;
  padding: 0 16px; // 0 top bottom, 16px left right
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s ease-in;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;



  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: #ccc !important;
    cursor: default !important;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: wait;
    `}

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
