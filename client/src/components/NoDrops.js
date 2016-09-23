import React from 'react';
import * as Icons from '../utils/Icons';
import '../styles/Nav.css';

const NoDrops = props => (
  <div className="no-drops">
  <small>No Dropped Messages.</small>
  <p>Add one now!</p>
  <div className="arrow bounce"></div>
  </div>
)

export default NoDrops
