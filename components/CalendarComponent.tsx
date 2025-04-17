import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import moment, { Moment } from 'moment';
import Date from './DateComponent'; 
import { useTheme } from '../app/ThemeContext'; // Import useTheme

// Prop types for the Calendar component
interface CalendarProps {
  onSelectDate: (date: string) => void;
  selected: string;
}

// The Calendar component displays a horizontal list of date cards
const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selected }) => {
  // State to store generated dates (Moment objects)
  const [dates, setDates] = useState<Moment[]>([]);
  // Reference to the horizontal ScrollView for programmatic scrolling
  const scrollViewRef = useRef<ScrollView>(null);
  // Get screen width for calculating scroll offset
  const screenWidth = Dimensions.get('window').width;

  // Additional state that could be used for tracking scroll position and current month
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<string | undefined>();

  // Generate an array of dates from 5 days before today to 4 days after
  const getDates = () => {
    const _dates: Moment[] = [];
    for (let i = -5; i < 5; i++) {
      _dates.push(moment().add(i, 'days'));
    }
    setDates(_dates);
  };

  // Generate dates when the component mounts
  useEffect(() => {
    getDates();
  }, []);

  // Determine the index of today's date in the generated array
  const todayIndex = dates.findIndex((d) => d.isSame(moment(), 'day'));

  // Once dates are loaded, scroll the ScrollView so that "today" is centered
  useEffect(() => {
    if (dates.length > 0 && todayIndex !== -1 && scrollViewRef.current) {
      const itemWidth = 80; // Assumed width for each date card
      const xOffset = todayIndex * itemWidth - screenWidth / 2 + itemWidth / 2;

      // Delay the scroll to ensure layout is complete before scrolling
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: xOffset,
          animated: true,
        });
      }, 0);
    }
  }, [dates, todayIndex, screenWidth]);

  // Render the list of date cards inside a horizontal ScrollView
  return (
    <>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            ref={scrollViewRef} // Reference for programmatically scrolling
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
  );
};

export default Calendar;

// Styles for the Calendar component
const styles = StyleSheet.create({
  // Centering helper style (unused in render)
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Title style (unused in render)
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  // Container for the date section with padding applied
  dateSection: {
    width: '100%',
    padding: 20,
  },
  // Fixed height for the ScrollView container
  scroll: {
    height: 100,
  },
});