// pages/Categorias/styles.js
import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

export const TitleGroup = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 32px;
    margin-bottom: 6px;
  }

  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
  }
`;

export const AddButton = styled.button`
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 8px;
  background: #4f6cff;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

export const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryCard = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 1px solid #2a2f35;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: 0.2s;

  & + & {
    margin-top: 16px;
  }

  &:hover {
    border-color: #4f6cff;
    transform: translateY(-2px);
  }
`;

export const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  margin-bottom: 4px;
`;

export const CategoryDescription = styled.span`
  color: #888;
  font-size: 14px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

export const EditButton = styled.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  border: 1px solid #4f6cff;
  background: transparent;
  color: #4f6cff;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #b3bffdff;
    color: #fff;
  }
`;

export const DeleteButton = styled.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  border: 1px solid #ff5c5c;
  background: transparent;
  color: #ff5c5c;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #ffbebeff;
    color: #fff;
  }
`;

export const EmptyMessage = styled.p`
  color: #aaa;
  font-size: 16px;
  text-align: center;
  margin-top: 64px;
`;
