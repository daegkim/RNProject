import React, { useEffect } from 'react';
import { 
  Button,
  SafeAreaView,
  Text,
  View
} from 'react-native';

const HomeScreen = ({ navigation }) => {

  const handlePressButton = (title) => {
    switch(title) {
      case "ListMain":
        navigation.navigate("ListMainScreen");
        break;
    }
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "column"}}>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="ListMain"
            onPress={() => {
              handlePressButton("ListMain");
            }}
          />
          <Button title="ListMain" />
          <Button title="ListMain" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
