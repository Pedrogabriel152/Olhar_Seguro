
import { styled } from 'styled-components';
import logoBack from '../img/teste.png'

export const ExternalBox = styled.div`
    width: 650px;
    height: 500px;
  `;

  export const InternalBox = styled.div`
    background-color: rgba( 255, 255, 240, 1);
    width: 650px;
    height: 500px;
    margin-left: 450px;
    margin-top: -620px;
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
    margin-top: 300px;
    padding: 0.25em 1em;
    cursor: pointer;
    transition: 0.5s all ease-out;
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
