import styled from "styled-components";

export const Input = styled.div`
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

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;
