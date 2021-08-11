import * as React from 'react';
import {Text,View,StatusBar,Image,TextInput,Platform,StyleSheet,SafeAreaView,ScrollView} from "react-native";
import  {RFValue} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

export default class CreatePostScreen extends React.Component{
   constructor(){
       super();
       this.state={
           previewImage:"image_1",
           dropdownHeight:60,
           open:false
       }
   }

   render(){

       let preview_images={
           image_1:require('../assets/image_1.jpg'),
           image_2:require('../assets/image_2.jpg'),
           image_3:require('../assets/image_3.jpg'),
           image_4:require('../assets/image_4.jpg'),
           image_5:require('../assets/image_5.jpg'),
           image_6:require('../assets/image_6.jpg'),
           image_7:require('../assets/image_7.jpg')
       }

       return(
         <View style={styles.container}>
           <SafeAreaView style={styles.droidSafeArea}/>
             <View style={styles.appTitle}>
                 <View style={styles.appIcon}>
                     <Image source={require('../assets/logo.png')} style={styles.iconImage}/>
                 </View>
                 <View style={styles.appTitleTextContainer}>
                     <Text style={styles.appTitleText}>New Post</Text>
                 </View>
                 <View style={styles.fieldsContainer}>
                     <ScrollView>
                     <Image style={styles.previewImage} source={preview_images[this.state.previewImage]}/>
                     <View style={{height:RFValue(this.state.dropdownHeight)}}>
                         <DropDownPicker
                          items={[
                            {label:"Image 1",value:"image_1"},
                            {label:"Image 2",value:"image_2"},
                            {label:"Image 3",value:"image_3"},
                            {label:"Image 4",value:"image_4"},
                            {label:"Image 5",value:"image_5"},
                            {label:"Image 6",value:"image_6"},
                            {label:"Image 7",value:"image_7"}
                          ]}
                          defaultValue={this.state.previewImage}
                          open={this.state.open}
                          onOpen={()=>{
                          this.setState({
                              open:true,
                              dropdownHeight:200
                          })}}
                          onClose={()=>{
                             this.setState({
                                 open:false,
                                 dropdownHeight:60
                             }) 
                            }}
                            containerStyle={{
                                borderRadius:40,
                                height:20,
                                marginBottom:10
                            }}
                            style={{backgroundColor:'transparent'}}
                            dropDownStyle={{backgroundColor:'#2a2a2a'}}
                            labelStyle={{color:'white'}}
                            arrowStyle={{color:'black'}}
                            itemStyle={{justifyContent:'center'}}
                            onChangeItem={item=>{
                                this.setState({previewImage:item.value})
                            }}/>
                     </View>
                     <TextInput 
                         placeholder="caption"
                         placeholderTextColor='white'
                         style={styles.inputFont}
                         multiline={true}
                         numberOfLines={10}
                         onChangeText={caption=>{this.setState({caption})}}
                    />
                    </ScrollView>
                 </View>
             </View>
             <View style={{flex:0.02}}/>
         </View>
       )
   }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
       backgroundColor:'#000'
    },
    droidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
    },
    appTitle:{
       flex:0.07,
       flexDirection:"row",
       color:'#ffffff'
    },
    appIcon:{
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
    },
    iconImage:{
        width:"100%",
        height:"100%",
        resizeMode:'contain'
    },
    appTitleTextContainer:{
        flex:0.7,
        justifyContent:'center'
    },
    appTitleText:{
        color:'white',
        fontSize:RFValue(28)
    },
    fieldsContainer:{
        flex:0.85
    },
    previewImage:{
        width:"93%",
        height:RFValue(250),
        resizeMode:'contain',
        borderRadius:RFValue(10),
        alignSelf:'center',
        marginVertical:RFValue(10)
    },
   
    inputFont:{
        height:RFValue(40),
        borderColor:"white",
        borderWidth:RFValue(1),
        borderRadius:RFValue(10),
        color:"white",
        paddingLeft:RFValue(10)
    }
})