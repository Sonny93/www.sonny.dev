import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

const Avatar = ({ size }: { size: number }) => (
  <Tilt>
    <Image
      height={size}
      width={size}
      style={{
        borderRadius: '50%',
        marginTop: '15px',
        boxShadow: '0 0 10px 1px rgba(0, 0, 0, .25)',
      }}
      src="sept.jpg"
      alt="avatar"
    />
  </Tilt>
);

export default Avatar;
