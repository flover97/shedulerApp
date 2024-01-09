import { ChannelBox } from '@nessprim/planby';

import Typography from '@mui/material/Typography';

const Execuiter = ({ channel }) => {
  const { position, title } = channel;
  return (
    <ChannelBox 
      sx={{
        padding: 2
      }}
    {...position}>
      <Typography variant='h4'>
        {title}
      </Typography>
    </ChannelBox>
  );
};

export default Execuiter;