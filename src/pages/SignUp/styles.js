import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 24px;
`;

export const Footer = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.gray[700]};
`;
