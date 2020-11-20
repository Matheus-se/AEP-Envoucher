import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import firebase from '../../../firebaseConfig';
import styles from '../../style';
import { Image } from '../../style';
import LoggoutButton from '../../LogoutButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

export default function Perfil({ navigation }) {

    const [userFoto, setUserFoto] = useState('');
    const [userNome, setUserNome] = useState('');
    const [pontos, setPontos] = useState(0);

    var user = firebase.auth().currentUser;
    
    useEffect(() => {
        firebase.database().ref(`users/${user.uid}`).once("value").then(function(snapshot) {
            setUserFoto(snapshot.val().foto ? {uri: snapshot.val().foto} : null)
            setUserNome(snapshot.val().nome)
        });
    }, []);

    useFocusEffect(() => {
        firebase.database().ref(`users/${user.uid}`).once("value").then(function(snapshot) {
            setPontos(snapshot.val().pontos ? snapshot.val().pontos : 0)
        })
    })

    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.container}>
                <View>
                    <Image
                    source={userFoto ? userFoto : require('../../../assets/iconeSemFoto.png')}
                    resizeMode={"cover"} 
                    />
                    <Text style={styles.profileName} numberOfLines={1}>{ userNome }</Text>
                    <Text style={styles.profileInfo}>Pontos: { pontos }</Text>
                </View>
                <View>
                    <TouchableOpacity style={[styles.botao, {backgroundColor: "#81b29a", flexDirection: "row"}]}>
                        <Icon name="google-analytics" size={30} color="#fff"/>
                        <Text style={[styles.botaoText, {marginLeft: 10}]}>Estatísticas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('meusVouchers')} style={[styles.botao, {backgroundColor: "#81b29a", flexDirection: "row"}]}>
                        <Icon name="text" size={30} color="#fff"/>
                        <Text style={[styles.botaoText, {marginLeft: 10}]}>Meus Vouchers</Text>
                    </TouchableOpacity>
                    <LoggoutButton title={"Logout"} back={"#81b29a"}/>
                </View>
            </View>
        </View>
    )
}
