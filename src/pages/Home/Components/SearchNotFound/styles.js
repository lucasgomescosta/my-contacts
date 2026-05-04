import styled from "styled-components";

export const Container = styled.div`
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
