import React, {useEffect} from 'react';
import { View, Animated } from 'react-native';
import styles, { VoucherView } from '../style';

export default function SkeletonComponent(props) {

    const AnimatedValue = new Animated.Value(0.01);

    const translateX = AnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 400]
    })

    const animation = () => {
        AnimatedValue.setValue(0);
        Animated.timing(
            AnimatedValue,
            {
                toValue: 1,
                duration: 700,
                useNativeDriver: false
            }
        ).start(() => {
            setTimeout(() => {
                animation();
            }, 800);
        })
    }

    animation();

    return (
        <View style={{display: props.visible}}>
            <VoucherView>
                <View>
                    <View style={{width: "80%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX    }]}}/>
                    </View>
                    <View style={{width: "60%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
                <View style={styles.voucher}>
                    <View style={[styles.voucherImage, {backgroundColor: "lightgray", overflow: 'hidden'}]}>
                    <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                    <View style={[styles.voucherImage, {backgroundColor: "lightgray", overflow: 'hidden'}]}>
                    <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
                <View style={styles.justifyBetween}>
                    <View style={{width: "100%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
            </VoucherView>
            <VoucherView>
                <View>
                    <View style={{width: "80%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                    <View style={{width: "60%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
                <View style={styles.voucher}>
                    <View style={[styles.voucherImage, {backgroundColor: "lightgray", overflow: 'hidden'}]}>
                    <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                    <View style={[styles.voucherImage, {backgroundColor: "lightgray", overflow: 'hidden'}]}>
                    <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
                <View style={styles.justifyBetween}>
                    <View style={{width: "100%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
            </VoucherView>
            <VoucherView>
                <View>
                    <View style={{width: "80%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                    <View style={{width: "60%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
                <View style={styles.voucher}>
                    <View style={[styles.voucherImage, {backgroundColor: "lightgray", overflow: 'hidden'}]}>
                    <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                    <View style={[styles.voucherImage, {backgroundColor: "lightgray", overflow: 'hidden'}]}>
                    <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
                <View style={styles.justifyBetween}>
                    <View style={{width: "100%", height: 22, backgroundColor: "lightgray", overflow: 'hidden'}}>
                        <Animated.View style={{width: 50, height: "100%", opacity: 0.5, backgroundColor: "white", transform: [{translateX: translateX}]}}/>
                    </View>
                </View>
            </VoucherView>
        </View>
    )
}
