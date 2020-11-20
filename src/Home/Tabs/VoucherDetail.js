import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from '../../style';
import firebase from '../../../firebaseConfig';

export default function VoucherDetail({ route }) {

    const [vouchersAtivos, setVouchersAtivos] = useState([]);

    const user = firebase.auth().currentUser;
    const userVouchersAtivos = firebase.database().ref('/users/' + user.uid + '/vouchers_ativos');

    useEffect(() => {
        if (vouchersAtivos.length > 0) {
            if (userVouchersAtivos) {
                console.log(vouchersAtivos)
                firebase.database()
                .ref('/users/' + user.uid).update({
                    vouchers_ativos: vouchersAtivos
                })
            }
        }
    }, [vouchersAtivos])

    useEffect(() => {
        setVouchersAtivos([])
        firebase.database().ref(`users/${user.uid}`).once("value", function(snapshot) {
            if (snapshot.val().vouchers_ativos) {
                setVouchersAtivos(snapshot.val().vouchers_ativos);
            }
        })
    }, [])

    const GastarPontitos = async () => {
        await firebase.database().ref(`users/${user.uid}`).once("value", function(snapshot) {
            if (snapshot.val().pontos) {

                if (snapshot.val().pontos < route.params.pontos) {
                    alert('Voce não tem pontitos suficientes para terminar esta transação.')
                    return true;
                } else {
                    firebase.database()
                    .ref('/users/' + user.uid)
                    .update({
                        pontos: snapshot.val().pontos - route.params.pontos,
                    }).then(function() {
                        alert('Transação realizada com sucesso!');
                        setVouchersAtivos([...vouchersAtivos, route.params.token]);
                        return true;
                    })
                    return true;
                }
            } else {
                alert('Você não possui pontitos.')
                return true;
            }
        })
    }

    return (
        <View style={styles.backgroundContainer}>
            <View style={[styles.container, {alignItems: "center"}]}>
                <View style={{ alignItems: "center" }}>
                    <Text style={[styles.profileName, {color: "#1b263b", marginBottom: 10}]}>{ route.params.compania }</Text>
                    <Image source={route.params.foto ? require('../../../assets/noImage.jpg') : require('../../../assets/noImage.jpg')} style={styles.voucherImage}></Image>
                    <Text style={[styles.profileName, , {color: "#1b263b"}]}>({ route.params.desconto }%) { route.params.produto }</Text>
                    <Text style={[styles.profileInfo, , {color: "#1b263b"}]}>Pontitos: { route.params.pontos }</Text>
                </View>
                <Text style={{textAlign: "center"}}>{ route.params.desc }</Text>
                <TouchableOpacity style={styles.botao} onPress={() => GastarPontitos()}>
                    <Text style={styles.botaoText}>Resgatar Voucher</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
