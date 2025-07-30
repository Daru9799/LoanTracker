import { StyleSheet} from 'react-native'
import React from 'react'
import { SegmentedButtons } from 'react-native-paper';

type StatusToggleButtonsProps = {
    initialStatus: boolean;
    onStatusChange: (status: boolean) => void;
    disabled: boolean; 
    labels?: [string, string];
}

const StatusToggleButtons = ({ initialStatus, onStatusChange, disabled = false, labels = ['Not Returned', 'Returned'] } : StatusToggleButtonsProps) => {
  const [status, setStatus] = React.useState(initialStatus);

  const handleValueChange = (value: string) => {
    const newStatus = value === 'true';
    if (newStatus === status) return;
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <SegmentedButtons
      value={status ? 'true' : 'false'}
      onValueChange={handleValueChange}
      buttons={[
        {
          value: 'false',
          label: labels[0],
          disabled: disabled,
        },
        {
          value: 'true',
          label: labels[1],
          disabled: disabled,
        },
      ]}
    />
  );
};

export default StatusToggleButtons

const styles = StyleSheet.create({})