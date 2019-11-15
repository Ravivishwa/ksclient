import React, { Component } from 'react'
import { Button, Modal,Icon,Grid,Segment } from 'semantic-ui-react'

class AddSessionGuests extends Component {

  render() {
    const { sessions,sessionNo } = this.props.event
    return (
      <div>
        <Modal size={'tiny'} open={this.props.event.open}>
          <Modal.Header style={{backgroundColor:"lightgray"}}>
            Add Guests: [Session {sessionNo}]
            <Icon name='times circle' style={{float:"right"}} onClick={() => this.props.close()} color={'grey'}/>
          </Modal.Header>
          <Modal.Content>
            <Grid columns='3'>
                {
                  sessions ?sessions.event_guests.map((data) => (
                    <Grid.Column key={data.guest.id}>
                      <Segment onClick={(e) => this.props.onSelect(data.guest.id)}>
                        {data.guest.firstName} {data.guest.lastName}
                        <Icon className={this.props.selected.includes(data.guest.id) ? 'circle check': ''}  style={{float:"right"}} color={'grey'}/>
                      </Segment>
                    </Grid.Column>
                  )):''
                }
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button content='Add' fluid onClick={() => this.props.addGuests(this.props.currentSession,this.props.selected)}/>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default AddSessionGuests
