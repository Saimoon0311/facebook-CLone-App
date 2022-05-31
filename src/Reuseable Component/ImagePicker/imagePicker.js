// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePicker = () => {
  const [filePath, setFilePath] = useState({});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath(response);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 5,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text>
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>Launch Camera for Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('video')}>
          <Text style={styles.textStyle}>Launch Camera for Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('video')}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

// import React, {Fragment, Component} from 'react';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Dialog, {DialogContent} from 'react-native-popup-dialog';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Image,
//   Button,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import {Avatar} from 'react-native-elements';
// const options = {
//   title: 'Select Avatar',
//   customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };
// export default class ImagePicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filepath: {
//         data: '',
//         uri: '',
//       },
//       fileData: '',
//       fileUri: '',
//     };
//   }

//   componentDidMount() {
//     this.getPermissionAsync();
//   }
//   const
//   getPermissionAsync = async () => {
//     if (Constants.platform.ios) {
//       const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   };
//   chooseImage = () => {
//     // this.props.parentCallback(this.state.fileUri)
//     let options = {
//       title: 'Select Image',
//       customButtons: [
//         {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     launchImageLibrary(options, response => {
//       // console.log('Response = ', r);

//       if (response.didCancel) {
//         this.setState({visible: false});
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         this.setState({visible: false});
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = {uri: response.uri};

//         const responses = response.assets[0].uri;
//         const im = response.assets;
//         this.props.parentCallback(im);
//         console.log('assexr=====>>>>>>=====', responses);
//         this.setState({visible: false});
//         // You can also display the image using data:
//         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//         // alert(JSON.stringify(response));s
//         console.log('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: responses,
//         });
//       }
//     });
//   };

//   launchCamera = async () => {
//     // await PermissionsAndroid.request(
//     //   PermissionsAndroid.PERMISSIONS.CAMERA)
//     let options = {
//       // PermissionStatus : ?,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     launchCamera(options, response => {
//       // let response = responses.assets[0]
//       console.log('Camera Lunch == ', response);

//       if (response.didCancel) {
//         this.setState({visible: false});
//         console.log('User cancelled image picker');
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else if (response.error) {
//         this.setState({visible: false});
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const source = {uri: response.uri};

//         const responses = response.assets[0].uri;
//         const im = response.assets;
//         this.props.parentCallback(im);
//         console.log('assexr=====>>>>>>=====', responses);
//         this.setState({visible: false});
//         console.log('patanhi', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: responses,
//         });
//       }
//     });
//   };

//   launchImageLibrary = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',

//       },
//     };
//     launchImageLibrary(options, response => {
//       //  const response = a.assets

//       if (response.didCancel) {
//         this.setState({visible: false});
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         this.setState({visible: false});
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const responses = response.assets[0].uri;
//         const im = response.assets;
//         this.props.parentCallback(im);
//         console.log('assexr=====>>>>>>=====', responses);
//         this.setState({visible: false});
//         console.log('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: responses,
//         });
//       }
//     });
//   };

//   renderFileData(props) {
//     if (this.state.fileData) {
//       return (
//         <Image
//           source={{uri: this.state.fileData}}
//           onPress={() => {
//             this.setState({visible: true});
//           }}
//           style={styles.images}
//         />
//       );
//     }
//     //      else {
//     // return <Image source={{uri:"https://p.kindpng.com/picc/s/391-3918958_phone-icon-mobile-phone-hd-png-download.png"}}
//     //   style={styles.images}
//     // />
//     // }
//   }

//   renderFileUri(props) {
//     if (this.state.fileUri) {
//       return (
//         <View style={styles.images}>
//           <Avatar
//             rounded
//             source={{uri: this.state.fileUri}}
//             onPress={() => {
//               this.setState({visible: true});
//             }}
//             size={100}

//             // style={{styles.images}}
//           />
//         </View>
//       );
//     } else {
//       return (
//         <View style={styles.images}>
//           <Ionicons
//             name="person-add-sharp"
//             size={90}
//             onPress={() => {
//               this.setState({visible: true});
//             }}
//             color={'white'}
//           />
//           {/* <Avatar
//       rounded
//         source={{uri:this.props.user.photoURL}}
//         size={130}
//         onPress={()=>{
//           this.setState({ visible: true });
//         }}
//       /> */}
//         </View>
//       );
//     }
//   }
//   render(props) {
//     // const uri = {this.props.}
//     return (
//       <View>
//         <Dialog
//           visible={this.state.visible}
//           onTouchOutside={() => {
//             this.setState({visible: false});
//           }}>
//           <DialogContent>
//             <Fragment>
//               <StatusBar barStyle="dark-content" />
//               <SafeAreaView>
//                 <View style={styles.body}>
//                   <View style={styles.btnParentSection}>
//                     {/* {this.renderFil eData()} */}
//                     <TouchableOpacity
//                       onPress={this.chooseImage}
//                       style={styles.btnSection}>
//                       <Text style={styles.btnText}>Choose File</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       onPress={this.launchCamera}
//                       style={styles.btnSection}>
//                       <Text style={styles.btnText}>Directly Launch Camera</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       onPress={this.launchImageLibrary}
//                       style={styles.btnSection}>
//                       <Text style={styles.btnText}>
//                         Directly Launch Image Library
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </SafeAreaView>
//             </Fragment>
//           </DialogContent>
//         </Dialog>

//         {this.renderFileUri()}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   //   scrollView: {
//   //     backgroundColor: Colors.lighter,
//   //   },

//   //   body: {
//   //     backgroundColor: Colors.white,
//   //     justifyContent: 'center',
//   //     borderColor: 'black',
//   //     borderWidth: 1,
//   //     height: Dimensions.get('screen').height - 20,
//   //     width: Dimensions.get('screen').width
//   //   },
//   //   ImageSections: {
//   //     display: 'flex',
//   //     flexDirection: 'row',
//   //     paddingHorizontal: 8,
//   //     paddingVertical: 8,
//   //     justifyContent: 'center'
//   //   },
//   images: {
//     //     width: 80,
//     //     height: 80,
//     //     borderRadius:70,
//     //     borderColor: 'black',
//     //     borderWidth: 1,
//     // marginHorizontal: 30,
//     // marginVertical:40
//   },
//   //   btnParentSection: {
//   //     alignItems: 'center',
//   //     marginTop:10
//   //   },
//   btnSection: {
//     //     width: 200,
//     height: 50,
//     //     backgroundColor: '#DCDCDC',
//     alignItems: 'center',
//     justifyContent: 'center',
//     //     borderRadius: 3,
//     //     marginBottom:10
//   },
//   //   btnText: {
//   //     textAlign: 'center',
//   //     color: 'gray',
//   //     fontSize: 14,
//   //     fontWeight:'bold'
//   //   }
// });
