import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Picker } from 'react-native';

import styles, {Image} from '../../style';
import firebase from '../../../firebaseConfig';

import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { set } from 'react-native-reanimated';

export default function VoucherCrud() {

    const [produto, setProduto] = useState('');
    const [valProduto, setValProduto] = useState('');
    const [desc, setDesc] = useState('');
    const [desconto, setDesconto] = useState('');
    const [foto, setFoto] = useState(null);
    const [nomeUser, setNomeUser] = useState(null);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
            setNomeUser(snapshot.val().nome);
        })
    }, [])

    let openImage = async () => {
        let permission = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permission.granted == false) {
            return;
        } 
     
        let picker = await ImagePicker.launchImageLibraryAsync();

        if (picker.cancelled == true) {
            return;
        } 

        setFoto({localUri: picker.uri})
    }

    const cadastrarVoucher = () => {
        firebase.database()
        .ref('/vouchers/')
        .once('value').then(function (snapshot) {
            snapshot.val().nome
        })
        firebase.database()
        .ref('/vouchers/')
        .push({
            compania: nomeUser,
            produto : produto,
            foto: foto.localUri,
            desc: desc,
            desconto: desconto,
            pontos: Math.floor(valProduto*(desconto/100)/0.1),
            criado_em: Date.now()
        })
        alert('Voucher criado');
        setProduto('');
        setFoto(null);
        setDesc('');
        setDesconto('');
    }

    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.container}>
                <TextInput style={styles.input}
                placeholder="Nome do produto"
                maxLength={32} 
                value={produto} 
                onChangeText={produto => setProduto(produto)}/>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <TextInput style={[styles.input, {width: '30%'}]}
                    placeholder="R$ 0.00"
                    maxLength={32} 
                    value={valProduto} 
                    onChangeText={valProduto => setValProduto(valProduto)}/>
                    <Picker style={{width: "30%"}}
                    selectedValue={desconto}
                    onValueChange={desconto => setDesconto(desconto)}>
                        <Picker.item label="5%" value={5}/>
                        <Picker.item label="10%" value={10}/>
                        <Picker.item label="15%" value={15}/>
                        <Picker.item label="20%" value={20}/>
                        <Picker.item label="25%" value={25}/>
                        <Picker.item label="30%" value={30}/>
                        <Picker.item label="35%" value={35}/>
                        <Picker.item label="40%" value={40}/>
                        <Picker.item label="45%" value={45}/>
                        <Picker.item label="50%" value={50}/>
                        <Picker.item label="55%" value={55}/>
                        <Picker.item label="60%" value={60}/>
                        <Picker.item label="65%" value={65}/>
                        <Picker.item label="70%" value={70}/>
                        <Picker.item label="75%" value={75}/>
                        <Picker.item label="80%" value={80}/>
                        <Picker.item label="85%" value={85}/>
                        <Picker.item label="90%" value={90}/>
                        <Picker.item label="95%" value={95}/>
                        <Picker.item label="100%" value={100}/>
                    </Picker>
                </View>
                <TextInput style={styles.input}
                placeholder="Descrição do produto"
                maxLength={32} 
                value={desc} 
                onChangeText={desc => setDesc(desc)}/> 
                <View>
                    {
                        foto !== null ?
                        <Image source={{uri: foto.localUri}} style={{borderRadius: 0}}></Image> :
                        <Image source={require('../../../assets/noImage.jpg')} style={styles.profile}></Image>
                    }  
                    <TouchableOpacity style={{backgroundColor: 'lightgray', padding: 10, borderRadius: 3}} onPress={() => openImage()}>
                        <Text style={styles.botaoText}>Selecione uma foto</Text>
                    </TouchableOpacity>           
                </View> 
                <TouchableOpacity style={styles.botao} onPress={() => cadastrarVoucher()}>
                    <Text style={styles.botaoText}>FINALIZAR CADASTRO</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}
