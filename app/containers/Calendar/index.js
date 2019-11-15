import React, { Component } from "react";
import { Paper, Typography, IconButton } from "@material-ui/core";
import dateFns from "date-fns";
import { connect } from 'react-redux';
import reducer from './reducer';
import { withRouter } from 'react-router';
import * as actions from './actions';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectCalendar from './selectors';
import DisplayDailyCalendar from "../../components/Calendar/index";
import Box from "@material-ui/core/Box";
import { Container, Icon } from 'semantic-ui-react';
import { compose } from 'redux';

export class Calendar extends Component {
    state = {
        selectedDate: new Date(),
        selectedMonth: new Date(),
        mode: 0,
        showFunctionalHeader: true,
        selected1: null,
        selected2: null,
        functionalMode: false,
        open:false,
        location:'',
        date:'',
        header:'',
    };

    componentDidMount() {
        this.props.setHeader();
        const { eventsLoading,events } = this.props.calendar;
        if (!events && !eventsLoading) {
          this.props.getEvents();
        }
      }

      componentWillMount() {
        this.setState({'header':"Event Manager"})
      }

  renderHeader = () => {
        const dateYearFormat = "YYYY";
        const dateMonthFormat = "MMMM YYYY";
        let header;
        if (this.state.mode === 0) {
            header = (
                <Typography variant="h5">
                    {dateFns.format(this.state.selectedDate, dateMonthFormat)}
                </Typography>
            );
        } else if (this.state.mode === 1) {
            header = (
                <Typography variant="h5">
                    {dateFns.format(this.state.selectedDate, dateYearFormat)}
                </Typography>
            );
        } else {
            const pastFiveYears = dateFns.addYears(this.state.selectedDate, -9);
            const nextFiveYears = dateFns.addYears(this.state.selectedDate, 2);
            header = (
                <Typography variant="h5">
                    {dateFns.format(pastFiveYears, dateYearFormat)} -{" "}
                    {dateFns.format(nextFiveYears, dateYearFormat)}
                </Typography>
            );
        }

        return (
            <Paper
                style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    minHeight: "5%",
                    boxShadow:"none"
                }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                >
                  <Icon name='chevron circle left' style={{paddingRight: "4%"}} color={'grey'} size={'large'} onClick={() => this.onChevronClick(true)}/>
                  {header}
                  <Icon name='chevron circle right'  style={{paddingLeft: "2%"}} color={'grey'} size={'large'} onClick={() => this.onChevronClick(false)}/>
                </Box>
            </Paper>
        );
    };

    onChevronClick = direction => {
        if (direction) {
            if (this.state.mode === 0) {
                this.setState({
                    selectedDate: dateFns.addMonths(this.state.selectedDate, -1)
                });
            } else if (this.state.mode === 1) {
                this.setState({
                    selectedDate: dateFns.addYears(this.state.selectedDate, -1)
                });
            } else {
                this.setState({
                    selectedDate: dateFns.addYears(this.state.selectedDate, -9)
                });
            }
        } else {
            if (this.state.mode === 0) {
                this.setState({
                    selectedDate: dateFns.addMonths(this.state.selectedDate, 1)
                });
            } else if (this.state.mode === 1) {
                this.setState({
                    selectedDate: dateFns.addYears(this.state.selectedDate, 1)
                });
            } else {
                this.setState({
                    selectedDate: dateFns.addYears(this.state.selectedDate, 9)
                });
            }
        }
    };
    selectValue = (type, value) => {
      this.setState({ [type]: value });
    }

    addEvent = () => {
      let data = {
        "location":this.state.location,
        "date":this.state.date
      }
      this.props.addEvent(data);
      this.setState({open:false,location:''})
    }

    onDateClick = (day,id) => {
      if(id){
        return this.props.history.push(`/manageSessions/${id}`);
      }
      this.setState({
        open: true,
        date:dateFns.format(day,'DD/MM/YYYY')
      });
    };

    closeEventModal = () => {
      this.setState({
        open: false
      });
    }

    dates = () => {
        let body
            body = (
                <DisplayDailyCalendar
                    {...this.state}
                    selectedDate={this.state.selectedDate}
                    open={this.state.open}
                    onDateClick={this.onDateClick}
                    calendar = {this.props.calendar}
                    closeEventModal = {this.closeEventModal}
                    selectValue = {this.selectValue}
                    addEvent = {this.addEvent}
                />
            );

        return (
            <div>
                {this.renderHeader()}
                {body}
            </div>
        );
    };

  // renderHeaderTitle = () => {
  //   return(
  //     <CompactSegment basic secondary>
  //       <CompactHeader>
  //         <div style={{verticalAlign: "sub",display:"inline-block",paddingRight: "14px"}}>Manage Session :</div>
  //         <Button size='big' basic color='black' >Monthly</Button>
  //         <Button size='big' basic color='black' >Weekly</Button>
  //       </CompactHeader>
  //       <Button size='massive'>Location</Button>
  //       <Button size='massive'>Add Event</Button>
  //     </CompactSegment>
  //   )
  // }

    render() {
        const { classes } = this.props
        return (
                <Container style={{width:"75%"}} >
                  {this.dates()}
                </Container>
        );
    }
}
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  header:{
    marginLeft: "251px",
    position: "relative",
    marginTop: "-34px",
    fontSize: "21px",
    marginBottom:"17px"
  },
  title:{
    marginRight:"17px"
  }
});

const mapStateToProps = createStructuredSelector({
  calendar: makeSelectCalendar(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => dispatch(actions.getEvents()),
    setHeader: () => dispatch(actions.setHeader()),
    addEvent: (event) => dispatch(actions.addEvent(event))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'calendar', reducer });

export default compose(
  withStyles(styles, {
    name: 'Calendar',
  }),
  withReducer,
  withConnect,
  withRouter,
)(Calendar);

