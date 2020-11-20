import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import styles from '../style';
import firebase from '../../firebaseConfig';
import GoogleButton from './credentials/google';
import FacebookButton from './credentials/facebook';

export default function Login({ navigation }) {

  const theme_color = "#1b263b"

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [hidden, setHidden] = useState(true);
  const [passwordShow, setPasswordShow] = useState(true);

  Keyboard.addListener('keyboardDidHide', () => {
    setHidden(hidden => hidden = true)
  })
  
  Keyboard.addListener('keyboardDidShow', () => {
    setHidden(hidden => hidden = false)
  })

  const summon = () => {
    setHidden(hidden => hidden = true)
    Keyboard.dismiss()
  }

  const showPassword = () => {
    setPasswordShow(passwordShow => passwordShow == true ? false : true)
  }

  // Detecta usuários logados e redireciona
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.emailVerified !== true) {
          navigation.navigate('Verification')
        } else if (user && user.emailVerified == true) {
          navigation.navigate('Vouchers')
        } else {
          navigation.navigate('Login')
        }
      });
  }, [])
  
  // Email e senha login
  function loginFirebase() {
    firebase.auth().signInWithEmailAndPassword(email, senha).then(function(result) {
      firebase.database()
          .ref('/users/' + result.user.uid).update ({
              last_logged_in: Date.now()
          })
    }).catch(function(error) {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      alert(error)
    });
  };

  return (
    <TouchableOpacity style={styles.backgroundContainer} onPress={() => summon()}>
      <View style={styles.container}>
        <View style={{marginTop: 30}}>
          {hidden ? <Image source={require('../../assets/icone.png')} style={styles.icone}/> : null}
          <Text style={styles.Titulo}>Bem vindo</Text>
          <Text style={styles.description}>Faça o login para continuar</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.desc_style}>E-MAIL</Text>
            <TextInput style={styles.input} 
            onChangeText={email => setEmail(email)} 
            value={email} 
            autoCapitalize="none" 
            autoCorrect={false}
            maxLength={64}/>
          </View>
          <View>
            <Text style={styles.desc_style}>SENHA</Text>
            <View style={{flexDirection: "row"}}>
              <TextInput style={styles.input} 
              onChangeText={senha => setSenha(senha)} 
              value={senha} autoCapitalize="none" 
              autoCorrect={false} 
              secureTextEntry={passwordShow} 
              maxLength={32}/>
                <Text style={[styles.desc_style, {position: "absolute", right: 0, color: theme_color, paddingTop: 10}]} onPress={() => showPassword()}>SHOW</Text>
            </View>
            <TouchableOpacity style={styles.botao} onPress={() => loginFirebase()}>
              <Text style={styles.botaoText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={[styles.desc_style, {alignSelf: "center", marginTop: 15}]}>Esqueceu sua senha?</Text>
          </View>
        </View>
        {hidden ? <View style={{marginBottom: 20}}>
          <View style={{height: 100, justifyContent: "space-between"}}>
            <FacebookButton/>
            <GoogleButton/>
          </View>
          <TouchableOpacity onPress={ () => navigation.navigate('typeUser')} style={{justifyContent: "center", height: 40}}>
            <Text style={[styles.desc_style, {alignSelf: "center"}]}>Criar conta</Text>
          </TouchableOpacity>
        </View> : null}
        <StatusBar style="auto" />
      </View>
    </TouchableOpacity>
  );
}

