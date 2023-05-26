import Button from './services/button';
import { ExternalBox, InternalBox, Container, ContainerInterno, Column } from './style/Style';
import { ReactSVG } from 'react-svg';
import logo from './img/logo.svg';


const HomeBox = (props: any) => {

  const label = "Iniciar"

  return (
    <div>
      <Container>
      <InternalBox> 
        <ContainerInterno>
          <Column>
          <ReactSVG src={logo}/>
          </Column>
          <Column>
          <Button labelButton= {label} to='/aplication'/>
          </Column>
        </ContainerInterno>
      </InternalBox>
      </Container>
    </div>
  );
}

export default HomeBox
