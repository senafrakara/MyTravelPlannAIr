import { View, Text, Touchable, TouchableOpacity, ToastAndroid, Platform, AlertIOS } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { CreateTripContext } from '../../context/CreateTripContext';


export default function SelectDates() {
    const navigation = useNavigation();
    const router = useRouter();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Select Dates "
        })
    }, [navigation]);

    const onDateSelectionContinue = () => {
        if (!startDate && !endDate) {
            if (Platform.OS === 'android') {
                ToastAndroid.show("Please Enter Email and Password!", ToastAndroid.LONG);
            } else {
                AlertIOS.alert("Please Enter Email and Password!");
            }
            return;
        }
        const totalNumberOfDays = endDate.diff(startDate, 'days');
        console.log("🚀 ~ onDateSelectionContinue ~ total number of night:", totalNumberOfDays);
        console.log("🚀 ~ onDateSelectionContinue ~ total number of days:", totalNumberOfDays + 1);
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalNumberOfDays: totalNumberOfDays + 1,
            totalNumberOfNights: totalNumberOfDays
        });
        router.push('create-trip/select-budget');

    }

    const onDateChange = (date, type) => {
        if (type === "START_DATE") {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date));
        }
    }

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
            }}>Travel Dates</Text>

            <View style={{ marginTop: 30 }}>
                <CalendarPicker onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={7}
                    selectedRangeStyle={{
                        backgroundColor: Colors.PRIMARY
                    }}
                    selectedDayTextStyle={{
                        color: Colors.WHITE
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={onDateSelectionContinue}
                style={{
                    padding: 20,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 35
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