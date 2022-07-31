import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import ListItem2 from './items/ListItem2';

const PAGE_SIZE = 10;

const ListMain2Screen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const initData = async () => {
    if (isLoading) return;

    setLoading(true);
    const newData = await addData(data);
    setData(prev => prev.concat(newData));
    setLoading(false);
  };

  const addData = (prev) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newData = [];
          const fromIndex = prev.length
          const nextIndex = fromIndex + PAGE_SIZE;
          for (let i = fromIndex; i < nextIndex; i++) {
            newData.push(i);
          }
          resolve(newData);
        } catch(err) {
          reject(err);
        }
      }, 1000);
    })
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate("ListDetail2Screen", {
          data: data,
          selectedIndex: index,
        })
      }}>
        <Image
          style={{
            height: windowWidth / 2,
            width: windowWidth / 2,
          }}
          source={{ uri: "https://newsimg.sedaily.com/2017/04/18/1OEP2BWRPS_1.gif" }}
        />
        <Text>{item}</Text>
      </TouchableOpacity>
    )
  };

  const renderFooter = () => {
    if (!isLoading) return <></>;
    return (
      <View style={{
        paddingVertical: 10,
        alignItems: "center"
      }}>
        <Text>Loading...</Text>
      </View>
    );
  };

  const handleEndReached = async () => {
    if (isLoading) return;

    setLoading(true);
    const newData = await addData(data);
    setData(prev => prev.concat(newData));
    setLoading(false);
  }

  const keyExtractor = (item) => {
    return `item-${item}`;
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        numColumns={2}
        initialNumToRender={10}
        windowSize={3}
        removeClippedSubviews={true}
      >
      </FlatList>

    </SafeAreaView>
  );
};

export default ListMain2Screen;
