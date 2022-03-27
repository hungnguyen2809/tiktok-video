import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useRef, useEffect, useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import Video from 'react-native-video';
import icons from '../assets/icons';
import { makeAnimatedStyleMusicNote } from '../common';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils';

function VideoItem({ data, isFocus }) {
  const { uri, channelName, caption, musicName, likes, comments, avatarUri } = data;

  const tabBarHeight = useBottomTabBarHeight();

  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

  const discAnimatedLoop = useRef();
  const musicAnimatedLoop = useRef();

  const triggerAnimation = useCallback(() => {
    discAnimatedLoop.current = Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
        easing: Easing.linear,
      })
    );
    discAnimatedLoop.current?.start();

    musicAnimatedLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ])
    );
    musicAnimatedLoop.current?.start();
  }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

  useEffect(() => {
    if (isFocus) {
      triggerAnimation();
    } else {
      discAnimatedLoop.current?.stop();
      musicAnimatedLoop.current?.stop();

      discAnimatedValue.setValue(0);
      musicNoteAnimatedValue1.setValue(0);
      musicNoteAnimatedValue2.setValue(0);
    }
  }, [
    isFocus,
    triggerAnimation,
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
  ]);

  const discStyle = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const musicNoteStyle1 = makeAnimatedStyleMusicNote(musicNoteAnimatedValue1, false);
  const musicNoteStyle2 = makeAnimatedStyleMusicNote(musicNoteAnimatedValue2, true);

  return (
    <View style={[styles.container, { height: SCREEN_HEIGHT - tabBarHeight }]}>
      <StatusBar barStyle="light-content" />

      <Video source={{ uri }} style={styles.video} resizeMode={'cover'} paused={!isFocus} repeat />

      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftDection}>
          <Text style={styles.channelName}>{channelName}</Text>
          <Text style={styles.caption} numberOfLines={2}>
            {caption}
          </Text>
          <View style={styles.musicNameContainer}>
            <Image source={icons.music} style={styles.musicNameIcon} />
            <Text style={styles.musicName}>{musicName}</Text>
          </View>
        </View>
        <View style={styles.bottomRightDection}>
          <Animated.Image source={icons.musicNote} style={[styles.musicNote, musicNoteStyle1]} />
          <Animated.Image source={icons.musicNote} style={[styles.musicNote, musicNoteStyle2]} />
          <Animated.Image source={icons.disc} style={[styles.musicDisc, discStyle]} />
        </View>
      </View>

      <View style={styles.verticalBar}>
        <View style={[styles.verticalBarItem, styles.avatarContainer]}>
          <Image style={styles.avatar} source={{ uri: avatarUri }} />
          <View style={styles.followButton}>
            <Image source={icons.plus} style={styles.followIcon} />
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <Image style={styles.verticalBarItemIcon} source={icons.heart} />
          <Text style={styles.verticalBarItemText}>{likes}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image style={styles.verticalBarItemIcon} source={icons.messageCricle} />
          <Text style={styles.verticalBarItemText}>{comments}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image style={styles.verticalBarItemIcon} source={icons.share} />
          <Text style={styles.verticalBarItemText}>Share</Text>
        </View>
      </View>
    </View>
  );
}

export default VideoItem;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftDection: {
    flex: 4,
  },
  bottomRightDection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  channelName: {
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicNameIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: 'white',
  },
  musicName: {
    color: 'white',
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: 'absolute',
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: 'center',
  },
  verticalBarItemIcon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
  verticalBarItemText: {
    color: 'white',
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
    width: 16,
    height: 16,
  },
  followIcon: {
    width: 22,
    height: 22,
    tintColor: 'tomato',
  },
  musicNote: {
    position: 'absolute',
    right: 40,
    bottom: 16,
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
