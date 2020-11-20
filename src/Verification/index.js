import React from 'react';
import { View, Text, Image, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogoutButton from '../LogoutButton';

import styles from '../style';
import firebase from '../../firebaseConfig';

import { useFocusEffect } from '@react-navigation/native';

export default function Verification({ navigation }) {

    const onBackPress = () => {
        BackHandler.exitApp()
        return true;
      }
    
      useFocusEffect(() => {
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () => { 
              BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          }
    }, []);
    
    function enviarVerif() {
        var user = firebase.auth().currentUser;
        if (user.emailVerified == false) {
            user.sendEmailVerification().then(function() {
                alert('E-mail de verificação enviado')
                }).catch(function(error) {
                    alert(error)
                })
        } else {
            alert("Usuário já está verificado")
        }
    }
    return (
        <View style={styles.backgroundContainer}>
            <View style={[styles.container, {justifyContent: "center"}]}>
            <View>
                <Image source={require('../../assets/icone.png')} style={{alignSelf: "center", width: 200, height: 200}}/>
                <Text style={[styles.Titulo, {alignSelf: "center"}]}>Verificação</Text>
                <Text style={[styles.desc_style, {marginBottom: 30, marginTop: 30, textAlign: "center"}]}>Para verificar sua conta Envoucher, precisamos verificar que você possui acesso a este e-mail. Enviaremos um link para sua caixa de entrada no seu endereço de e-mail, caso não chegue em cinco minutos clique novamente em "ENVIAR E-MAIL DE VERIFICAÇÃO". Apos confirmar clique em "FAZER LOGIN".</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.botao} onPress={() => enviarVerif()}>
                <Text style={styles.botaoText}>ENVIAR E-MAIL DE VERIFICAÇÃO</Text>
                </TouchableOpacity>
                <LogoutButton title={"TELA INICIAL"}/>
            </View>
        </View>
        </View>
    )
}