import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import Categories from '../Components/Categories';
import axios from 'axios';
import Recipes from '../Components/Recipes';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const handleChangeCategory = category => {
    getRecipies(category);
    setActiveCategory(category);
    setMeals([]);
  };

  useEffect(() => {
    getCategories();
    getRecipies();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php',
      );
      if (response && response.data);
      {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const getRecipies = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      if (response && response.data);
      {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-8">
        <View className="mx-4 flex-row justify-between items-center">
          <Image
            source={require('../Assets/download.jpg')}
            style={{height: hp(5), width: hp(5.5)}}
          />
          <BellIcon size={hp(5)} color={'gray'} />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">
            Hello, Faisal
          </Text>
          <View>
            <Text
              style={{fontSize: hp(3.8)}}
              className="font-semibold text-neutral-600">
              Make your own food,
            </Text>
          </View>
          <Text
            style={{fontSize: hp(3.8)}}
            className="font-semibold text-neutral-600">
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3  tracking-wider text-black"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={'gray'}
            />
          </View>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
