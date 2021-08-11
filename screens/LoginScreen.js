import * as React from 'react';
import { Text,View,StyleSheet,Button,TouchableOpacity,Dimensions,Alert,ToastAndroid } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';


export default class LoginScreen extends React.Component{
    isUserEqual=(googleUser,firebaseUser)=>{
        if(firebaseUser){
      var providerData=firebaseUser.providerData;
      for(var i=0;i<providerData.length;i++){
          if(providerData[i].providerId===
        firebase.auth.GoogleAuthProvider.PROVIDER_ID&& 
        providerData[i].uid===googleUser.getBasicProfile().getId()){
            return true;
        }
      }
    }
    return false;
   };
   onSignIn=googleUser=>{
       var unsubscribe=firebase.auth().onAuthStateChanged(firebaseUser=>{
           unsubscribe();
           if(!this.isUserEqual(googleUser,firebaseUser)){
               var credential=firebase.auth.GoogleAuthProvider.credential(
                   googleUser.idToken,
                   googleUser.accessToken
               )
               firebase.auth()
                .signInWithCredential(credential)
                .then(result=>{
                    if(result.additionalUserInfo.isNewUser){
                        firebase
                        .database()
                        .ref('/users/'+result.user.uid)
                        .set({
                            gmail:result.user.email,
                            profile_picture:result.additionalUserInfo.profile.picture,
                            locale:result.additionalUserInfo.profile.locale,
                            first_name:result.additionalUserInfo.profile.given_name,
                            last_name:result.additionalUserInfo.profile.family_name,
                            curren_theme:"dark"
                        })
                    }
                })
                .catch(e=>{
                    Alert.alert(
                        'Sign In Error',
                        'Failed signing in',
                        [{
                            text:'OK',
                            onPress:()=>null
                        }],
                        {cancellable:true}
                    )
                    console.log(e);
                })
               
           }
           else{
               ToastAndroid.show("Already signed in",ToastAndroid.SHORT);
           }
       })
   }
   signInWithGoogleAsync=async ()=>{
       try{
       const result=await Google.logInAsync({
           behaviour:'web',
           androidClientId:"1055324125415-uj5vkjl8jrns6622afmsjaefjgof7jjl.apps.googleusercontent.com",
           scopes:["profile","email"]
       })
       if(result.type==='success'){
          return result.accessToken;
       }
       else if(result.type==='cancel'){
           Alert.alert(
               'Sign In Cancelled',
               'Signing in is cancelled',
               [{
                   text:'OK',
                   onPress:()=>{  return {cancelled:true}}
               }],
               {cancellable:false}
           )
         }
   }
   catch{
       Alert.alert(
           'Trouble Signing in',
           'There were trouble signing in',
           [{
               text:'OK',
               onPress:()=>{return{error:true}}
           }],
           {cancellable:true}
       )
   }
}
    render(){
        return(
            <View style={styles.container}>
                <Button style={styles.button} title="SIGN IN" onPress={()=>{this.signInWithGoogleAsync()}}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
      alignSelf:'center',
      marginTop:Dimensions.get('window').height/2
    },
    button:{
      backgroundColor:'red',
      color:'white',
    }
})