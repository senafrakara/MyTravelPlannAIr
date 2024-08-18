export const GetPhotoRef = async ({ placeName, coordinate1, coordinate2 }) => {
    const response = await fetch("https://maps.googleapis.com/maps/api/place/textsearch/json" +
        "?location=" + coordinate1 + "%2C" + coordinate2 +
        "&query=" + placeName +
        "&key=" + process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY)

    const result = await response.json();
    return result;
} 