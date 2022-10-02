import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FONTS, COLORS} from '../constants';

interface TabIconProps {
  focused: boolean;
  icon: any;
  iconStyle?: object;
  label: string;
}

const TabIcon = ({focused, icon, iconStyle, label}: TabIconProps) => {
  return (
    <View style={styles(focused).container}>
      <Image
        source={icon}
        resizeMode="contain"
        style={styles(focused, iconStyle).imageStyle}
      />
      <Text style={styles(focused).textStyle}>{label}</Text>
    </View>
  );
};

const styles = (focused: boolean, iconStyle: object = {}) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {
      width: 25,
      height: 25,
      tintColor: focused ? COLORS.lightGray4 : COLORS.secondary,
      ...iconStyle,
    },
    textStyle: {
      color: focused ? COLORS.lightGray4 : COLORS.secondary,
      ...FONTS.h4,
    },
  });

export default TabIcon;
