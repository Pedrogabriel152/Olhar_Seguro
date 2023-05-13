import Button from './services/button';
import Image from './img';
import { ExternalBox, InternalBox } from './style/Style';

const Box = (props: any) => {

  const label = "Iniciar"

  return (
    <div>
     <ExternalBox>
        <InternalBox>
            <Image/>
            <Button labelButton= {label}/>
        </InternalBox>
     </ExternalBox>
    </div>
  );
}

export default Box
