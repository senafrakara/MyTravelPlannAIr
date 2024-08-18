require('dotenv').config();

export default {
    expo: {
        name: "MyTravelPlannAIr",
        slug: "MyTravelPlannAIr",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/login-page.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/images/plane.gif",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: process.env.EXPO_PUBLIC_IOS_BUNDLE_ID
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE,
            buildProperties: {
                gradleCommand: ":app:assembleRelease"
            }
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            "expo-build-properties"
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            GOOGLE_GEMINI_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY,
            EAS_PROJECT_ID: process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
            ANDROID_PACKAGE: process.env.EXPO_PUBLIC_ANDROID_PACKAGE,
            IOS_BUNDLE_ID: process.env.EXPO_PULIC_IOS_BUNDLE_ID,
            FIREBASE_CONFIG_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_API_KEY,
            FIREBASE_CONFIG_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
            FIREBASE_CONFIG_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
            FIREBASE_CONFIG_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_APP_ID,
            FIREBASE_CONFIG_MEASUREMENT_ID: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID,
            router: {
                origin: false
            },
            eas: {
                projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID
            }
        }
    }
};
