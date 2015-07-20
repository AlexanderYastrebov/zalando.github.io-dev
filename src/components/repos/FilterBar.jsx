/**
 * Created by aigreja on 15/07/15.
 */
import React from 'react';
import {Button} from 'react-bootstrap';

class FilterBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.filter
    };
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  onOptionChange(language) {
    let newFilter = language;
    //if the user clicks the same button, reset the filter
    if (language === this.state.filter) {
      newFilter = 'all';
    }
    this.setState({
      filter: newFilter
    });
    this.props.onUserInput(newFilter);
  }

  render() {
    return (
      <div className="text-center filter-bar">
        <Button onClick={this.onOptionChange.bind(this, 'all')} active={this.state.filter === 'all'}>All</Button>
        &nbsp;
        <Button className="java-btn" onClick={this.onOptionChange.bind(this, 'Java')} active={this.state.filter === 'Java'}>Java</Button>
        &nbsp;
        <Button className="js-btn" onClick={this.onOptionChange.bind(this, 'JS')} active={this.state.filter === 'JS'}>JavaScript</Button>
        &nbsp;
        <Button className="go-btn" onClick={this.onOptionChange.bind(this, 'Go')} active={this.state.filter === 'Go'}>Go</Button>
      </div>

    );
  }
}

export default FilterBar;
