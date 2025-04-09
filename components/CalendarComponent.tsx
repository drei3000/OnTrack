import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import moment, { Moment } from 'moment';

import Date from './DateComponent'; 

// Define prop types
interface CalendarProps {
  onSelectDate: (date: string) => void;
  selected: string;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState<Moment[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<string | undefined>();

  // Generate dates from today to 10 days ahead
  const getDates = () => {
    const _dates: Moment[] = [];
    for (let i = -5; i < 5; i++) {
      _dates.push(moment().subtract(i, 'days'));
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates()
  }, [])

  return (
    <>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date.toDate()}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default Calendar

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  dateSection: {
    width: '100%',
    padding: 20,
  },
  scroll: {
    height: 100,
  },
}) 
