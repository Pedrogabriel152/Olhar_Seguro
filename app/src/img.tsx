import styled from 'styled-components'
import logo from './img/img.png'

const Image = (props: any) =>{

const ImgMeta = styled.div`
position: absolute;
border-radius: 15px;
border: none;
width: 100px;
height: 50px;
margin-top: 200px;
margin-left: 150px;
padding: 0.25em 1em;
}
`
    return(
        <>
        <ImgMeta>
        <img src={logo} alt="Olhar Digital" />
        </ImgMeta>
        
        
        </>
    )
}
export default Image