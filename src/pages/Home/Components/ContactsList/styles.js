import styled from "styled-components";

export const ListHeader = styled.header`
    margin-top: 24px;
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

    img {
        transform: ${({ $orderBy }) => ($orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
        transition: transform 0.2s ease-in;
    }
`;

export const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #2a2f35;

    transition: 0.2s;

    & + & {
        margin-top: 16px;
    }

    &:hover {
        border: 1px solid #4f6cff;
        transform: translateY(-2px);
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
       gap: 12px
    }

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
    background: #4f6cff;
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
    background: #ff5c5c;
    color: #fff;
  }
`;

