import { useState, useCallback } from 'react';

import MainCard from 'ui-component/cards/MainCard';
import Stack from '@mui/material/Stack';
import { useEpg, Epg, Layout } from '@nessprim/planby';

import Execuiter from './components/Execuiter';
import Ticket from './components/Ticket';
import TicketShort from './components/TicketShort';
import UnassignedTicket from './components/UnassignedTicket';
import TicketEditModal from './components/TicketEditModal';

import { execuiters, tickets } from './data';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

const theme = {
  primary: {
    600: colors.paper,
    900: colors.paper,
  },
  grey: { 
    300: colors.grey700 
  },
  white: colors.secondary200,
  green: {
    200: colors.secondary200,
  },
  scrollbar: {
    thumb: {
      bg: colors.grey300,
    },
  },
  gradient: {
    blue: {
      300: colors.secondaryLight,
      600: colors.secondaryLight,
      900: colors.secondaryLight,
    },
  },
  text: {
    grey: {
      300: colors.grey700,
      500: colors.grey700,
    },
  },
  timeline: {
    divider: {
      bg: colors.grey500,
    },
  },
};

const START_DAY_DATE = '2023-12-15T00:00:00';
const END_DAY_DATE = '2023-12-16T00:00:00';
const START_WEEK_DATE = '2023-12-14T00:00:00';
const END_WEEK_DATE = '2023-12-21T00:00:00';
const START_MONTH_DATE = '2023-05-01T00:00:00';
const END_MONTH_DATE = '2023-12-31T00:00:00';

const CALENDAR_ITEM_WIDTH = 300;

function ShedulerPage() {
  const [open, setOpen] = useState(false);
  const [assignedTickets, setAssignedTickets] = useState(tickets.assigned);
  const [unassignedTickets, setUnassignedTickets] = useState(tickets.unassigned);
  const [calendarMode, setCalendarMode] = useState("day");
  const [dayWidth, setDayWidth] = useState(7200);
  const [snap, setSnap] = useState(25);
  const [dates, setDates] = useState({
    start: START_DAY_DATE,
    end: END_DAY_DATE,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback((event) => {
    const CALENDAR_CONTENT_CONTAINER = document.querySelector('.planby-content');
    const CALENDAR_EXECUITERS_LIST = Array.from(document.querySelectorAll('.planby-channels>*'));
    const DAY_START_HOUR = 0;

    const channelsHeights = CALENDAR_EXECUITERS_LIST.map((channel) => {
      return channel.offsetHeight;
    });

    const gridXOffset = CALENDAR_CONTENT_CONTAINER.getBoundingClientRect().left + CALENDAR_CONTENT_CONTAINER.scrollLeft;
    const gridYOffset = CALENDAR_CONTENT_CONTAINER.getBoundingClientRect().top + CALENDAR_CONTENT_CONTAINER.scrollTop;
    const droppedXPosition = event.clientX - gridXOffset;
    const droppedYPosition = event.clientY - gridYOffset;
    // console.log('droppedYPosition = ', droppedYPosition)

    const droppedTime = DAY_START_HOUR + droppedXPosition / CALENDAR_ITEM_WIDTH;
    const droppedExecuiter = Math.round(droppedYPosition / 80) > 0 ? Math.round(droppedYPosition / 80) : 1;

    console.log('droppedExecuiter = ', droppedExecuiter)
    // const execuiterId = execuiters.find(execuiter => execuiter.id == temp)

    const hours = Math.floor(droppedTime);
    const minutes = Math.round((droppedTime - hours) * 60 / 5) * 5;

    let startOfDay = new Date(dates.start);
    startOfDay.setHours(hours, minutes);

    if(event.dataTransfer.getData('ticketData')) {
      const dndTicket = JSON.parse(event.dataTransfer.getData('ticketData'));

      dndTicket.since = startOfDay.toISOString();
      dndTicket.till = startOfDay.setMinutes(minutes + 30);
      dndTicket.execuiterId = '1'; //for test
      
      setAssignedTickets((assignedTickets) => assignedTickets.concat(dndTicket));
      setUnassignedTickets(unassignedTickets => unassignedTickets.filter(ticket => ticket.id !== dndTicket.id));
    }
  }, [assignedTickets, unassignedTickets]);

  const { getEpgProps, getLayoutProps } = useEpg({
    epg: assignedTickets,
    channels: execuiters,
    dayWidth: dayWidth,
    startDate: dates.start,
    endDate: dates.end,
    isResize: true,
    channelMapKey: 'id',
    programChannelMapKey: 'execuiterId',
    dnd: { 
      enabled: true, 
      mode: 'multi-rows'
    },
    snap: {
      x: snap
    },
    grid: {
      enabled: true,
      hoverHighlight: true,
      onGridItemClick: (event) => console.log(event)
    },
    overlap: {
      enabled: true,
      mode: 'stack',
      layerOverlapLevel: 0.4,
    },
    // areas: [{
    //   startDate: '2023-12-01T00:00:00',
    //   endDate: '2023-12-31T00:00:00',
    //   styles: {
    //     background: `linear-gradient(-45deg, rgba(0, 0, 0, 0) 48%, ${colors.grey900} 50%, rgba(0, 0, 0, 0) 52%)`,
    //     backgroundColor: colors.grey200,
    //     backgroundSize: '0.5rem 0.5rem',
    //     opacity: 0.5,
    //     cursor: 'default'
    //   },
    //   onClick: (event) => event.preventDefault()
    // }],
    mode: {
      type: calendarMode, 
      style: 'modern'
    },
    theme: theme
  });

  const onChangeCalendarMode = useCallback((e) => {
    if (e.target.value === 'day') {
      setCalendarMode('day');
      setDates({ start: START_DAY_DATE, end: END_DAY_DATE });
      setDayWidth(7200);
      setSnap(25);
    }
    else if (e.target.value === 'week') { 
      setCalendarMode('week');
      setDates({ start: START_WEEK_DATE, end: END_WEEK_DATE });
      setDayWidth(1200);
      setSnap(171);
    }
    else {
      setCalendarMode('month');
      setDates({ start: START_MONTH_DATE, end: END_MONTH_DATE });
      setDayWidth(1500);
      setSnap(171);
    }
  }, 
  []);

  return (
    <Stack direction='row' spacing={2}>
      <MainCard 
        title='Расписание'
        onDragOver={(event) => onDragOver(event)}                    
        onDrop={(event) => onDrop(event)}
      >
        <TicketEditModal 
          open={open}
          closeModal={handleClose}
        />
        <span>Mode:</span>{' '}
        <select onChange={onChangeCalendarMode}>
          <option value='day'>Day</option>
          <option value='week'>Week</option>
          <option value='month'>Month</option>
        </select>
        <Epg {...getEpgProps()}>
          <Layout 
            {...getLayoutProps()} 
            renderChannel={({ channel, ...rest }) => (
              <Execuiter 
                key={channel.uuid} 
                channel={channel} 
                {...rest} 
              />
            )}
            renderProgram={(calendarMode == 'week' || calendarMode == 'month') ? 
              ({ program, ...rest }) => (
                <TicketShort
                  key={program.data.id}
                  program={program}
                  openModal={handleOpen}
                  {...rest}
                />
              ) : ({ program, ...rest }) => (
                <Ticket
                  key={program.data.id}
                  program={program}
                  openModal={handleOpen}
                  {...rest}
                />
              )
          }
          />
        </Epg>
      </MainCard>
      <MainCard 
        title='Заявки'
        sx={{
          minWidth: '240px',
          maxWidth: '320px',
        }}
      >
        {unassignedTickets.map((ticket) => (
          <UnassignedTicket 
            key={ticket.id}
            program={ticket}
          />
        ))}
      </MainCard>
    </Stack>
  );
}

export default ShedulerPage;