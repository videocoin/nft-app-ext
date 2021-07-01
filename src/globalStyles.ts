import '@fontsource/barlow';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/900.css';
import 'swiper/swiper.min.css';
import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section,
  summary {
    display: block;
  }
  audio,
  canvas,
  progress,
  video {
    display: inline-block;
    vertical-align: baseline;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  [hidden],
  template {
    display: none;
  }

  html {
    cursor: default;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0);
    font-family: sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    font-size: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    line-height: 1;
    background: #fff;
  }
  a {
    background: transparent;
  }
  *:focus,
  *:active,
  *:hover {
    outline: none;
  }
  hr {
    box-sizing: content-box;
    height: 0;
  }
  ol,
  ul {
    list-style: none;
  }
  pre {
    tab-size: 4;
    white-space: pre-wrap;
  }
  img {
    border: none;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  button,
  input {
    line-height: normal;
  }
  button,
  select {
    text-transform: none;
  }
  button {
    overflow: visible;
    border: none;
  }
  button,
  html input[type='button'],
  input[type='reset'],
  input[type='submit'] {
    -webkit-appearance: button;
    cursor: pointer;
  }
  button[disabled],
  html input[disabled] {
    cursor: default;
  }
  input[type='checkbox'],
  input[type='radio'] {
    box-sizing: border-box;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  input[type='search'] {
    -webkit-appearance: textfield;
    box-sizing: content-box;
  }
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: none;
    padding: 0;
  }
  textarea {
    overflow: auto;
    vertical-align: top;
  }
  button,
  input,
  select[multiple],
  textarea {
    background-image: none;
  }
  input,
  select,
  textarea {
    border-radius: 0;
    box-shadow: none;
  }
  input,
  textarea {
    resize: none;
    user-select: text;
    font-family: inherit;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  body {
    min-height: 100vh;
    color: #17161a;
    font-family: 'Barlow', system-ui, sans-serif;
    font-feature-settings: 'kern', 'liga', 'calt';
  }
  button {
    background: none;
    border: none;
    font-family: inherit;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  #modal {
    position: absolute;
    z-index: 999999;
    left: 0;
    top: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
