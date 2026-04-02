import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 24px;

   a {
    display: flex;
    align-itens: center;
    text-decoration: none;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-size: 14px;
      font-weight: bold;
    }

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
   }

   h1 {
    font-size: 24px;
   }

`;
