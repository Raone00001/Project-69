import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {

    constructor(){

        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }

    }

    getCameraPermissions = async () => {

        const {status} = await Permissions.askAsync(Permissions.CAMERA);
          this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: 'clicked',
            scanned: false,
          });
    
      }
    
      handleBarCodeScanned = async ({type,data}) => {
        this.setState({
          scanned: true, 
          scannedData: data, 
          buttonState: 'normal'
        });
      }

      
    render(){

        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
  
          if(buttonState === 'clicked' && hasCameraPermissions){
  
              return(
  
                <BarCodeScanner 
                  onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                />
  
              );
  
          } else if(buttonState === 'normal'){
        
            return (
                
                <View style={styles.container}>
  
                  <Text style={styles.displayText}>
                    {
                      hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
                    }
                  </Text>
  
                    <TouchableOpacity 
                      style={styles.scanButton} 
                      onPress={this.getCameraPermissions}
                    >
  
                      <Text style={styles.buttonText}>Scan-QR-Code</Text>
  
                    </TouchableOpacity>
                      
                </View>
  
            );
  
        }
    }
    

}