import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

// import dayjs from 'dayjs';

import { useTheme } from '@mui/material/styles';

// const DATETIME_STRING_FORMAT = 'DD.MM.YYYY hh:mm';

const UnassignedTicket = ({ openModal, program }) => {
  const theme = useTheme();

  const onDragStart = (event, program) => {
    const ticketData = JSON.stringify(program);
    event.dataTransfer.setData('ticketData', ticketData);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box
      onDragStart={(event) => onDragStart(event, program)}
      draggable
      sx={{
        border: `1px solid ${theme.palette.grey[700]}`,
        borderRadius: `8px`,
        padding: '16px',
        '&:not(:last-child)': {
          marginBottom: '16px'
        }
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Typography 
          variant='h4' 
          component='h3' 
          gutterBottom
        >
          {program.title}
        </Typography>
        <IconButton aria-label='Show More' size='small' color='secondary' onClick={() => openModal()}>
          <OpenInNewRoundedIcon fontSize='inherit' />
        </IconButton>
      </Stack>
      <Typography 
        variant='body2'
        gutterBottom
      >
        {program.description}
      </Typography>
      {/* <Typography variant='caption'>
        {dayjs(program.since).format(DATETIME_STRING_FORMAT)} - {dayjs(program.till).format(DATETIME_STRING_FORMAT)}
      </Typography> */}
    </Box>
  );
};

export default UnassignedTicket;
