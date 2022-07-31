import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import ListItem2 from './items/ListItem2';

const ListDetail2Screen = ({ navigation, route }) => {
  const { data, selectedIndex } = route.params;
  const refFlatList = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  const renderItem = ({ item, index }) => {
    return (
      <ListItem2
        item={item}
        index={index}
      />
    )
  };

  const keyExtractor = (item) => {
    return `item-${item}`;
  };

  const getItemLayout = (data, index) => {
    /**
     * 이 부분이 핵심.
     * 왜인지는 모르겠지만 index가 -1인 것들이 존재함.
     * 얘들이 끼어들어오면서 정상적으로 이동을 못하는 경우가 있었음.
     * 그래서 혹시 -1말고 다른 음수가 나올까봐 다음과 같이 설정함
     */
    if (index < 0) return { index, length: 0, offset: 0 };

    const length = windowWidth + 30 + (data % 2 === 0 ? 100 : 30);
    let offset = 0;
    if (index !== 0) {
      for (let i = 0; i < index; i++) {
        offset += windowWidth + 30 + (data[i] % 2 === 0 ? 100 : 30)
      }
    }
    return {
      index,
      length,
      offset,
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        windowSize={3}
        initialScrollIndex={selectedIndex}
        removeClippedSubviews={true}
      >
      </FlatList>

    </SafeAreaView>
  );
};

export default ListDetail2Screen;
