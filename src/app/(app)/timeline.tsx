import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { checkIsLate } from '@/src/functions';
import ThemedView from '@/src/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ThemedText from '@/src/components/ThemedText';
import { useItemList } from '@/src/api/items';
import dayjs from 'dayjs';
import useThemeColors from '@/src/hooks/useThemeColors';

function formatDate(date: string|undefined) {
  console.log(dayjs(date))
  if (!date) {
    return 'TBD';
  }
  const parsed = dayjs(date)
  const day = String(parsed.date()).padStart(2, '0');
  const month = String(parsed.month() + 1).padStart(2, '0');
  return `${day}.${month}`;
}

export default function MyTimeline() {
    const { data: items, isLoading, error } = useItemList({sortAscending: false});
    const { normalTextColor } = useThemeColors();

    //Format danych pod timeline
    const isLate = (date1: Date | undefined, isReturned: boolean) => {
        return checkIsLate(date1, isReturned)
    }
    
    const timelineData = items?.map(item => ({
        // time: formatDateToDayMonth(item.return_at),
        time: formatDate(item.return_at?.toString()),
        title: item.title,
        description: item.description || '',
        //Kolor kółka w zależności od stanu:
        circleColor: item.is_returned ? '#009688' : (isLate(item.return_at, item.is_returned) ? 'orange' : 'red'),
        circleStyle: item.is_returned ? undefined : { borderWidth: 2, borderColor: '#009688' },
    }));

    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return <ThemedText>Failed to fetch test data! {error.message}</ThemedText>;
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
});
