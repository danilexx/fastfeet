import * as React from "react";
import { Container, PhotoIMG, PhotoFake } from "./styles";
import randomNumber from "-/utils/randomNumber";

const colors = [
  "#83CEC9",
  "#A8D080",
  "#CC7584",
  "#CB946C",
  "#A28FD0",
  "#CCCC8B",
];

export const Photo: React.FC<{ name: string; avatar?: { path: string } }> = ({
  name,
  avatar,
}) => {
  const initials = React.useMemo(() => {
    const [first, second] = name.split(" ");
    return `${first[0].toUpperCase()}${
      // eslint-disable-next-line no-nested-ternary
      second ? second[0].toUpperCase() : first[1] ? first[1].toUpperCase() : ""
    }`;
  }, [name]);
  const color = React.useMemo(() => {
    return colors[randomNumber(0, colors.length - 1)];
  }, []);
  if (avatar) {
    return (
      <PhotoIMG
        color={color}
        as="img"
        src={`http://localhost:1234/files/${avatar.path}`}
      />
    );
  }
  return <PhotoFake color={color}>{initials}</PhotoFake>;
};

const DeliveryManPhoto = (props: any) => {
  const { row } = props;
  const currentRow = row.original;
  const { deliveryman: name, avatar } = currentRow;

  return (
    <Container>
      <Photo avatar={avatar} name={name} />
      {name}
    </Container>
  );
};

export default DeliveryManPhoto;
