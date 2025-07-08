import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { mockItems } from '@/assets/data/mockItems';

const items = mockItems

function formatDateToDayMonth(date: Date|undefined) {
  if (!date) {
    return '--.--';
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}`;
}

export default function MyTimeline() {

    //Format danych pod timeline (glownie zabawa z datą)
    const timelineData = items.map(item => ({
        time: formatDateToDayMonth(item.return_at),
        title: item.title,
        description: item.description || '',
        circleColor: item.is_returned ? '#009688' : 'orange',
        circleStyle: item.is_returned ? undefined : { borderWidth: 2, borderColor: '#009688' },
    }));
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Itemy</Text>
      <Timeline
        style={styles.timeline}
        data={timelineData}
        circleSize={20}
        lineColor="#009688"
        timeStyle={styles.timeStyle}
        descriptionStyle={styles.descriptionStyle}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeline: {
    flex: 1,
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: '#009688',
    color: 'white',
    padding: 5,
    borderRadius: 13,
  },
  descriptionStyle: {
    color: 'gray',
  },
});
