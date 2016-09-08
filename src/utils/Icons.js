import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export const MUI = iconName => <FontIcon className="material-icons">{iconName}</FontIcon>;
export const FA = iconName => <i className={`fa fa-${iconName}`}></i>
