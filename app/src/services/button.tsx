import { Link } from "react-router-dom"
import { Buttons, Typography, Column } from "../style/Style"

type StringProps = {
    labelButton: string
}

const Button = ({labelButton}: StringProps) =>{

    const handleClick = () =>{
       console.log("Iniciar") 
    }

    return(
        <>
        <Link to={'/aplication'}>
            
            <Buttons onClick={()=>handleClick()}>
                <Typography>
                {labelButton}
                </Typography> 
            </Buttons>
        </Link>
        </>
    )
}

export default Button