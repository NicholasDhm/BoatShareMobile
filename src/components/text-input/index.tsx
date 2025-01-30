import React from "react";
import { Input, Container, Title } from "./styles";

type TextInputProps = {
  title?: string;
};

export function TextInput({ title, ...rest }: TextInputProps) {
  return (
    <Container>
      {title ? <Title>{title}</Title> : <></>}
      <Input {...rest} />
    </Container>
  );
}
