import React, { useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

const ListItem2 = ({ item, index }) => {
  const [isMore, setMore] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const renderDetailContent = () => {
    return (
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'green',
        }}
      />
    )
  }

  return (
    <View>
      <Image
        style={{
          height: windowWidth,
          width: windowWidth,
        }}
        source={{ uri: "https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" }}
      />

      <View style={{
        backgroundColor: item % 2 === 0 ? "red" : "blue",
      }}>

        <View style={{
          height: item % 2 === 0 ? 100 : 30,
        }}>
          <Text>{item}</Text>
        </View>

        {isMore && renderDetailContent()}

        <View style={{
          height: 30,
        }}>
          <TouchableOpacity onPress={() => {
            setMore(prev => {
              return !prev;
            })
          }}>
            <Text>more..</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default ListItem2;
