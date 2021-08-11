import * as React from 'react';
import { Text,View,Dimensions } from "react-native";

export default class ProfileScreen extends React.Component{
    render(){
        return(
    <View style={{marginTop:Dimensions.get('window').height/2,marginLeft:Dimensions.get('window').width/2}}>
                <Text> Profile!</Text>
            </View>
        )
    }
}