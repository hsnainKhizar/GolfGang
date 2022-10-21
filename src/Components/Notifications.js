import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
    
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}
  
const getFcmToken = async () => {

   // await AsyncStorage.setItem('fcmToken', "")
   
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log(fcmToken, "the old token")

    if (!fcmToken) {
        try {
           // console.log(fcmToken)
            const fcmToken = await messaging().getToken();
          //  console.log(fcmToken)
            if (fcmToken) {
                console.log(fcmToken, "the new generated token");
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }

        } catch (error) {
            
            console.log(error)
        }
    }
}

export const notificationListener = async() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

     

      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
       
      });
}

