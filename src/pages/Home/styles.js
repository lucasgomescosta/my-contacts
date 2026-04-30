import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    margin-top: 32px;
    position: relative;
`;

export const Header = styled.header`
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

`

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;

export const InputSearchContainer = styled.div`
    width: 100%;
    max-width: 480px;

    input {
        width: 100%;
        height: 50px;
        border: none;
        border-radius: 999px;
        padding: 0 24px;
        font-size: 16px;
        color: #fff;
        background: #15191c;
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.25);
        outline: 0;
        transition: 0.2s;

        &:hover {
            transform: scale(1.02);
            box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.4);
        }

        &::placeholder {
            color: #777;
        }

        &:focus {
          box-shadow: 0 0 0 2px #4f6cff;
        }
    }
`;

export const ErrorContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;

    .details {
        margin-left: 24px;

        strong {
            font-size: 22px;
            color: ${({ theme }) => theme.colors.danger.main};
            display: block;
            margin-bottom: 8px;
        }
    }
`

export const EmptyListContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      color: ${({ theme }) => theme.colors.gray[200]};
      text-align: center;
      margin-top: 8px;

      strong {
        color: ${({ theme }) => theme.colors.primary.main};
      }
    }
`;

export const SearchNotFoundContainer = styled.div`
    margin-top: 16px;
    display: flex;

    span {
        color: ${({ theme }) => theme.colors.gray[200]};
        text-align: center;
        margin-left: 24px;
        word-break: break-word;

        strong {
            color: ${({ theme }) => theme.colors.primary.main};
        }
    }
`

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
