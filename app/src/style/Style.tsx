import styled from 'styled-components';
import logoBack from '../img/fundo.svg'


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
    height: 100vh;
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
    svg{
        margin-top: 190px;
    }
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
    width: 600px;
    height: 450px;
    border-radius: 100px;
    opacity: [0.9, 0.8, 0.7];
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Buttons = styled.button`
    background-color: #00B327;
    font-size: 16px;
    font-family:arial, roboto, helvetica;
    font-weight: bold;
    border-radius: 30px;
    border: none;
    width: 150px;
    height: 50px;
    margin-bottom: 60px;
    padding: 0.25em 1em;
    cursor: pointer;
    transition: 0.5s all ease-out;
    &:hover{
        background-color: #028309;
        transition: 600ms;
    }
`;

export const Typography = styled.div`
    color: white;
    font-size: 16px;
`;

export const Img = styled.div`
    background-image: url('${logoBack}');
    background-color: #0a89da;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 0px;
    width: auto;
    height: 750px;
`;

export const CameraContainer = styled.div`
    width: 600px;
    height: 450px;
    border-radius: 100px;
    overflow: hidden;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const AppApplication = styled.div`
    display: flex;
    width: auto;
    height: 100vh;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between;
    background-color: #f1eeee;
    
`;

export const AppVideo = styled.div`
    display: flex;
    align-items: center;
    border-radius: 50px;
`;

export const Canva = styled.div`
    position: fixed;
    top: 100px;
`;


export const Button2 = styled.button`
    border: none;
    height: 50px;
    background-color:#f1eeee;
    position: absolute;
    top: 85%;
    overflow: hidden;
`;