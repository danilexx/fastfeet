import * as React from 'react';
import { Container, Initials, Photo } from './styles';
import getImgUrl from '../../utils/getImgUrl';

const DeliverymanPhoto = ({ size = 60, info, ...props }) => {
  const { name } = info;
  const initials = React.useMemo(() => {
    const [first, second] = name.split(' ');
    return `${first[0].toUpperCase()}${
      second ? second[0].toUpperCase() : first[1] ? first[1].toUpperCase() : ''
    }`;
  }, [name]);

  if (info && info.avatar) {
    return (
      <Photo
        size={size}
        source={{ uri: getImgUrl(info.avatar.path) }}
        {...props}
      />
    );
  }

  return (
    <Container size={size} {...props}>
      <Initials size={size}>{initials}</Initials>
    </Container>
  );
};

export default DeliverymanPhoto;
