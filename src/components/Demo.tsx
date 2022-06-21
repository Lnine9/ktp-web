import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  
`

interface DemoProps{
  demo: string;
  unnecessary?: string;
}

const Demo = ({demo, unnecessary}: DemoProps) => {

  return (
    <Wrapper>
      {demo}
    </Wrapper>
  )

}

export default Demo