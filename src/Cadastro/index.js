import React, { useState } from 'react';
import { View, Text, Linking, Keyboard, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import styles from '../style';
import firebase from '../../firebaseConfig';

export default function Cadastro() {

    const [isSelected, setSelection] = useState(false);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [email, setEmail] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [nomesIguais, setNomesIguais] = useState(0);
    const [erroSenha, setErroSenha] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [hidden, setHidden] = useState(true);

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

    function validarNome(nome) {
        setNome(() => nome)

        var query = firebase.database().ref("users").orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.child("nome").val();

                // Tratamento de erros Nome
                if (nome == childData) {
                    setNomesIguais(nomesIguais => "Usuário já cadastrado")
                    return true;
                } else {
                    setNomesIguais(nomesIguais => "")
                }
            });
        });
    }
    function validarEmail(email) {
        setEmail(() => email)

        var query = firebase.database().ref("users").orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.child("email").val();

                // Tratamento de erros Nome
                if (email == childData) {
                    setErroEmail(emailIgual => "Email já cadastrado")
                    return true;
                } else {
                    setErroEmail(emailIgual => "")
                }
            });
        });
    }

    async function cadastroUsuario() {
        try {
            const rjx = /^[a-zA-Z0-9\s]+$/

            if (nome.trim() === "" || nome.length <= 3 || nomesIguais) {
                setErroNome(erroNome => "Nome inválido ou já cadastrado")
                return true;
            } else if (rjx.test(nome) == false) {
                setErroNome(erroNome => "Use apenas números letras e espaços")
                return true;
            } else {
                setErroNome(erroNome => "")
            }

            // Tratamento de erros Senha
            if (senha.trim() !== confirmarSenha.trim()) {
                setErroSenha(erroSenha => "Campos não combinam")
                return true;
            } else if (senha.length < 6) {
                setErroSenha(erroSenha => "Senha muito curta")
                return true;
            } 

            // Tratamento de erros email
            if (erroEmail) {
                return true;
            }

            await firebase.auth().createUserWithEmailAndPassword(email, senha).then(function(result) {
                if (result.additionalUserInfo.isNewUser) {
                    firebase.database()
                    .ref('/users/' + result.user.uid)
                    .set({
                        email : email,
                        foto: null,
                        nome: nome,
                        criado_em: Date.now()
                    })
                    } else {
                    firebase.database()
                    .ref('/users/' + result.user.uid).update({
                        last_logged_in: Date.now()
                    })
                }
                return true;
            }).catch(function(error) {
                alert(error)
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <TouchableOpacity style={styles.backgroundContainer} onPress={ () => summon() }>
            <View style={[styles.container, {justifyContent: "center"}]}>
                <View style={{justifyContent: "space-between", height: "50%"}}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.desc_style}>NOME </Text>
                            <Text style={[styles.desc_style, {color: "red"}]}>{erroNome}</Text>
                        </View>
                        <TextInput style={styles.input} 
                        onChangeText={nome => validarNome(nome)} 
                        value={nome} 
                        maxLength={32}
                        autoCorrect={false}
                        autoCapitalize="none"/>
                    </View>
                    <View>
                    <View style={{flexDirection: "row"}}>
                            <Text style={styles.desc_style}>E-MAIL </Text>
                            <Text style={[styles.desc_style, {color: "red"}]}>{erroEmail}</Text>
                        </View>
                        <TextInput style={styles.input} 
                        onChangeText={email => validarEmail(email)} 
                        value={email} 
                        maxLength={64}
                        autoCapitalize="none" 
                        autoCorrect={false}/>
                    </View>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.desc_style}>SENHA </Text>
                            <Text style={[styles.desc_style, {color: "red"}]}>{erroSenha}</Text>
                        </View>
                        <TextInput style={styles.input} 
                        onChangeText={senha => setSenha(senha)} 
                        value={senha} 
                        maxLength={32}
                        secureTextEntry={true} 
                        autoCorrect={false}/>
                    </View>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.desc_style}>CONFIRMAR SENHA </Text>
                            <Text style={[styles.desc_style, {color: "red"}]}>{erroSenha}</Text>
                        </View>
                        <TextInput style={styles.input} 
                        onChangeText={confirmarSenha => 
                        setConfirmarSenha(confirmarSenha)} 
                        value={confirmarSenha} 
                        maxLength={32}
                        secureTextEntry={true} 
                        autoCorrect={false}/>
                    </View>
                    {hidden ? 
                        <View>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox}/>
                                <Text>Eu aceito os </Text>
                                <Text onPress={() => Linking.openURL('http://dontpad.com/Envoucher')} style={{color: "blue", textDecorationLine: "underline"}}>Termos de uso e condições</Text>
                            </View>
                            <TouchableOpacity style={styles.botao} disabled={!isSelected} onPress={() => cadastroUsuario()}>
                                <Text style={styles.botaoText}>FINALIZAR CADASTRO</Text>
                            </TouchableOpacity>
                        </View> : null}
                </View>
            </View>
        </TouchableOpacity>
    )
}