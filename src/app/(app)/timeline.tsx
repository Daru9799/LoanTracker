import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { checkIsLate } from '@/src/functions/checkIsLate';
import ThemedView from '@/src/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ThemedText from '@/src/components/ThemedText';
import { useItemList } from '@/src/api/items';
import useThemeColors from '@/src/hooks/useThemeColors';
import { formatDate } from '@/src/functions/formatDate';
import { useTranslation } from 'react-i18next';

export default function MyTimeline() {
  //API data
  const { data: items, isLoading, error } = useItemList({sortAscending: false});

  //UI theme
  const { normalTextColor } = useThemeColors();
  
  //Translations
  const { t } = useTranslation('common');

  const timelineData = items?.map(item => ({
      time: formatDate(item.return_at?.toString()),
      title: item.title,
      description: item.description || '',
      //Circle color based on status
      circleColor: item.is_returned ? '#009688' : (checkIsLate(item.return_at) ? 'orange' : 'red'),
      circleStyle: item.is_returned ? undefined : { borderWidth: 2, borderColor: '#009688' },
  }));

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ThemedText style={styles.infoText}>{t('failedFetchingData')} {error.message}</ThemedText>;
  }

  if(items && items?.length === 0) {
    return <ThemedText style={styles.infoText}>{t('timelineNoData')}</ThemedText>;
  }
    
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ThemedView style={styles.container}>
        <ScrollView>
          <Timeline
            style={styles.timeline}
            data={timelineData}
            circleSize={22}
            lineColor="#009688"
            timeStyle={[styles.timeStyle]}
            titleStyle={{color: normalTextColor}}
            descriptionStyle={styles.descriptionStyle}
            isUsingFlatlist={false}
          />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeline: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 5
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: '#009688',
    padding: 5,
    borderRadius: 13,
    color: 'white'
  },
  descriptionStyle: {
    color: 'gray',
  },
  infoText: {
    textAlign: 'center',
    marginTop: 7
  }
});
