import styled from "styled-components/native";

interface ContainerProps {
  reservationType: string;
  isMine: boolean;
  isConfirmed: boolean;
}

export const Container = styled.View<ContainerProps>`
  height: 48px;
  flex: 1;

  border-width: 1px;
  border-color: gray;

  justify-content: center;
  align-items: center;

  background-color: ${({
    reservationType,
    isMine,
    isConfirmed,
  }: ContainerProps) => {
    if (reservationType && !isMine) return "red";
    if (reservationType && isMine && isConfirmed) return "blue";
    if (reservationType && isMine && !isConfirmed) return "orange";
    return "white";
  }};
`;

export const DayText = styled.Text`
  font-size: 18px;
`;
