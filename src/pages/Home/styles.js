import styled from "styled-components";

export const Container = styled.div`
    margin-top: 32px;
    position: relative;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

export const PaginationButton = styled.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
  }
`;

export const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary.main : 'transparent'};
  background: ${({ $active, theme }) => $active ? theme.colors.primary.main : 'transparent'};
  color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.text};
  font-weight: ${({ $active }) => $active ? 700 : 400};
  cursor: ${({ $active }) => $active ? 'default' : 'pointer'};
  transition: 0.2s;

  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.primary.main};
  }
`;

