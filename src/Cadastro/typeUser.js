import React from 'react'
import { View, Image, StatusBar, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles, {FloatingText} from '../style';

export default function typeUser({navigation}) {

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation]);

    return (
        <View style={styles.backgroundContainer}>
            <TouchableOpacity style={styles.selectUser} onPress={() => navigation.navigate('Cadastro')}>
                <FloatingText style={styles.floatingText}>
                    <Text style={styles.typeText}>Pessoa Física</Text>
                </FloatingText>
                <Image source={require('../../assets/usuario.png')} style={{width: '100%', height: '100%'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectCompania} onPress={() => navigation.navigate('pessoaJuridica')}>
                <FloatingText style={styles.floatingText}>
                    <Text style={styles.typeText}>Pessoa Jurídica</Text>
                </FloatingText>
                <Image source={require('../../assets/compania.png')} style={{width: '100%', height: '100%', transform: [{translateY: -40}]}}/>
            </TouchableOpacity>
            <StatusBar translucent backgroundColor="transparent" />
        </View>
    )
}
