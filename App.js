// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font'; 
import { primaryColor, secondaryColor, appBackgroundColor, styles } from './src/components/helpers/globalStyles';
import LandingScreen from './src/components/screens/LandingScreen';
import OutfitCreatorScreen from './src/components/screens/OutfitCreatorScreen';
import ShowOutfitScreen from './src/components/screens/ShowOutfitScreen';
import SavedOutfitsScreen from './src/components/screens/SavedOutfitsScreen';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="OutfitCreator" component={OutfitCreatorScreen} />
    <Stack.Screen name="ShowOutfit" component={ShowOutfitScreen} />
  </Stack.Navigator>
);

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    console.log("got here");
    loadFonts();
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      'Ephesis-Regular': require('./src/assets/fonts/Ephesis/Ephesis-Regular.ttf'),
    });
    setFontsLoaded(true);
  }

  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: primaryColor,
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
              height: 65,
              paddingBottom: 12,
            },
            tabBarActiveTintColor: secondaryColor,
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Saved') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={MainStack} />
          <Tab.Screen name="Saved" component={SavedOutfitsScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}
