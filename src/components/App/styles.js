import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ScrollArea = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

/* conteúdo centralizado abaixo do header */
export const Content = styled.main`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 56px 32px;
  box-sizing: border-box;
`;
