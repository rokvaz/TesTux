import { GetStaticProps } from 'next';

interface Props {
  data: any;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const ReadJsonFile: React.FC<Props> = ({ data }) => {
  const shuffledData = shuffleArray(data); 
  const formattedData = JSON.stringify(shuffledData, null, 2);
  return (
    <div>
      <pre>{formattedData}</pre>
      <br />
      <br />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = require('./test.json');

  return {
    props: {
      data,
    },
  };
};

export default ReadJsonFile;