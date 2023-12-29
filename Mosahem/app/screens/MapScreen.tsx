import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStackScreenProps } from 'app/navigators';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Button, Screen } from '../components';
import { WebView,WebViewMessageEvent } from 'react-native-webview';
import * as Location from 'expo-location';
import { colors } from 'app/theme';

interface MapScreenProps extends AppStackScreenProps<'Map'> { }
export const pickedLocation = ""
export const MapScreen: FC<MapScreenProps> = observer(function MapScreen({ navigation }) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [pickedLocation, setPickedLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      console.log('i entered here');
      console.log(status);
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log('location');
      console.log(location);
    })();
  }, []);

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'pickedLocation') {
      setPickedLocation(data.location);
      // Now you can use pickedLocation in the remaining part of your React Native code.
      console.log('Picked Location in React Native:', data.location);
    }
  };


  const getMapLibreHTML = (location: Location.LocationObject | null) => {
    const initialCenter = location ? [location.coords.longitude, location.coords.latitude] : [0, 0];
    return `
        <html>
          <head>
            <link href="https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.css" rel="stylesheet" />
            <style>
              body { margin: 20px; }
              #map { height: 100vh; }
              .maplibregl-ctrl-group button {
                width: 100px; /* Adjust the width as needed */
                height: 150px; /* Adjust the height as needed */
                padding: 10px; /* Adjust the padding as needed */
                font-size: 200px;
              }
            
            </style>
          </head>
          <body>
            <div id="map" />
            <script src="https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.js"></script>
            <script>
              const map = new maplibregl.Map({
                container: "map",
                 center: ${JSON.stringify(initialCenter)},
                zoom: 15,
                style: \`https://maps.geo.us-east-1.amazonaws.com/maps/v0/maps/RakMap/style-descriptor?key=v1.public.eyJqdGkiOiI3MWU1YjQwMS1kZjdkLTQ1ODctOGY0OS00YzQ2ZGVjZjc4MTEifQv8dUlEZnNydo9HTGenKAvaAcmvau6E-hEHLIWeI4AIOCUUOpyeIH5AFPtkpr2p3DffJ1qSvzo6z0-kUych7Hyc4xrw0Hgmb6QfKO8TTdi3LiLY_mtbJHn_t-qrza6W5fO4bLrCgayk_8TPV7YYNGgrROj6vriVCQY_g-37S_0oeroL_TWOwObg51KtXOlHUMndtbazyZEJbKQZzD3qGL4YHq8gklLS_M7XFbuwEJK0nxVjdX0lF9joQTYQTWRbQ2deKJQFwna28NdmnhQrIu6VhSOzOU0agDCZleu3fnOREHoZPSMT5Yx7w4UrAqN0LFU8llNWvG0_mFHtyKzSk1o.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx\`,        
              });
              map.addControl(new maplibregl.NavigationControl(), "top-right");
              const marker = new maplibregl.Marker()
              .setLngLat(${JSON.stringify(initialCenter)})
              .addTo(map); 

              map.on("click", (e) => {
                const coordinates = e.lngLat;
                pickedLocation = coordinates;
                marker.setLngLat(coordinates);
    
                // Post the picked location back to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'pickedLocation', location: coordinates }));
              });

            </script>
          </body>
        </html>
      `;
        };
        console.log(pickedLocation);
  console.log("Rendering MapScreen component...");

  const handleClick = () => {
    console.log("clicked")
    navigation.navigate("TicketSubmession")
  };

  return (
    <Screen style={$root} preset="scroll">
      <View style={$root}>
        <WebView
          style={$root}
          containerStyle={$root}
          originWhitelist={['*']}
          source={{
            html: getMapLibreHTML(location),
          }}
          onMessage={handleWebViewMessage}
        />
        <Button
          text="Select location"
          onPress={handleClick}
          style={$buttonStyle} // Add your button style here
          textStyle={$buttonTextStyle} // Add your button text style here
        />
      </View>
    </Screen>
  );

});


const $root: ViewStyle = {
  flex: 1,
  marginTop:15,
  width: "100%",
  height: 800,
}
const $buttonStyle: ViewStyle = {
  backgroundColor: colors.primary,
  borderRadius: 10,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
}

const $buttonTextStyle: TextStyle = {
  color: "#FFFFFF",
  fontSize: 16,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
}