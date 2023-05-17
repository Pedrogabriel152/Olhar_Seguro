import logo from './img/img.png'

type Props = {
    alt: string
}

const Image = ({alt}: Props) =>{

    return(
        <>
        <img src={logo} style={{marginTop: "150px"}} />
        </>
    )
}
export default Image