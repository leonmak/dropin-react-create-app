import React from 'react';
import FontIcon from 'material-ui/FontIcon';
export const MUI = iconName => <FontIcon className="material-icons">{iconName}</FontIcon>;
export const FA = iconName => <i className={`fa fa-${iconName}`}></i>
export const FAFixedWidth = iconName => <i className={`fa fa-${iconName} fa-fw`} aria-hidden="true"></i>
