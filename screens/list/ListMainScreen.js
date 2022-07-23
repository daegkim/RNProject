import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import ListItem from './items/ListItem';

const ListMainScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const width = Dimensions.get("window").width;

  const initData = () => {
    setData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  const addData = () => {
    if (isMoreLoading) {
      return;
    }
    setMoreLoading(true);
    const newData = [];
    for (let i = data.length; i < data.length + 10; i++) {
      newData.push(i);
    }
    setTimeout(() => {
      setData(prev => [...prev, ...newData]);
      setMoreLoading(false);
    }, 1000);
  }

  const renderItem = ({ item, index }) => {
    const padding = 10;
    const handlePressItem = () => {
      navigation.navigate("ListDetailScreen", {
        data: data,
        index: index,
      })
    }

    return (
      <ListItem
        item={item}
        index={index}
        containerStyle={{
          padding: padding,
        }}
        boxStyle={{
          width: width / 2 - padding * 2,
          height: width / 2 - padding * 2,
          backgroundColor: "blue"
        }}
        onPress={handlePressItem}
      />
    )
  }

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
  }

  const handleEndReached = () => {
    if (!isMoreLoading) {
      addData();
    }
  }

  useEffect(() => {
    setTimeout(() => {
      initData();
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        ListFooterComponent={listFooterItem}
        onEndReached={handleEndReached}
      />
    </SafeAreaView>
  );
};

export default ListMainScreen;
