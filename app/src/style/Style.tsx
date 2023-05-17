
import { styled } from 'styled-components';
import logoBack from '../img/teste.png'

export const Body = styled.body`
    color: rgb(var(--foreground-rgb));
    background: linear-gradient(
        to bottom,
        transparent,
        rgb(var(--background-end-rgb))
        )
        rgb(var(--background-start-rgb));
        background-image: url('${logoBack}');
        background-color: #0a89da;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 0px;
        width: auto;
        height: 713px;
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: minmax(600px, 3vh);
    place-items: center;
`;

export const ContainerInterno = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: minmax(250px, 3vh) minmax(150px, 5vh);
    place-items: center;
`;

export const Column = styled.div`
     
`;

export const ExternalBox = styled.div`
    width: 650px;
    height: 500px;
  `;

  export const InternalBox = styled.div`
    background-color: rgba( 255, 255, 240, 1);
    flex-wrap: nowrap | wrap | wrap-reverse;
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
    // background-color: black;
    width: 650px;
    height: 500px;
    border-radius: 50px;
    opacity: [0.9, 0.8, 0.7];
`;

export const Buttons = styled.button`
    background-color: #00B327;
    font-size: 16px;
    font-family:arial, roboto, helvetica;
    font-weight: bold;
    border-radius: 15px;
    border: none;
    width: 150px;
    height: 50px;
    margin-top: auto;
    padding: 0.25em 1em;
    cursor: pointer;
    transition: 0.5s all ease-out;
`;
export const Typography = styled.div`
    color: white;
    font-size: 16px;
`;

// export const Img = styled.div`
//     background-image: url('${logoBack}');
//     background-color: #0a89da;
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: center;
//     margin-top: 0px;
//     width: auto;
//     height: 750px;
// `;

export const AppAplication = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between;
`;

export const AppVideo = styled.div`
    display: flex;
    align-items: center;
    border-radius: 50px;
`;

export const Canva = styled.div`
    position: absolute;
    top: 100px;
`;
