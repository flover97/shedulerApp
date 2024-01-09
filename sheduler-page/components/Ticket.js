import {
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  useProgram,
  ProgramResizeHandle
} from '@nessprim/planby';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Ticket = ({ openModal, program, ...rest }) => {
  const {
    styles,
    formatTime,
    isLive,
    isMouseEvent,
    resizeEvents,
    getMouseEvents,
    getMouseEventTempTime
  } = useProgram({
    openModal,
    program,
    ...rest,
  });

  const { data } = program;
  const { title, since, till } = data;

  const sinceTime = formatTime(since);
  const tillTime = formatTime(till);
  const dragTime = getMouseEventTempTime();

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
        <ProgramResizeHandle {...resizeEvents.eventsLeft} />
        <ProgramResizeHandle {...resizeEvents.eventsRight} />
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
            {/* <ProgramText>{description}</ProgramText> */}
            <ProgramText>
              {getMouseEvents().isDragging || getMouseEvents().isResizing ? (
                <>
                  {dragTime.since} - {dragTime.till}
                </>
              ) : (
                <>
                  {sinceTime} - {tillTime}
                </>
              )}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};

export default Ticket;