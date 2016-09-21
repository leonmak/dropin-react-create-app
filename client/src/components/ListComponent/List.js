import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';
import arraySort from 'array-sort';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortType: "date",
    }

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange = (event, index, value) => this.setState({sortType: value});

  render() {
    return (
      <div style={{marginBottom: "27px"}}>
        <div className="row center-xs">
        <div className="col-xs-10">
          <DropDownMenu value={this.state.sortType} onChange={this.handleChange}>
            <MenuItem value={"date"} primaryText="Most Recent" />
            <MenuItem value={"replies"} primaryText="Most Comments" />
            <MenuItem value={"votes"} primaryText="Most Votes" />
            {/*<MenuItem value={"distance"} primaryText="Nearest" />*/}
          </DropDownMenu>
          </div>
        </div>

      {arraySort(this.props.feed, this.state.sortType, {reverse: true})
        .map((feedItem,idx) => {
        return <ListItem
          {...feedItem}
          key={idx}
          idx={idx}
          user={this.props.user}
          isProfile={this.props.isProfile}
          userLocation={this.props.userLocation}
          isDrop={false}
          dropSrc={this.props.dropSrc}
          selectedDropSrc={this.props.selectedDropSrc}
          selectedDropIdx={this.props.selectedDropIdx}
          fetchCommentsForDrop={this.props.fetchCommentsForDrop}
          />;
      })}
      </div>
    );
  }
}

List.PropTypes={
  selectedDropIdx:PropTypes.func.isRequired
}