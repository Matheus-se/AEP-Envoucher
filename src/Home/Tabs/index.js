import React, { useEffect, useState } from 'react';
import { Text, View, BackHandler, Image } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import styles from '../../style';
import { VoucherView } from '../../style';
import firebase from '../../../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler';
import SkeletonComponent from '../../skeleton/SkeletonComponent'

export default function Home({ navigation }) {

  const [posts, setPosts] = useState([]);
  const [lastKey, setLastKey] = useState();
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState('flex');

  const user = firebase.auth().currentUser;

  const onBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  useEffect(() => {
    firebase.database().ref(`users/` + user.uid).on('value', function(snapshot) { 
      if (snapshot.val().favoritos) {
        setFavoritos(snapshot.val().favoritos);
      }
    });
    setPosts([])
    firebase.database().ref(`vouchers`).orderByKey().limitToFirst(5).on('child_added', function(snapshot) { 
      setLastKey(snapshot.key); 
      setPosts(posts => [...posts, {
        product: snapshot.val().produto,
        desc: snapshot.val().desc,
        compania: snapshot.val().compania,
        pontos: snapshot.val().pontos,
        foto: snapshot.val().foto,
        desconto: snapshot.val().desconto,
        token: snapshot.key
      }])
      setIsLoading('none'); 
    });
  }, [])

  useEffect(() => {
    if (favoritos.length > 0) {
      firebase.database()
      .ref('/users/' + user.uid).update({
          favoritos: favoritos
      })
    }
  }, [favoritos])

  const favorito = (item) => {
    if (!favoritos.includes(item.token)) {
      setFavoritos(favoritos => [...favoritos,
        item.token
      ])
    } else {
      if (favoritos.length > 1) {
        favoritos.splice(favoritos.indexOf(item.token), 1);
        firebase.database()
        .ref('/users/' + user.uid).update({
            favoritos: favoritos
        })
      } else {
        setFavoritos([])
        firebase.database()
        .ref('/users/' + user.uid).update({
            favoritos: null
        })
      }
    }
  }

  useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => { 
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
  }, []);

  const addPost = () => {
    var i = 0;
    firebase.database().ref(`vouchers`).orderByKey().startAt(lastKey).limitToFirst(5).on('child_added', function(snapshot) { 
      if (i > 0) {
        setPosts(posts => [...posts, {
          product: snapshot.val().produto,
          desc: snapshot.val().desc,
          compania: snapshot.val().compania,
          pontos: snapshot.val().pontos,
          foto: snapshot.val().foto,
          desconto: snapshot.val().desconto,
          token: snapshot.key
        }])
      }
      i += 1
      setLastKey(snapshot.key);
    });
  }

  return (
    <View style={styles.backgroundContainer}>
      <View style={[styles.containerVouchers, {marginTop: 40}]}>
        <SkeletonComponent visible={isLoading}/>
        <FlatList 
        data={posts} 
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false} 
        onEndReachedThreshold={0.5}
        renderItem= {
          ({item}) => 
          <VoucherView>
              <View>
                <Text numberOfLines={1} style={styles.voucherTitle}>({item.desconto}%) {item.product}</Text>
                <Text style={[styles.desc_style, {textTransform: "uppercase"}]}>{item.compania}</Text>
              </View>
              <TouchableWithoutFeedback style={styles.noPaddingMargin} onPress={() => navigation.navigate('Voucher', {
                produto: item.product,
                desc: item.desc,
                compania: item.compania,
                pontos: item.pontos,
                foto: item.foto,
                desconto: item.desconto,
                token: item.token
                })}>
                <View style={styles.voucher}>
                  <Image source={item.foto ? require('../../../assets/noImage.jpg') : require('../../../assets/noImage.jpg')} style={styles.voucherImage}></Image>
                  <Text numberOfLines={5} style={[styles.desc_style, {width: "100%", paddingLeft: 10, flexShrink: 1}]}>{item.desc}</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.justifyBetween}>
              {
                favoritos.includes(item.token) ? 
                <Icon name="heart" size={35} color="crimson" onPress={() => favorito(item)}/> : 
                <Icon name="heart-outline" size={35} color="crimson" onPress={() => favorito(item)}/> 
              }
              <Text style={[styles.voucherTitle, {alignSelf: "center"}]}>{item.pontos} Pontitos</Text>
            </View>
          </VoucherView>
        }
        onEndReached={() => addPost()}>
        </FlatList>
      </View>
    </View>
  );
}