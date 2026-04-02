import styled from "styled-components";

  export default styled.input`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid #fff;
  border-radius: 8px;
  height: 52px;
  padding: 0 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[900]};
  outline: none;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary.main};
  }
  `;
