import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, InteractionManager, SafeAreaView, Text, View } from 'react-native';
import ListItem from './items/ListItem';

const ListDetailScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isInitFinished, setInitFinished] = useState(false);

  const refFlatList = useRef(null);

  const width = Dimensions.get("window").width;
  const selectedIndex = route.params.index;
  const pageCount = 10;

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

  const keyExtractor = (item, index) => {
    return item.toString();
  };

  const handleEndReached = () => {
    if (!isMoreLoading) {
      addEndData();
    }
  };

  const handleFlatListScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY == 0 && data.length > 0) {
      addStartData();
    }
  };

  const handleContentSizeChange = () => {
    if (!isInitFinished) {
      setData(prev => {
        /**
         * const pageNumber = Math.floor(route.params.index / pageCount);
         * const newData = route.params.data.slice(pageNumber * pageCount, route.params.index);
         * initialNumToRender={pageCount + 2}
         */
        const newData = route.params.data.slice(0, route.params.index);
        setInitFinished(true);
        return [...newData, ...prev];
      });
    }
  }

  useEffect(() => {
    if (!isInitFinished) {
      const newData = route.params.data.slice();
      const pageNumber = Math.floor(route.params.index / pageCount);
      setData(route.params.data.slice(route.params.index, (pageNumber + 2) * pageCount));
    }
  }, [route.params.data, route.params.index]);

  return (
    <SafeAreaView>
      <FlatList
        ref={refFlatList}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderItem}
        ListFooterComponent={listFooterItem}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onScroll={handleFlatListScroll}
        onContentSizeChange={handleContentSizeChange}
        initialNumToRender={data.length} // 이게 싫다면 상단으로도 무한스크롤이 되도록 한다.
        windowSize={5}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0, //Flatlist가 재렌더링되어도 스크롤위치가 유지된다.
        }}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default ListDetailScreen;
