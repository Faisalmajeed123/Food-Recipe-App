import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CachedImage from '../Helpers/image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loading from '../Components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, {FadeInDown, FadeIn} from 'react-native-reanimated';

const RecipeDetails = props => {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async id => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      console.log('got recipies', response.data);
      if (response && response.data);
      {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const ingredientsIndexes = meal => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}>
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(4.5)} strokeWidth={4.5} color={'#fbbf24'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className="p-2 rounded-full mr-5 bg-white">
          <HeartIcon
            size={hp(4.5)}
            strokeWidth={4.5}
            color={isFavourite ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </Animated.View>

      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2">
            <Text
              style={{fontSize: hp(3)}}
              className="font-bold flex-1 text-neutral-700">
              {meal?.strMeal}
            </Text>
            <Text
              style={{fontSize: hp(2)}}
              className="font-medium flex-1 text-neutral-500">
              {meal?.strArea}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(700)
              .delay(100)
              .springify()
              .damping(12)}
            className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  35
                </Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  mints
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  3
                </Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  103
                </Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={'#525252'}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700"></Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  easy
                </Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(700)
              .delay(200)
              .springify()
              .damping(12)}
            className="space-y-4">
            <Text
              style={{fontSize: hp(2.5)}}
              className="font-bold flex-1 text-neutral-700">
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map(i => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{height: hp(1.5), width: hp(1.5)}}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{fontSize: hp(1.7)}}
                        className="text-neutral-700 font-extrabold ">
                        {meal['strMeasure' + i]}
                      </Text>
                      <Text
                        style={{fontSize: hp(1.7)}}
                        className="text-neutral-600 font-medium">
                        {meal['strIngredient' + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(700)
              .delay(300)
              .springify()
              .damping(12)}
            className="space-y-4">
            <Text
              style={{fontSize: hp(2.5)}}
              className="font-bold flex-1 text-neutral-700">
              Instructions
            </Text>
            <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {meal.strYoutube && (
            <Animated.View
              entering={FadeInDown.duration(700)
                .delay(400)
                .springify()
                .damping(12)}
              className="space-y-4">
              <Text
                style={{fontSize: hp(2.5)}}
                className="font-bold flex-1 text-neutral-700">
                Recipe video
              </Text>
              <YoutubeIframe
                videoId={getYoutubeVideoId(meal.strYoutube)}
                height={hp(30)}
              />
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({});
