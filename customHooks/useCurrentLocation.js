import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";


const useCurrentLocation = () => {

    const [area, setArea] = useState(null);
    const [location, setLocation] = useState(null);
    const [region,setRegion] = useState(null);
    const [errorMsg,setErrorMsg]=useState(null);
    const [locationDetails,setLocationDetails] = useState(null);

    // function to get access and geoLocation of user Asynchronously.
    const getLocation = async() =>{
        try {
            // request location access from user
            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== "granted"){
                setErrorMsg("Permission to access location was denied.");
                Alert.alert(errorMsg,"Please enable location access to continue");
                return;
            }

            // get current location of user
            const currentLocation = await Location.getCurrentPositionAsync();
            const {latitude,longitude} = currentLocation.coords;
            setLocation({latitude,longitude});
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })

            // reverse geocoding to get location details
            const [location] = await Location.reverseGeocodeAsync({ latitude, longitude });
            if(location){
                setLocationDetails( `${location.city || ''}, ${location.region || ''}, ${location.country || ''}`);
                setArea();
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            setErrorMsg("Something went wrong while fetching location.");
        }
    }

    useEffect(() => {
        getLocation();
    },[])

    return {location, region, errorMsg ,locationDetails};

}

export default useCurrentLocation;
