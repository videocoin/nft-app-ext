import { Hero, Container, Video } from './styles';

const Player = (props: any) => {
  const { url } = props;
  return (
    <Hero>
      <Container>
        <Video>
          <video controls loop autoPlay muted playsInline src={url} />
        </Video>
      </Container>
    </Hero>
  );
};

export default Player;
