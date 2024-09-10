import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonItem = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonText} />
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {
    width: '70%',
    height: '10%',
    borderRadius: 8,
    marginTop: 4,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonText: {
    marginTop: 8,
    width:'100%',
    height:'40%',
    backgroundColor:"gray",
    borderRadius:8,
  },
});

export default SkeletonItem;