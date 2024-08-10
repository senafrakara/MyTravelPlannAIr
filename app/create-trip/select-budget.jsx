import { View, Text, FlatList, TouchableOpacity, ToastAndroid, AlertIOS, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SelectBudgetOptions } from './../../constants/OptionsList';
import OptionCard from './../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectBudget() {
    const navigation = useNavigation();
    const [budget, setBudget] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Select Budget "
        })
    }, [navigation]);

    useEffect(() => {
        setTripData({
            ...tripData,
            budget: budget?.title
        })
    }, [budget]);

    const onClickContinue = () => {
        console.log("🚀 ~ onClickContinue ~ budget:", budget)
        if (!budget) {
            if (Platform.OS === 'android') {
                ToastAndroid.show("Please Select a Budget", ToastAndroid.LONG);
            } else {
                AlertIOS.alert("Please Select a Budget");
            }
            return;
        }
        router.push('create-trip/review-trip');
    };

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontSize: 35,
                fontFamily: 'outfit-bold',
                marginTop: 20
            }}>Budget</Text>

            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20
                }}>
                    Choose spending habits for your trip
                </Text>

                <FlatList
                    data={SelectBudgetOptions}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setBudget(item)}
                            style={{
                                marginVertical: 10
                            }}>
                            <OptionCard option={item} selectedOption={budget} />
                        </TouchableOpacity>
                    )}

                />
            </View>

            <TouchableOpacity
                onPress={onClickContinue}
                style={{
                    padding: 20,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 15
                }}>
                <Text style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontSize: 20,
                    fontFamily: 'outfit-regular'
                }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}