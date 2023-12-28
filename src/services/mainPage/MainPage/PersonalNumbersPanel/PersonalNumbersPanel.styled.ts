import styled, { css } from "styled-components";

export const Wrapper = styled.div`
   display: flex;
   gap: 8px;
   align-items: center;
   overflow: scroll;

   &::-webkit-scrollbar {
      display: none;
   }
`;

const personalNumberActiveCSS = css`
   background: rgba(24, 158, 233, 0.16);
   border-color: transparent;
   font-weight: 600;
`;

export const PersonalNumber = styled.div<{ isActive: boolean }>`
   border-radius: 8px;
   border: 1px solid #dcdee4;
   cursor: pointer;
   display: flex;
   padding: 12px;
   align-items: center;
   gap: 4px;
   transition: 0.2s;
   height: 20px;

   ${({ isActive }) => isActive && personalNumberActiveCSS}

   &:active {
      background-color: #d3d3d3;
   }
`;

export const CheckCircle = styled.div`
   min-width: 16px;
   height: 16px;
   background: #007aff;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 8px;
`;

export const AddPersonalNumberButton = styled.div`
   display: flex;
   padding: 12px;
   align-items: center;
   gap: 4px;
   border-radius: 8px;
   border: 1px dashed #dcdee4;
   height: 20px;

   color: #007aff;
   font-size: 14px;
   font-style: normal;
   font-weight: 400;
   line-height: 16px;
   letter-spacing: -0.4px;
   cursor: pointer;

   white-space: nowrap;
`;
