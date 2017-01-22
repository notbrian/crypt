import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SiteCreator extends React.Component {

  onCreate(event) {
    event.preventDefault();
    const website = this.refs.website.value;
    this.refs.website.value = "";
    this.props.onCreate(website);
  }

  render() {
    return (
      <div className="site-creator">
        <h1>Add Account</h1>
        <Form onSubmit={this.onCreate.bind(this)}>
          <FormGroup>
            <input
              type="text"
              placeholder="Website Name"
              ref="website" />
          </FormGroup>
          <Button>Create</Button>
        </Form>

      </div>
    );
  }
}

export default SiteCreator;
