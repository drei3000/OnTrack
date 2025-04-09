import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import React from 'react';

// Define prop types
interface DateComponentProps {
  date: Date;
  onSelectDate: (date: string) => void;
  selected: string;
}

const Date: React.FC<DateComponentProps> = ({ date, onSelectDate, selected }) => {
  // Format the date
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  const day = formattedDate === today ? 'Today' : moment(date).format('ddd');
  const dayNumber = moment(date).format('D');

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(formattedDate)}
      style={[styles.card, selected === formattedDate && { backgroundColor: '#6146c6' }]}
    >
      <Text style={[styles.big, selected === formattedDate && { color: '#fff' }]}>
        {day}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          selected === formattedDate && { color: '#fff', fontWeight: 'bold', fontSize: 24 },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
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
  big: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'dimgray'
  },
  medium: {
    color: 'dimgray',
    fontSize: 17,
  },
});