import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #a2d9eb;
  padding-inline: 16px;
  height: 64px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 4px;
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const Button = styled.Pressable`
  background-color: #d7e2e9;
  height: 32px;
  width: 32px;

  justify-content: center;
  align-items: center;

  border-radius: 4px;
  border-width: 1px;
  border-color: #bdbdbd;
`;

export const DateText = styled.Text`
  font-size: 18px;
`;
