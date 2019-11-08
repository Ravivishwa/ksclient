import React from "react";
import {
  Typography,
} from "@material-ui/core";
import dateFns from "date-fns";
import { Card, Table,Grid,Menu } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';
import AddEvent from '../AddEvent/index';

const DisplayDailyCalendar = props => {
  const { selectedDate,classes } = props;
  const { events } = props.calendar;
  const monthStart = dateFns.startOfMonth(selectedDate);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);
  const weekdays = [
    { id: 0, day: "Sun" },
    { id: 1, day: "Mon" },
    { id: 2, day: "Tue" },
    { id: 3, day: "Wed" },
    { id: 4, day: "Thu" },
    { id: 5, day: "Fri" },
    { id: 6, day: "Sat" }
  ];

  const eachWeek = [];
  let daysOfWeek = [];

  let day = startDate;
  let end = endDate;
  let formattedDate;
  let currentMonth;
  let sameMonth;

  const dateFormat = "D";


  let weekNumber = 1;


  while (day <= end) {
    for (let i = 0; i < 7; i++) {
      let sessionIds =[]
      let guestIds =[]
      formattedDate = dateFns.format(day, dateFormat);
      currentMonth  = dateFns.format(day, 'MMM');
      sameMonth = dateFns.isSameMonth(day, selectedDate)
      const cloneDay = day;
      let event = events? events.filter(x => x.event.date.split("T")[0] === dateFns.format(day, 'YYYY-DD-MM')):'';
      console.log(event)
      if(event.length)
      {
        Object.keys(event).forEach(function(key) {
         events[key].event.id
          sessionIds.push(events[key].sessions.id);
          guestIds.push(events[key].guest.id);
        });
      }
      let sessionCount = [... new Set(sessionIds)].length
      let guestCount = [... new Set(guestIds)].length
      let eventId = event.length ? event[0].event.id : '';

      if(sameMonth){
        daysOfWeek.push(
          <Table.Cell key={formattedDate}>
            <Grid textAlign='center' columns={1} onClick={() => props.onDateClick(dateFns.parse(cloneDay),eventId)}
            style={{padding:'11px'}}>
              <Grid.Row >
                <Grid.Column >
                  <Menu fluid vertical className={classes.dateContent} borderless>
                    <Menu.Item className='header' disabled={!eventId}>{currentMonth} {formattedDate}</Menu.Item>
                  </Menu>
                </Grid.Column>
                <Grid.Column >
                  <Menu fluid vertical className={classes.dayCell} borderless>
                    <Menu.Item>
                      {sessionCount>0 ? sessionCount:''}
                      {
                        sessionCount ? (sessionCount > 1 ? " Sessions" : " Session") : <span style={{visibility:'hidden'}}>0 Session</span>
                      }
                    </Menu.Item>
                    {guestCount>0 ? guestCount:''}
                    {
                      guestCount ? (guestCount > 1 ? " Guests" : " Guest") : <span style={{visibility:'hidden'}}>0 Guest</span>
                    }
                  </Menu>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Table.Cell>
        );
      }else{
        daysOfWeek.push(<Table.Cell key={formattedDate}>{}</Table.Cell>)
      }
      day = dateFns.addDays(day, 1);
    }

    eachWeek.push(<Table.Row key={weekNumber}>{daysOfWeek}</Table.Row>);
    daysOfWeek = [];
    weekNumber += 1;
  }
  return (
    <React.Fragment>
        <AddEvent open={props.open} close={props.closeEventModal} selectValue={props.selectValue} {...props}/>
      <Table basic='very'>
      <Table.Header>
        <Table.Row >
          {weekdays.map(day => (
            <Table.Cell key={day.id}>
              <Typography align="center" className={classes.days}>{day.day}</Typography>
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>{eachWeek}</Table.Body>
    </Table>
    </React.Fragment>
  );
};

const styles = theme => ({
  weekDayCell: {
    borderBottom: "none",
  },
  dayCell: {
    border: "none !important",
    borderRadius:"unset !important"
  },
  alignCenter:{
    position:"absolute",
    transform:"translate(-50%,-50%)",
    top:"50%",
    left:"50%",
    width:"100%"
  },
  dateContent:{
    backgroundColor :"lightgrey !important",
    borderRadius:"unset !important"
  },
  days:{
    fontSize: "20px"
  }
});

export default withStyles(styles)(DisplayDailyCalendar);
