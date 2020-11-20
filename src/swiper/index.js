import React from 'react'
import { View, Text, Image } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper';
import styles from '../style';

export default function Swiper({ navigation }) {

    return (
        <View style={{flex: 1}}>
            <Onboarding
            onSkip={() => navigation.replace('Login')}
            onDone={() => navigation.replace('Login')}
            pages={[
                {
                backgroundColor: '#ff8878',
                image: <Image source={require('../../assets/Discount-pana.png')} style={styles.swiperImage}/>,
                title: 'Pague menos',
                subtitle: 'Troque pontitos por Vouchers de descontos em restaurantes, cinemas e diversos outros produtos.',
                },
                {
                    backgroundColor: '#5AE4A7',
                    image: <Image source={require('../../assets/Volunteering-bro.png')} style={styles.swiperImage}/>,
                    title: 'Seja recompensado',
                    subtitle: 'Ganhe pontitos fazendo o bem.',
                },
                {
                    backgroundColor: '#4c99a7',
                    image: <Image source={require('../../assets/Bookshop-bro.png')} style={styles.swiperImage}/>,
                    title: 'Promova seu comércio',
                    subtitle: 'Crie vouchers, atraia cliente e receba retorno por suas vendas.',
                },
            ]}
            />
        </View>
    )
}
