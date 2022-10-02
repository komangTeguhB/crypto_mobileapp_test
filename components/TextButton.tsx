import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../constants';

interface TextButtonProps {
  containerStyle?: object;
  label: string;
  onPress?: any;
}

const TextButton = ({label, containerStyle, onPress}: TextButtonProps) => {
  return (
    <TouchableOpacity
      style={styles(containerStyle).touchableStyle}
      onPressIn={onPress}>
      <Text style={styles().textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (containerStyle: object = {}) =>
  StyleSheet.create({
    touchableStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 3,
      paddingHorizontal: 10,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.lightGray4,
      backgroundColor: COLORS.white,
      ...containerStyle,
    },
    textStyle: {
      color: COLORS.black,
      ...FONTS.h3,
    },
  });

export default TextButton;
