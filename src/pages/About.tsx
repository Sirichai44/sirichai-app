import { Grid } from '@mui/joy';
import Carousol from './components/Carousol';

const About = () => {
  const arr = Array.from({ length: 50 }, (_, i) => i + 1);
  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 12, md: 12 }}
        sx={{ flexGrow: 1, border: '1px solid red' }}> */}
      {/* <div className="w-4/12 overflow-hidden border border-red-400 h-1/6"> */}
      <Carousol />
      {/* </div> */}
      {/* {arr.map((i) => (
          <Grid
            xs={4}
            sm={2}
            md={2}
            lg={6}
            xl={4}
            key={i}
            className="mb-10 mr-5 border border-blue-400 rounded-lg max-h-20">
            <img
              src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg"
              className="object-contain w-full h-full mb-3"
              alt="Certificate"
            />

            {i}
          </Grid>
        ))} */}
      {/* </Grid> */}
    </div>
  );
};

export default About;
