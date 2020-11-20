import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import firebase from '../../../../firebaseConfig';
import styles from '../../../style';
import { VoucherView } from '../../../style';
import SkeletonComponent from '../../../skeleton/SkeletonComponent';

import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler';

export default function meusVouchers() {

    const [myFavorites, setMyFavorites] = useState([]);
    const [posts, setPosts] = useState([]);
    const [favoritadosView, setFavoritadosView] = useState([]);
    const [isLoading, setIsLoading] = useState('flex');

    const user = firebase.auth().currentUser;
    const userId = firebase.database().ref('/users/' + user.uid);

    useEffect(() => {
        userId.on('value', function(snapshot) {
            setMyFavorites(snapshot.val().vouchers_ativos);
            setIsLoading('none')
        })    
    }, [])

    useEffect(() => {
        if (myFavorites) {
            for (let i = 0; i < myFavorites.length; i++) {
                firebase.database().ref('vouchers/' + myFavorites[i]).on('value', function(snapshot) {
                    if (!favoritadosView.includes(snapshot.key)) {
                        setPosts(posts => [...posts, Object.assign(snapshot.val(), {token: snapshot.key})])
                        setFavoritadosView(favoritadosView => [...favoritadosView, snapshot.key]);
                    } else {
                        for (let j = 0; j < favoritadosView.length; j++) {
                            if (!myFavorites.includes(favoritadosView[j])) {
                                favoritadosView.splice(favoritadosView.indexOf(favoritadosView[j]), 1);
                                posts.splice(favoritadosView.indexOf(favoritadosView[j]), 1);
                            }
                        }
                    }
                });
            }
        } else {
            setFavoritadosView([]);
            setPosts([]);
        }
    }, [myFavorites]);

    return (
        <View style={styles.backgroundContainer}>
            <View style={[styles.containerVouchers]}>
                <SkeletonComponent visible={isLoading}/>
                <FlatList 
                data={posts} 
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false} 
                renderItem= {
                ({item}) => 
                    <VoucherView>
                        <View>
                            <Text numberOfLines={1} style={styles.voucherTitle}>({item.desconto}%) {item.produto}</Text>
                            <Text style={[styles.desc_style, {textTransform: "uppercase"}]}>{item.compania}</Text>
                        </View>
                        <TouchableWithoutFeedback style={styles.noPaddingMargin}>
                        <View style={styles.voucher}>
                            <Image source={item.foto ? require('../../../../assets/noImage.jpg') : require('../../../../assets/noImage.jpg')} style={styles.voucherImage}></Image>
                            <Text numberOfLines={5} style={[styles.desc_style, {width: "100%", paddingLeft: 10, flexShrink: 1}]}>{item.desc}</Text>
                        </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.justifyBetween}>
                            <Text style={[styles.voucherTitle, {alignSelf: "center"}]}>{item.pontos} Pontitos</Text>
                        </View>
                    </VoucherView>
                }>
                </FlatList>
            </View>
        </View>
    )
}
