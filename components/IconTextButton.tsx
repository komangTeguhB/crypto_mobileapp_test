import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

interface IconTextProps {
  containerStyle?: object;
  label: string;
  onPress: any;
  icon: any;
}

const IconTextButton = ({
  label,
  icon,
  containerStyle,
  onPress,
}: IconTextProps) => {
  return (
    <TouchableOpacity
      style={styles(containerStyle).touchableOpacity}
      onPress={onPress}>
      <Image source={icon} resizeMode="contain" style={styles().imageStyle} />
      <Text style={styles().textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (containerStyle: object = {}) =>
  StyleSheet.create({
    touchableOpacity: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.white,
      ...containerStyle,
    },
    imageStyle: {
      width: 20,
      height: 20,
    },
    textStyle: {
      marginLeft: SIZES.base,
      ...FONTS.h3,
    },
  });

export default IconTextButton;
