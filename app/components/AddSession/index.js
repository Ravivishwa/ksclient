import React, { Component } from 'react'
import { Button, Modal,Icon,Grid,Segment,Input } from 'semantic-ui-react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

class AddEvent extends Component {

  render() {
    return (
      <div>
        <Modal size={'tiny'} open={this.props.open}>
          <Modal.Header style={{backgroundColor:"lightgray"}}>
            Add Event:
            <Icon name='times circle' style={{float:"right"}} onClick={() => this.props.close()} color={'grey'}/>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  icon='map marker alternate'
                  iconPosition='left'
                  placeholder='Location'
                  onChange={e => this.props.selectValue('location',e.target.value)}

                />
              </Form.Field>
              <Form.Field>
                <Input
                  icon='calendar alternate'
                  iconPosition='left'
                  placeholder='Date'
                  value={this.props.date}
                  onChange={e => this.props.selectValue('date',e.target.value)}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button content='Proceed' fluid onClick={this.props.addEvent}/>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default AddEvent

