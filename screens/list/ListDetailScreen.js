import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, InteractionManager, SafeAreaView, Text, View } from 'react-native';
import ListItem from './items/ListItem';

const ListDetailScreen = ({ route }) => {
  const [data, setData] = useState([]);
  // const [data, setData] = useState(route.params.data || []);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [itemHeights, setItemHeights] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [isInitFinished, setInitFinished] = useState(false);

  const refFlatList = useRef(null);

  const width = Dimensions.get("window").width;
  const selectedIndex = route.params.index;
  const pageCount = 10;

  // func
  const initData = () => {
    setData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };

  const addEndData = () => {
    if (isMoreLoading) {
      return;
    }
    setMoreLoading(true);
    setTimeout(() => {
      setData(prev => {
        if (prev[prev.length - 1] === 0) {
          return prev;
        }
        const newData = [];
        for (let i = prev[prev.length - 1] + 1; i <= prev[prev.length - 1] + pageCount; i++) {
          newData.push(i);
        }
        return [...prev, ...newData];
      });
      setMoreLoading(false);
    }, 1000);
  };

  const addStartData = () => {
    if (isMoreLoading || data[0] === 0) {
      return;
    }
    setMoreLoading(true);
    setTimeout(() => {
      setData(prev => {
        const newData = [];
        for (let i = prev[0] - pageCount; i < prev[0]; i++) {
          newData.push(i);
        }
        setMoreLoading(false);
        return [...newData, ...prev];
      });
    }, 1000);
  };

  // flatlist
  const renderItem = ({ item, index }) => {
    const padding = 10;
    const randomHeight = Math.floor(Math.random() * (71)) + 30;
    const handleLayout = (e) => {
      const height = e.nativeEvent.layout.height;
      const pageIndex = selectedIndex % pageCount;
      if (!isInitFinished) {
        if (index < pageIndex) {
          setItemHeights(prev => {
            return [...prev, height];
          });
        }
      }
    }

    return (
      <ListItem
        item={item}
        index={index}
        containerStyle={{
          padding: padding,
          height: width + 30,
          backgroundColor: index % 2 ? "red" : "green",
        }}
        boxStyle={{
          width: width - padding * 2,
          height: width - padding * 2,
          backgroundColor: "blue"
        }}
        onLayout={handleLayout}
      />
    )
  };

  const listHeaderItem = () => {
    if (data[0] === 0 || !isInitFinished) {
      return (
        <></>
      )
    }

    return (
      <View style={{
        width: width,
        height: 50,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text>Loading...</Text>
      </View>
    )
  };

  const listFooterItem = () => {
    if (data.length === 0) {
      return (
        <></>
      )
    }

    return (
      <View style={{
        width: width,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text>Loading...</Text>
      </View>
    )
  };

  const handleEndReached = () => {
    if (!isMoreLoading) {
      addEndData();
    }
  };

  const keyExtractor = (item, index) => {
    return item.toString();
  };

  const handleFlatListScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY == 0) {
      addStartData();
    }
  };

  useEffect(() => {
    const pageIndex = selectedIndex % pageCount;
    if (itemHeights.length === pageIndex) {
      let offsets = itemHeights.reduce((prev, curr) => prev + curr, 0);
      if (selectedIndex >= 10) {
        offsets += 50;
      }
      refFlatList.current.scrollToOffset({
        offset: offsets,
        animated: false,
      });
      setInitFinished(true);
    }
  }, [itemHeights]);

  useEffect(() => {
    const newData = route.params.data.slice();
    const pageNumber = Math.floor(route.params.index / pageCount);
    setData(route.params.data.slice(pageNumber * pageCount, (pageNumber + 2) * pageCount));
  }, [route.params.data, route.params.index]);

  return (
    <SafeAreaView>
      <FlatList
        ref={refFlatList}
        data={data}
        initialNumToRender={pageCount + 2} // maintainVisibleContentPosition를 적용시키기 위해서 x + 2를 해준다. +2의 이유는 위 아래 하나씩 더 추가
        renderItem={renderItem}
        ListHeaderComponent={listHeaderItem}
        ListFooterComponent={listFooterItem}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onScroll={handleFlatListScroll}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
    </SafeAreaView>
  );
};

export default ListDetailScreen;
