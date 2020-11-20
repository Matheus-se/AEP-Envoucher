import React from 'react';
import { Text } from 'react-native'

import * as Google from 'expo-google-app-auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from '../../../firebaseConfig';

// Checa se o usuario já existe com uma conta do Google
function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
            return true;
            }
        }
    }
    return false;
}

// Signin com Google
function onSignInGoogle(googleUser) {
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        if (!isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        firebase.auth().signInWithCredential(credential).then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
                firebase.database()
                .ref('/users/' + result.user.uid)
                .set({
                    email: result.user.providerData[0].email,
                    foto: result.additionalUserInfo.profile.picture.replace(/s96-c/g, "s500-c"),
                    nome: result.additionalUserInfo.profile.name,
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
        } else {
            console.log('User already signed-in Firebase.');
        }
    });
}

// Configurações Google API android e ios
const signInWithGoogleAsync = async () => {
try {
    const result = await Google.logInAsync({
    behavior: 'web',
    androidClientId: '634506467878-m0e3048tokgcvegp92cfnrm8hms1f327.apps.googleusercontent.com',
    iosClientId: '634506467878-umj0pjjjivqgu0a6ngidrau88db2neio.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
        onSignInGoogle(result)
        return result.accessToken;
    } else {
        return { cancelled: true };
    }
} catch (e) {
    // return { error: true };
    alert(e)
    }
}

export default function GoogleButton() {
    return (
        <Icon.Button name="google" backgroundColor={"#c12a21"} size={30} iconStyle={{paddingLeft: 10}} onPress={ () => signInWithGoogleAsync() }>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 15}}>Entrar com o Gmail</Text>
        </Icon.Button>
    ) 
}
