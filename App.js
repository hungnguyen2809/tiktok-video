import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, FlatList } from 'react-native';
import data from './src/assets/data';
import icons from './src/assets/icons';
import VideoItem from './src/components/VideoItem';
import { SCREEN_HEIGHT } from './src/utils';

const BottonTab = createBottomTabNavigator();

const HomeScreen = () => {
  const bottomTabHeight = useBottomTabBarHeight();

  const [focusVideoIndex, setFocusVideoIndex] = useState(0);

  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ index, item }) => (
        <VideoItem data={item} isFocus={index === focusVideoIndex} />
      )}
      pagingEnabled
      onScroll={(ev) => {
        const index = Math.round(
          ev.nativeEvent.contentOffset.y / (SCREEN_HEIGHT - bottomTabHeight)
        );
        setFocusVideoIndex(index);
      }}
    />
  );
};

function App() {
  return (
    <NavigationContainer>
      <BottonTab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black' },
          headerShown: false,
          tabBarActiveTintColor: 'white',
        }}>
        <BottonTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={icons.home}
                style={[styles.bottomTabIcon, focused && styles.bottomTabIconActive]}
              />
            ),
          }}
        />
        <BottonTab.Screen
          name="Discover"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={icons.search}
                style={[styles.bottomTabIcon, focused && styles.bottomTabIconActive]}
              />
            ),
          }}
        />
        <BottonTab.Screen
          name="NewVideo"
          component={HomeScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <Image source={icons.tiktok} />,
          }}
        />
        <BottonTab.Screen
          name="Inbox"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={icons.message}
                style={[styles.bottomTabIcon, focused && styles.bottomTabIconActive]}
              />
            ),
          }}
        />
        <BottonTab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={icons.user}
                style={[styles.bottomTabIcon, focused && styles.bottomTabIconActive]}
              />
            ),
          }}
        />
      </BottonTab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  bottomTabIconActive: {
    tintColor: 'white',
  },
});
