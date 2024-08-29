import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, AlertIOS, Platform } from 'react-native';
import { auth } from './../../configs/FbConf';
import { Colors } from '../../constants/Colors';
import { confirmPasswordReset, signOut } from "firebase/auth";
import { useNavigation, useRouter } from 'expo-router';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateEmail, updatePassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";


export default function Profile() {
    const user = auth.currentUser;

    const [firebaseUser, setFirebaseUser] = useState();
    const [fullName, setFullname] = useState(user.email);
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
        console.log("🚀 ~ Profile ~ user.displayName:", user.displayName)

    }, [navigation]);

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        fullname: yup
            .string(),
        password: yup
            .string(),
        newPassword: yup
            .string()
            .min(8, 'Password must contain at least 8 characters'),
        confirmPassword: yup
            .string()
            .min(8, 'Password must contain at least 8 characters')

    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user.email,
            fullname: user.displayName ?? '',
            password: '',
            newPassword: '',
            confirmPassword: ''
        },
    });

    /*     useEffect(() => {
            setEmail(user.email);
            setFirebaseUser(user);
        }, []); */

    const onPressSend = (formData) => {
        console.log("🚀 ~ onPressSend ~ formData:", formData)
        const changedEmail = formData.email;
        const password = formData.password;
        const newPassword = formData.newPassword;
        const confirmPassword = formData.confirmPassword;
        const newFullName = formData.fullname;

        let error = false;

        if (changedEmail !== '' && user.email) {
            updateEmail(user, changedEmail).then(async () => {
                await user.reload();
            }).catch((error) => {
                console.log("🚀 ~ updateEmail ~ error:", error)
                error = true;

            });
        }

        var credential = EmailAuthProvider.credential(
            user.email,
            password
        );

        if (password && newPassword && confirmPassword &&
            newPassword === confirmPassword) {

            reauthenticateWithCredential(user, credential)
                .then((result) => {
                    updatePassword(user, newPassword).then(async () => {
                        await user.reload();
                    }).catch((error) => {
                        console.log("🚀 ~ updatePassword ~ error:", error)
                        if (Platform.OS === 'android') {
                            ToastAndroid.show("We Couldn't Change Your Password, Please Try Later!", ToastAndroid.LONG);
                        } else {
                            AlertIOS.alert("We Couldn't Change Your Password, Please Try Later!");
                        }
                    });
                })
                .catch((error) => {
                    console.log("🚀 ~ onPressSend ~ error:", error)
                    error = true;

                    if (Platform.OS === 'android') {
                        ToastAndroid.show("Your Current Password is Not Correct!", ToastAndroid.LONG);
                    } else {
                        AlertIOS.alert("Your Current Password is Not Correct!");
                    }
                });

        } else {
            error = true;

            if (Platform.OS === 'android') {
                ToastAndroid.show("New Password and Confirm Password Are Not Same!", ToastAndroid.LONG);
            } else {
                AlertIOS.alert("New Password and Confirm Password Are Not Same!");
            }
        }

        if (newFullName !== '') {
            updateProfile(user, {
                displayName: newFullName
            }).then(async () => {
                await user.reload().then(() => {
                    setFirebaseUser(user);
                });
                console.log("🚀 ~ user.reload ~ user:", user)

            }).catch((error) => {
                error = true;

            });
        }

        if (error === false) {
            if (Platform.OS === 'android') {
                ToastAndroid.show("Saved Your Changes!", ToastAndroid.LONG);
            } else {
                AlertIOS.alert("Saved Your Changes");
            }
        } else {
            if (Platform.OS === 'android') {
                ToastAndroid.show("We Couldn't Update Your Profile, Please Try Later!", ToastAndroid.LONG);
            } else {
                AlertIOS.alert("We Couldn't Update Your Profile, Please Try Later!");
            }
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
                                value={value ?? firebaseUser.fullName}
                                onChangeText={onChange}
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
                                value={value ?? firebaseUser.email}
                                onChangeText={onChange}
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
                                value={value}
                                onChangeText={onChange}
                                placeholder="Current Password"
                                secureTextEntry
                            />
                        )}
                        name="password"
                    />
                    {errors.password && <Text>{errors.password.message}</Text>}
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
                                value={value}
                                onChangeText={onChange}
                                placeholder="New Password"
                                secureTextEntry
                            />
                        )}
                        name="newPassword"
                    />
                    {errors.password && <Text>{errors.password.message}</Text>}
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
                                value={value}
                                onChangeText={onChange}
                                placeholder="Confirm Password"
                                secureTextEntry
                            />
                        )}
                        name="confirmPassword"
                    />
                    {errors.password && <Text>{errors.password.message}</Text>}
                </View>
                <TouchableOpacity style={{
                    padding: 20,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 35
                }}
                    onPress={handleSubmit(onPressSend)}>
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
