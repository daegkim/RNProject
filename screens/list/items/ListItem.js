import React, { useEffect } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

const ListItem = ({ item, index, containerStyle, boxStyle, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <View style={containerStyle}>
        <Image
          style={boxStyle}
          source={{uri: "https://newsimg.sedaily.com/2017/04/18/1OEP2BWRPS_1.gif"}}
        />
        <Text>{item.toString()}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem;
