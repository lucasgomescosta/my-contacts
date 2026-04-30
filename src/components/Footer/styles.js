// components/Footer/styles.js
import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  height: 64px;
  background: #0f172a;
  border-top: 1px solid rgba(255,255,255,0.05);
`;

export const Content = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  height: 100%;
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.span`
  color: #94a3b8;
  font-size: 14px;
`;

export const Right = styled.span`
  color: #64748b;
  font-size: 14px;
`;
