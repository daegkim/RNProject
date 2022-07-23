import React, { useEffect } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const ListItem = ({ item, index, containerStyle, boxStyle, onPress, onLayout }) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      onLayout={onLayout}
    >
      <View style={containerStyle}>
        <View style={boxStyle}></View>
        <Text>{item.toString()}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem;
