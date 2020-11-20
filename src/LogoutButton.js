import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from '../firebaseConfig';
import styles from './style';

export default function LogoutButton(props, { navigation }) {

    function logOut() {
        firebase.auth().signOut().then(function() {
            navigation.navigate("Login")
          }).catch(function(error) {
            console.log(error)
          });
    }

    return (
        <View>
            <TouchableOpacity style={[styles.botao, {backgroundColor: props.back ? props.back : "#1b263b"}]} onPress={() => logOut()}>
              <Text style={styles.botaoText}>{props.title ? props.title : "LOG OUT"}</Text>
            </TouchableOpacity>
        </View>
  );
}