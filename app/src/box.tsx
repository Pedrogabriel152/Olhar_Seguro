import Button from './services/button';
import Image from './img';
import { ExternalBox, InternalBox, Container, ContainerInterno, Column } from './style/Style';

const HomeBox = (props: any) => {

  const label = "Iniciar"

  const alt = "Olhar Digital"

  return (
    <div>
      <Container>
      <InternalBox> 
        <ContainerInterno>
          <Column>
          <Image alt={alt} />
          </Column>
          <Column>
          <Button labelButton= {label}/>
          </Column>
        </ContainerInterno>
      </InternalBox>
      </Container>
    </div>
  );
}

export default HomeBox
