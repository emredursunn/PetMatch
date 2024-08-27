import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonItem from './Skeleton'

const Loading = () => {
  return (
    <View style={{flex:1,paddingTop:20}}>
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </View>
  )
}

export default Loading

const styles = StyleSheet.create({})