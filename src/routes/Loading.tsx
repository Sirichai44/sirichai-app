import { Skeleton } from '@mui/joy';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Skeleton animation="wave" width={400} height={400} variant="overlay" />
    </div>
  );
};

export default Loading;
