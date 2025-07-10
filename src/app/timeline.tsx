import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { mockItems } from '@/assets/data/mockItems';
import { checkIsLate } from '../functions';
import ThemedView from '../components/ThemedView';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

//Pobranie itemów z sortowaniem (zabezpieczenie przed undefined)
const items = [...mockItems].sort((a, b) => {
  const aTime = a.return_at ? a.return_at.getTime() : Infinity;
  const bTime = b.return_at ? b.return_at.getTime() : Infinity;
  return bTime - aTime;
});

function formatDateToDayMonth(date: Date|undefined) {
  if (!date) {
    return 'TBD';
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}`;
}

export default function MyTimeline() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const titleColor = themeColors.text;

    //Format danych pod timeline
    const isLate = (date1: Date | undefined, isReturned: boolean) => {
        return checkIsLate(date1, isReturned)
    }

    const timelineData = items.map(item => ({
        time: formatDateToDayMonth(item.return_at),
        title: item.title,
        description: item.description || '',
        //Kolor kółka w zależności od stanu:
        circleColor: item.is_returned ? '#009688' : (isLate(item.return_at, item.is_returned) ? 'orange' : 'red'),
        circleStyle: item.is_returned ? undefined : { borderWidth: 2, borderColor: '#009688' },
    }));
    
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
            titleStyle={{color: titleColor}}
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
