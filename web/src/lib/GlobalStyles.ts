import { createGlobalStyle } from "./StyledComponents";

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
    background-color: ${props => props.theme.background};
  }
  * {
    box-sizing: border-box;
    outline-color: ${props => props.theme.primary};
  }

  html{
    font-size: 62.5%;
  }
  #root{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  div{
    /* padding: 2rem; */
    &#root{
      padding: 0;
    }
  }

  @media (max-width: 1080) {
    html {
      font-size: 58%;
    }
  }

  @media (max-width: 600px) {
    html{
      font-size: 50%;
    }
  }

  p {
    font-size: 1.4rem;
  }

  span {
    font-size: 2rem;
  }

`;
