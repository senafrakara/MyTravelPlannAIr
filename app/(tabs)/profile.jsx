import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { auth } from './../../configs/FbConf';
import { Colors } from '../../constants/Colors';
import { signOut } from "firebase/auth";
import { useNavigation, useRouter } from 'expo-router';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";


export default function Profile() {
    const user = auth.currentUser;
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'My Profile'
        })

    }, [navigation]);

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        fullname: yup
            .string(),
        password: yup
            .string()
            .min(8, 'Password must contain at least 8 characters'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user.email,
            fullname: '',
            password: '',
        },
    });

    useEffect(() => {
        setEmail(user.email);
    }, []);

    const onPressSend = (formData) => {
        const changedEmail = formData.email;
        const newPassword = formData.password;
        const newFullName = formData.fullName;

        if (changedEmail !== '') {
            console.log("🚀 ~ onPressSend ~ formData:", formData)
            updateEmail(user, changedEmail).then(() => {
                // Email updated!
                console.log("email updated");
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
        }

        if (newPassword !== '') {
            updatePassword(user, newPassword).then(() => {
                // Update successful.
                console.log("password updated");
            }).catch((error) => {
                // An error ocurred
                // ...
            });
        }

        if (newFullName !== '') {
            updateProfile(user, {
                fullName: newFullName
            }).then(() => {
                // Profile updated!
                console.log("fullname updated");
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
        }

    };

    const onLogout = () => {

        signOut(auth).then(() => {
            router.replace('auth/sign-in')

        }).catch((error) => {
            console.log("Log out error ", error);
        });
    };

    return (
        <View style={styles.container}>
            <View>

                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={fullname}
                                onChangeText={setFullname}
                                placeholder="Full Name"

                            />
                        )}
                        name="fullname"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        )}
                        name="email"
                    />
                    {errors.email && <Text>{errors.email.message}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Password"
                                secureTextEntry
                            />
                        )}
                        name="password"
                    />
                    {errors.password && <Text>{errors.password.message}</Text>}
                </View>
                <TouchableOpacity style={{
                    padding: 20,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 35
                }}
                    onPress={handleSubmit(onPressSend)}                >
                    <Text style={{
                        color: Colors.WHITE,
                        textAlign: 'center',
                        fontFamily: 'outfit-regular',
                        fontSize: 17
                    }}>Save Changes</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={{
                padding: 20,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 15,
                marginTop: 35
            }}
                onPress={onLogout}
            >
                <Text style={{
                    color: Colors.WHITE,
                    textAlign: 'center',
                    fontFamily: 'outfit-regular',
                    fontSize: 17
                }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.GRAY
    },
});
