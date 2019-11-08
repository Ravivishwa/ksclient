import React, { Component } from 'react'
import { Button, Modal,Icon,Grid,Segment } from 'semantic-ui-react'

class AddSessionGuests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected:[]
    };
  }

  onSelect = (id) => {
    const { selected } = this.state;
    const remove = selected.includes(id);
    let list = remove ? selected.filter(i => i !== id) : [...selected, id];
    list = [...new Set(list)];
    this.setState({ selected: list});
  }

  addGuests = () => {
    console.log(this.state.selected);
  }


  render() {
    const { guests,sessionNo } = this.props.event
    console.log(this.props)
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
                  guests ? guests.map((guest) => (
                    <Grid.Column key={guest.id}>
                      <Segment onClick={(e) => this.onSelect(guest.id)}>
                        {guest.firstName} {guest.lastName}
                        <Icon className={this.state.selected.includes(guest.id) ? 'circle check': ''}  style={{float:"right"}} color={'grey'}/>
                      </Segment>
                    </Grid.Column>
                  )):''
                }
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button content='Add' fluid onClick={() => this.addGuests()}/>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default AddSessionGuests
