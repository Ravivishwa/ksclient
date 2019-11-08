import React from 'react'
import { withRouter } from 'react-router-dom';
import { Container, Grid, Menu, Segment, Icon, Image, Card, Item, Button } from 'semantic-ui-react';
import dateFns from "date-fns";
import { createStructuredSelector } from 'reselect';
import makeSelectEvent from './selectors';
import injectReducer from 'utils/injectReducer';
import * as actions from '../Session/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import reducer from '../Session/reducer';
import AddSessionGuests from '../../components/AddSessionGuests/index'

class Session extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      mode: props.match.params.mode || '',
      editId: parseInt(props.match.params.id, 10),
      open:false
    };
  }

  componentWillMount() {
    this.props.setHeader();
    const { guestsLoading,guests } = this.props.event;
    if (!guests && !guestsLoading) {
      this.props.getGuests();
    }

    const { getSession } = this.props;
    const { editId } = this.state;
    if (editId) {
      getSession(editId);
    }
  }

  // componentDidMount() {
  //   const { getSession } = this.props;
  //   const { editId } = this.state;
  //   if (editId) {
  //     getSession(editId);
  //   }
  // }

  addGuest = (session,no) =>{
    this.props.addGuest(session,no)
  }

  close = () => this.props.close()

  render() {
    const src = "https://react.semantic-ui.com/images/wireframe/image.png"
    const { event,classes } = this.props;
    const { sessions } = this.props.event;
    console.log("dd",sessions)
    return (
      <React.Fragment>
        <span className={classes.header}>Manage Session</span>
      <Container style={{width:"90%",paddingTop:"50px"}}>
        <Grid >
          <Grid.Row>
            <Grid.Column width={3}>
              <Menu fluid vertical>
                <Menu.Item className='header' style={{fontSize: "20px"}}>Guests</Menu.Item>
                  {event.guests ? event.guests.map((guest) => (
                    <Menu.Item key={guest.id}>
                      <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' verticalAlign='middle' circular />
                      &nbsp;&nbsp;{guest.firstName} {guest.lastName}
                    </Menu.Item>
                  )) : null}
              </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
              {
                sessions ? Object.values(sessions).map((session,i) => (
                  <Menu fluid vertical key={i}>
                    <Menu.Item >Session  {i+1} - {dateFns.format(session.session_time, 'h A')}
                      <Icon name='remove' color={'grey'}/>
                      <Icon name='chat' color={'grey'}/>
                      <Icon name='copy' color={'grey'}/>
                      <Icon name='setting' color={'grey'}/>
                    </Menu.Item>
                    <Menu.Item >
                      <Grid columns={8}>
                        {
                          session ? session.guests.map(data => (
                            <div style={{paddingTop:"1rem",paddingBottom:"3rem"}} key={data.id}>
                              <div className={classes.image}>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4G_u9xXKwuxdDzCLYzOgAyTsxdqQV6IvaeWE21YWEI87a46MT' style={{width:"56px",height:"100%"}} className={classes.imageCenter}/>
                                <div className={classes.textCenter}>
                                  {data.firstName} {data.lastName}
                                </div>
                              </div>
                            </div>
                          )):''
                        }
                        <Grid.Column onClick={() => this.addGuest(session,i+1)}>
                          <div className={classes.image}>
                            <div style={{width:"56px",height:"100%",backgroundColor: "darkgrey",position:"relative"}} className={classes.center}>
                                <Icon name='add' size={'big'} style={{color:"darkgrey",borderRadius:"50%",height:"34px",backgroundColor:"#FFF"}} className={classes.imageCenter}/>
                            </div>
                          </div>
                        </Grid.Column>
                    </Grid>
                    </Menu.Item>
                  </Menu>
                )) : ''
              }
              <Button content='Add Session' fluid onClick={this.props.addEvent}/>
            </Grid.Column>
            <AddSessionGuests
              close={this.close}
              {...this.props}
            />
          </Grid.Row>
        </Grid>
      </Container>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  header:{
    marginLeft: "251px",
    position: "absolute",
    marginTop: "-34px",
    fontSize: "21px",
    marginBottom:"17px"
  },
  imageCenter:{
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    position: "absolute",
  },
  textCenter:{
    top:"130%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    position: "absolute",
    width: "120px",
    border:"none",
    textAlign:"center"
  },
  addGuest:{
    backgroundColor:"FFF"
  },
  image:{
    width:"74px",
    height:"56px",
    position:"relative"
  }
});

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGuests: () => dispatch(actions.getGuests()),
    getSession: id => dispatch(actions.getSession(id)),
    addGuest: (session,no) => dispatch(actions.addGuest(session,no)),
    close: () => dispatch(actions.close()),
    setHeader: () => dispatch(actions.setHeader()),
  };
}

const withReducer = injectReducer({ key: 'event', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles, {
    name: 'Session',
  }),
  withReducer,
  withConnect,
  withRouter,
)(Session);
