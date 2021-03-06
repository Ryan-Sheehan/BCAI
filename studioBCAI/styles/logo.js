import React from "react";
import styled, { css } from "styled-components";

const Logo = ({ projectName }) => {
  return (
    <Icon isLogin={projectName}>
      <svg
        width="39"
        height="39"
        viewBox="0 0 39 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 14.0833H2.52778V9.02778H4.69444V6.86111H6.86111V4.69444H9.02778V2.52778H13.7222V0H25.2778V2.52778H29.9722V4.69444H32.1389V6.86111H34.3056V9.02778H36.4722V14.0833H39V25.2778H36.4722V29.9722H34.3056V32.1389H32.1389V34.3056H29.9722V36.4722H25.2778V39H13.7222V36.4722H9.02778V34.3056H6.86111V32.1389H4.69444V29.9722H2.52778V25.2778H0V14.0833Z"
          fill="black"
        />
      </svg>
    </Icon>
  );
};

const Icon = styled.div`
  display: block;
  width: auto;
  height: 100%;
  width: 4em;
  max-width: 100%;
  margin: 1em auto;

  color: black;
  ${(props) =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4em;
      color: black;
    `}
  svg {
    display: block;
    margin: 0 auto;
    height: 4em;
    width: auto;
    fill: currentColor;
  }
`;

export default Logo;
