import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { withSpring, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';



const Welcome = () => {
    const navigation = useNavigation();


    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);

    useEffect(() => {
        ring1Padding.value = 0;
        ring2Padding.value = 0
        setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 100)
        setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(5.5)), 300)

        setTimeout(() => navigation.navigate('home'), 2500)
    }, [])


    return (
        <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>

            <Animated.View className=' bg-white/20 rounded-full' style={{ padding: ring2Padding }}>
                <Animated.View className='bg-white/20 rounded-full' style={{ padding: ring1Padding }}>
                    <Image source={require('../Assets/foodplate.png')} style={{ width: hp(30), height: hp(30) }} />
                </Animated.View>
            </Animated.View>


            <View className='flex items-center space-y-2'>
                <Text className='font-bold text-white tracking-widest' style={{ fontSize: hp(7) }}>
                    Foody
                </Text>
                <Text className='font-medium text-white tracking-widest' style={{ fontSize: hp(2) }}>
                    Food is always right
                </Text>

            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({})
