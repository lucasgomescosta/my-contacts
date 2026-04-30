// components/Header/styles.js
import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 82px;
  padding: 0 36px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  background: linear-gradient(135deg, #111827, #0f172a);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.22);
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Logo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 70px;
    height: 70px;
  }
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #fff;
    font-size: 18px;
    line-height: 1;
  }
`;

export const BrandText = styled.span`
  color: #94a3b8;
  font-size: 12px;
  margin-top: 4px;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
`;

export const MenuItem = styled.li`
  a {
    text-decoration: none;
    color: #cbd5e1;
    font-weight: 600;
    font-size: 15px;
    padding: 10px 18px;
    border-radius: 10px;
    transition: 0.2s ease;
  }

  a:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
  }

  a.active {
    background: #2563eb;
    color: #fff;
  }
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export const UserRole = styled.span`
  color: #94a3b8;
  font-size: 12px;
`;
