import React from 'react';
import { Portal, Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  duration?: number;
};

const CustomSnackbar = ({ visible, message, onDismiss, duration = 3000 }: Props) => {
  const { t } = useTranslation('items');

  return (
    <Portal>
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={duration}
            action={{
                label: t('form.gotIt'),
                onPress: onDismiss,
            }}
            >
            {message}
        </Snackbar>
    </Portal>
  );
};

export default CustomSnackbar;