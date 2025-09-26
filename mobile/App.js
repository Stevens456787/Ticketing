import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Image, Alert } from 'react-native';

export default function App(){
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Traffic Tickets</Text>
        <Text style={styles.subtitle}>Welcome — sign in to access your profile and start issuing or managing tickets.</Text>

        {/* Sign-in form (UI-only) */}
        <View style={{marginTop:12}}>
          <Text style={{marginBottom:6}}>Email</Text>
          <View style={{borderWidth:1,borderColor:'#ddd',borderRadius:8,padding:8,marginBottom:8}}>
            <Text>you@example.com</Text>
          </View>
          <Text style={{marginBottom:6}}>Password</Text>
          <View style={{borderWidth:1,borderColor:'#ddd',borderRadius:8,padding:8,marginBottom:8}}>
            <Text>●●●●●●●●</Text>
          </View>
          <Button title="Sign In" onPress={()=>Alert.alert('Sign In','Placeholder sign in')} />
        </View>

        <View style={{height:12}} />

        <Button title="Device Quick-Login" color="#6b7cff" onPress={()=>Alert.alert('Quick-Login','Placeholder quick-login (biometric/PIN)')} />

        <View style={styles.actions}>
          <View style={{height:12}} />
          <Button title="Create Ticket" onPress={()=>Alert.alert('Navigate','Create Ticket')} />
          <View style={{height:8}} />
          <Button title="View Tickets" color="#6b7cff" onPress={()=>Alert.alert('Navigate','View Tickets')} />
          <View style={{height:8}} />
          <Button title="Scan Plate" onPress={()=>Alert.alert('Scan','Open camera to scan plate')} />
        </View>

        <View style={styles.profile}>
          <Image source={{uri:'https://via.placeholder.com/40'}} style={styles.avatar} />
          <View>
            <Text style={{fontWeight:'600'}}>Guest</Text>
            <Text style={{color:'#3b3b3b'}}>Sign in / Profile</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f7fb',alignItems:'center',justifyContent:'center'},
  card:{backgroundColor:'#fff',padding:20,borderRadius:12,width:360,maxWidth:'92%',shadowColor:'#000',shadowOpacity:0.06,shadowRadius:8},
  title:{fontSize:20,fontWeight:'700'},
  subtitle:{marginTop:8,color:'#333'},
  actions:{marginTop:14},
  profile:{flexDirection:'row',alignItems:'center',gap:10,marginTop:16},
  avatar:{width:40,height:40,borderRadius:20}
})
