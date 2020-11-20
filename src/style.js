import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import styled from 'styled-components';

const {height, width} = Dimensions.get('screen', 'window')
const scale_image = height*0.1
const theme_color = "#1b263b"
const components_color = "#555"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: "90%",
      alignSelf: "center",
      justifyContent: "space-evenly"
    },
    containerVouchers: {
      flex: 1,
      backgroundColor: '#fff',
      width: "90%",
      alignSelf: "center",
    },
    icone: {
      width: scale_image, 
      height: scale_image,
    },
    iconeSocial: {
      width: scale_image, 
      height: scale_image,
      borderRadius: 999,
      backgroundColor: "#3b5998",
      alignItems: "center",
      justifyContent: "center"
    },
    input: {
      borderBottomColor: components_color,
      borderBottomWidth: 1,
      width: "100%",
      paddingBottom: 10,
      paddingTop: 10
    },
    Titulo: {
      fontSize: 40,
      fontWeight: "bold",
      color: theme_color,
    },
    description: {
      color: theme_color,
      fontSize: 15, 
      fontWeight: "bold",
      transform: [{translateY: -5}]
    },
    desc_style: {
      fontWeight: "bold", 
      color: components_color,
      fontSize: 15
    },
    form: {
      justifyContent: "space-evenly",
      height: height*0.4
    },
    botao: {
      borderRadius: 8,
      width: "100%",
      backgroundColor: theme_color,
      padding: 15,
      marginTop: 20,
      shadowColor: theme_color,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
    },
    profileName: {
      fontWeight: "bold", 
      fontSize: 18,
      alignSelf: "center", 
      color: "#81b29a", 
      textTransform: "uppercase",
      textAlign: "center"
    },
    profileInfo: {
      fontWeight: "bold", 
      fontSize: 14,
      alignSelf: "center", 
      color: "#81b29a", 
      textTransform: "uppercase"
    },
    botaoText: {
      fontWeight: "bold", 
      color: 'white',
      fontSize: 15,
      textTransform: "uppercase",
      alignSelf: "center",
    },
    backgroundContainer: {
      flex: 1, 
      backgroundColor: "white"
    },
    voucherTitle: {
      fontSize: 17,
      fontWeight: "bold",
      color: theme_color,
      textTransform: "uppercase"
    },
    voucher: {
      flexDirection: "row", 
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center"
    },
    justifyBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignContent: "center",
      width: "100%",
      flexDirection: "row",
    },
    voucherImage: {
      width: 150,
      height: 150,
    },
    noPaddingMargin: {
      padding: 0,
      margin: 0
    },
    swiperImage: {
      width: width,
      height: width
    },
    selectUser: {
      width: width,
      height: height/2,
      backgroundColor: '#92e3d2',
      overflow: "hidden"
    },
    selectCompania: {
      width: width,
      height: height/2,
      backgroundColor: '#5eebff',
      overflow: "hidden"
    },
    typeText: {
      fontSize: 30,
      color: theme_color,
      textTransform: "uppercase",
      fontWeight: "bold",
      borderRadius: 2
    }
});
  
export const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-color: #81b29a;
  align-self: center;
  border-width: 2px;
  border-radius: 75px;
  margin-bottom: 10px
`

export const VoucherView = styled.View`
  margin-top: 20px;
  width: 100%;
  align-self: center; 
  min-height: 270px;
  backgroundColor: #f5f5f5;
  marginBottom: 10px;
  padding: 10px;
  justify-content: space-between;
  border-radius: 10px;
`

export const FloatingText = styled.View`
  position: relative;
  zIndex: 1;
  top: 50%;
  width: 100%;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`
  export default styles