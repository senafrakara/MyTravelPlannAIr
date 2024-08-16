import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
    const tabsArray = [
        myTrip = {
            name: "myTrip", label: "My Trip"
        },
        discover = {
            name: "discover", label: "Discover"
        },
        profile = {
            name: "profile", label: "Profile"
        }
    ];

    const setTabBarIcon = (tabName, color) => {
        switch (tabName) {
            case "myTrip":
                return <Ionicons name="location-sharp" size={24} color={color} />
                break;
            case "discover":
                return <Ionicons name="search-circle" size={24} color={color} />
                break;
            case "profile":
                return <Ionicons name="person" size={24} color={color} />
                break;
            default:
                break;
        }
    }

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.PRIMARY,
            headerShown: false
        }}>
            {tabsArray.map((tabs) => {
                return <Tabs.Screen name={tabs.name}
                    options={{
                        tabBarLabel: tabs.label,
                        tabBarIcon: ({ color }) =>
                            setTabBarIcon(tabs.name, color)
                    }}
                />
            })}

        </Tabs>
    )
}