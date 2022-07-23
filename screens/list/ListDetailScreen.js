import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, InteractionManager, SafeAreaView, Text, View } from 'react-native';
import ListItem from './items/ListItem';

const ListDetailScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [itemHeights, setItemHeights] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [isInitFinished, setInitFinished] = useState(false);

  const refFlatList = useRef(null);

  const width = Dimensions.get("window").width;
  const selectedIndex = route.params.index;
  const pageCount = 10;
  const [renderedItemCount, setRenderedItemCount] = useState(0);

  // func

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
  const renderItem = useCallback(({ item, index }) => {
    const padding = 10;
    const handleLayout = (e) => {
      if (!isInitFinished) {
        setRenderedItemCount(prev => prev + 1);
      }
    }

    return (
      <ListItem
        item={item}
        index={index}
        containerStyle={{
          padding: padding,
          height: width + 30 + (item % 3 === 0 ? 0 : (item % 3 === 1 ? 50 : 100)),
          backgroundColor: item % 3 === 0 ? "red" : (item % 3 === 1 ? "green" : "blue"),
        }}
        boxStyle={{
          width: width - padding * 2,
          height: width - padding * 2,
        }}
        onLayout={handleLayout}
      />
    )
  }, [isInitFinished]);

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
    const newData = route.params.data.slice();
    const pageNumber = Math.floor(route.params.index / pageCount);
    setData(route.params.data.slice(route.params.index, (pageNumber + 2) * pageCount));
  }, [route.params.data, route.params.index]);

  useEffect(() => {
    if (renderedItemCount > 0 && renderedItemCount === data.length && !isInitFinished) {
      setData(prev => {
        // 이 부분 때문에 initialNumToRender를 큰 값으로 변경해야 한다.
        const newData = route.params.data.slice(0, route.params.index);
        return [...newData, ...prev];
      });
      setInitFinished(true);
    }
  }, [renderedItemCount, isInitFinished]);

  return (
    <SafeAreaView>
      <FlatList
        ref={refFlatList}
        data={data}
        initialNumToRender={data.length} // maintainVisibleContentPosition를 적용시키기 위해서 x + 2를 해준다. +2의 이유는 위 아래 하나씩 더 추가
        windowSize={5}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderItem}
        ListFooterComponent={listFooterItem}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onScroll={handleFlatListScroll}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0, //Flatlist가 재렌더링되어도 스크롤위치가 유지된다.
        }}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default ListDetailScreen;
