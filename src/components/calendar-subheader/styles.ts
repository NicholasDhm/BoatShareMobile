import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  height: 32px;
  width: 468px;
  padding-inline: 12px;

  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  border-radius: 4px;
`;

export const WeekDay = styled.Text`
  width: 64px;
  font-size: 18px;
  display: flex;
  justify-content: center;
`;
