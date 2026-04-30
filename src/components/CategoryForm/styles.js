import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
`;

export const FormCard = styled.form`
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  background: #15191c;
  border: 1px solid #2a2f35;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 28px;
  margin-bottom: 32px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const Label = styled.label`
  color: #aaa;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Actions = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
  }
`;
