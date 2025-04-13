import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import React from 'react';

// Define the prop types for the Date component
interface DateComponentProps {
  date: Date;
  onSelectDate: (date: string) => void;
  selected: string;
}

// Date component: displays a formatted day and day number
const Date: React.FC<DateComponentProps> = ({ date, onSelectDate, selected }) => {
  // Format the provided date
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  // Display "Today" if the date is equal to current date, otherwise show abbreviated weekday name
  const day = formattedDate === today ? 'Today' : moment(date).format('ddd');
  const dayNumber = moment(date).format('D');

  return (
    // TouchableOpacity makes the date card pressable
    <TouchableOpacity
      onPress={() => onSelectDate(formattedDate)}
      // Apply default card style and change background if this card is selected
      style={[styles.card, selected === formattedDate && { backgroundColor: '#FFFFFF' }]}
    >
      {/* Display the day label */}
      <Text style={[styles.big, selected === formattedDate && { color: '#000' }]}>
        {day}
      </Text>
      {/* Spacer between day label and day number */}
      <View style={{ height: 10 }} />
      {/* Display the numeric day value; apply different styling when selected */}
      <Text
        style={[
          styles.medium,
          selected === formattedDate && { color: '#000', fontWeight: 'bold', fontSize: 24 },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

// Define component-specific styles using StyleSheet.create
const styles = StyleSheet.create({
  // Style for the date card container
  card: {
    backgroundColor: '#101010',
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 70,
    width: 70,
    marginHorizontal: 5,
  },
  // Base style for the day label text
  big: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'dimgray'
  },
  // Base style for the day number text
  medium: {
    color: 'dimgray',
    fontSize: 17,
  },
});