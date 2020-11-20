import React from 'react';
import { Text } from 'react-native'

import * as Facebook from 'expo-facebook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from '../../../firebaseConfig';

const signUpFacebook = async () => {
    try {
      await Facebook.initializeAsync("2787361008198549");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,picture.height(500).width(500),email&access_token=${token}`
        );
        const data = await response.json();

        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        firebase.auth().signInWithCredential(credential).then(function(result) {
          if (result.additionalUserInfo.isNewUser) {
            firebase.database()
            .ref('/users/' + result.user.uid)
            .set({
              email : data.email,
              foto: data.picture.data.url,
              nome: data.name,
              criado_em: Date.now()
            })
          } else {
            firebase.database()
            .ref('/users/' + result.user.uid).update({
                last_logged_in: Date.now()
              })
          }
      }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          alert(error)
      });
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  export default function FacebookButton() {
    return (
        <Icon.Button name="facebook" backgroundColor={"#3b5998"} size={30} iconStyle={{paddingLeft: 10}} onPress={ () => signUpFacebook() }>
          <Text style={{color: "white", fontWeight: "bold", fontSize: 15}}>Entrar com o Facebook</Text>
        </Icon.Button>
    ) 
}