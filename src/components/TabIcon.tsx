import React from 'react';

const defaultSize = 30;
const defaultStrokeWidth = 1.8;

type IconProps = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

type TabIconProps = {
  IconComponent: React.FC<IconProps>;
  color: string;
};

const TabIcon = ({ IconComponent, color } : TabIconProps) => {
  return <IconComponent color={color} size={defaultSize} strokeWidth={defaultStrokeWidth} />;
};

export default TabIcon;