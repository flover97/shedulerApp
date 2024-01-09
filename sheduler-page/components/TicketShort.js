import {
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  useProgram
} from '@nessprim/planby';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Ticket = ({ openModal, program, ...rest }) => {
  const {
    styles,
    isLive,
    isMouseEvent,
    getMouseEvents
  } = useProgram({
    openModal,
    program,
    ...rest,
  });

  const { data } = program;
  const { title } = data;

  return (
    <ProgramBox
      width={styles.width}
      style={styles.position}
      isDragging={isMouseEvent}
      ref={getMouseEvents().ref}
      {...getMouseEvents()}
    >
      <ProgramContent 
        width={styles.width} 
        isLive={isLive}
      >
        <ProgramFlex>
          <ProgramStack>
            <Stack 
              direction='row' 
              justifyContent='space-between'
            >
              <ProgramTitle>{title}</ProgramTitle>
              <IconButton 
                aria-label='edit' 
                size='small'
                color='secondary'
                onClick={() => openModal()}
              >
                <EditOutlinedIcon fontSize='inherit'/>
              </IconButton>
            </Stack>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};

export default Ticket;