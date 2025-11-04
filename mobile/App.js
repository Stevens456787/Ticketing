import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Image, Alert, Pressable, TextInput, Platform, Linking } from 'react-native';

export default function App(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quickHint, setQuickHint] = useState('Quick-Login activates after a verified sign-in on this device.');
  const [status, setStatus] = useState({
    tone: 'info',
    heading: 'Auth Status',
    message: 'Choose a sign-in option to begin.'
  });

  const setPending = useCallback((message) => setStatus({ tone: 'pending', heading: 'Working...', message }), []);
  const setSuccess = useCallback((message) => setStatus({ tone: 'success', heading: 'Success', message }), []);
  const setWarning = useCallback((message) => setStatus({ tone: 'warning', heading: 'Heads up', message }), []);

  const openSetupLink = useCallback((target) => {
    const urlMap = {
      google: 'http://localhost:8080/setup/google.html',
      agency: 'http://localhost:8080/setup/agency-sso.html',
      quick: 'http://localhost:8080/setup/device-quick-login.html'
    };
    const url = urlMap[target];
    if(!url){
      setWarning('Setup link is unavailable. Update the configuration URLs.');
      return;
    }
    Linking.openURL(url).catch(()=>{
      setWarning('Unable to open setup link. Make sure the local web preview is running.');
    });
  }, [setWarning]);

  const openSupportLink = useCallback((target)=>{
    const urlMap = {
      ticket: 'http://localhost:8080/support/create-ticket.html',
      chat: 'http://localhost:8080/support/chat.html',
      call: 'tel:+18005550123'
    };
    const url = urlMap[target];
    if(!url){
      setWarning('Support link is unavailable. Update the support URLs.');
      return;
    }
    Linking.openURL(url).catch(()=>{
      setWarning('Unable to open the selected support link. Verify the local preview or device capabilities.');
    });
  }, [setWarning]);

  const handleEmailSignIn = useCallback(() => {
    const trimmedEmail = email.trim();
    if(!trimmedEmail || !password){
      setWarning('Please enter both email and password before continuing.');
      return;
    }
    setPending(`Verifying credentials for ${trimmedEmail}...`);
    setTimeout(()=>{
      setSuccess(`Email/password placeholder complete. Connect to your auth service to finish sign-in for ${trimmedEmail}.`);
    }, 750);
  }, [email, password, setPending, setSuccess, setWarning]);

  const handleGuest = useCallback(()=>{
    setWarning('Guest mode is limited. Enable kiosk permissions before exposing this option.');
  }, [setWarning]);

  const handleSSO = useCallback((provider)=>{
    const label = provider === 'google' ? 'Google Workspace SSO' : 'Agency Identity Provider';
    setPending(`Redirecting to ${label}...`);
    setTimeout(()=>{
      setSuccess(`${label} placeholder flow ready. Wire up the IdP redirect to complete authentication.`);
    }, 700);
    setQuickHint(
      provider === 'google'
        ? 'After completing Google SSO once, officers can opt into Device Quick-Login on this device.'
        : 'Agency SSO establishes trust so Device Quick-Login can be enabled after the first sign-in.'
    );
  }, [setPending, setSuccess, setQuickHint]);

  const handleQuickLogin = useCallback(()=>{
    setPending('Checking device trust and biometric availability...');
    setTimeout(()=>{
      if(Platform.OS === 'ios' || Platform.OS === 'android'){
        setSuccess('Device Quick-Login placeholder ready. Connect to the native biometric API to complete the flow.');
      }else{
        setWarning('Device Quick-Login placeholder ready. Implement secure credential storage and biometric prompts for this platform.');
      }
      setQuickHint('Device Quick-Login remains active on this device until it is revoked from Profile settings.');
    }, 650);
  }, [setPending, setSuccess, setWarning, setQuickHint]);

  const handleCreateTicket = useCallback(()=>Alert.alert('Navigate','Create Ticket'),[]);
  const handleViewTickets = useCallback(()=>Alert.alert('Navigate','View Tickets'),[]);
  const handleScanPlate = useCallback(()=>Alert.alert('Scan','Open camera to scan plate'),[]);

  const statusToneStyle =
    status.tone === 'pending' ? styles.statusPending :
    status.tone === 'success' ? styles.statusSuccess :
    status.tone === 'warning' ? styles.statusWarning :
    styles.statusInfo;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Traffic Tickets</Text>
        <Text style={styles.subtitle}>Welcome - sign in to access your profile and manage tickets.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@agency.gov"
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            style={styles.input}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            textContentType="password"
            style={styles.input}
          />
          <Pressable style={styles.primaryAction} onPress={handleEmailSignIn}>
            <Text style={styles.primaryActionText}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={handleGuest}>
            <Text style={styles.secondaryActionText}>Guest</Text>
          </Pressable>
        </View>

        <View style={styles.providersRow}>
          {[
            {
              key: 'google',
              label: 'Sign in with Google',
              caption: 'Use agency Workspace account',
              onPress: () => handleSSO('google'),
            },
            {
              key: 'agency',
              label: 'Agency SSO',
              caption: 'Redirect to trusted IdP',
              onPress: () => handleSSO('agency'),
            },
          ].map((option, index) => (
            <Pressable
              key={option.key}
              style={[styles.providerButton, index === 0 && styles.providerButtonFirst]}
              onPress={option.onPress}
            >
              <Text style={styles.providerLabel}>{option.label}</Text>
              <Text style={styles.providerCaption}>{option.caption}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={[styles.providerButton, styles.quickButton]} onPress={handleQuickLogin}>
          <Text style={styles.providerLabel}>Device Quick-Login</Text>
          <Text style={styles.providerCaption}>Biometric / secure PIN</Text>
        </Pressable>
        <Text style={styles.quickHint}>{quickHint}</Text>

        <View style={styles.setupLinks}>
          <Pressable style={styles.setupLink} onPress={()=>openSetupLink('google')}>
            <Text style={styles.setupLinkLabel}>Configure Sign in with Google</Text>
            <Text style={styles.setupLinkCaption}>Admin console walkthrough</Text>
          </Pressable>
          <Pressable style={styles.setupLink} onPress={()=>openSetupLink('agency')}>
            <Text style={styles.setupLinkLabel}>Configure Agency SSO</Text>
            <Text style={styles.setupLinkCaption}>Connect your IdP</Text>
          </Pressable>
          <Pressable style={styles.setupLink} onPress={()=>openSetupLink('quick')}>
            <Text style={styles.setupLinkLabel}>Configure Device Quick-Login</Text>
            <Text style={styles.setupLinkCaption}>Bind and manage devices</Text>
          </Pressable>
        </View>

        <View style={[styles.statusCard, statusToneStyle]}>
          <Text style={styles.statusHeading}>{status.heading}</Text>
          <Text style={styles.statusMessage}>{status.message}</Text>
        </View>

        <View style={styles.helpLinks}>
          <Text style={styles.helpHeading}>Need help?</Text>
          <View style={styles.helpLinkRow}>
            <Pressable onPress={()=>openSupportLink('ticket')}>
              <Text style={styles.helpLink}>Create a ticket</Text>
            </Pressable>
            <Text style={styles.helpDivider}>|</Text>
            <Pressable onPress={()=>openSupportLink('chat')}>
              <Text style={styles.helpLink}>Chat with support</Text>
            </Pressable>
            <Text style={styles.helpDivider}>|</Text>
            <Pressable onPress={()=>openSupportLink('call')}>
              <Text style={styles.helpLink}>Call IT desk</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.actions}>
          <View style={{height:12}} />
          <Button title="Create Ticket" onPress={handleCreateTicket} />
          <View style={{height:8}} />
          <Button title="View Tickets" color="#6b7cff" onPress={handleViewTickets} />
          <View style={{height:8}} />
          <Button title="Scan Plate" onPress={handleScanPlate} />
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
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f7fb',alignItems:'center',justifyContent:'center'},
  card:{backgroundColor:'#fff',padding:20,borderRadius:12,width:360,maxWidth:'92%',shadowColor:'#000',shadowOpacity:0.06,shadowRadius:8},
  title:{fontSize:20,fontWeight:'700'},
  subtitle:{marginTop:8,color:'#3b4350',lineHeight:20},
  form:{marginTop:12},
  label:{marginBottom:6,color:'#162236',fontWeight:'600'},
  input:{borderWidth:1,borderColor:'#d5d9e0',borderRadius:10,paddingVertical:10,paddingHorizontal:12,marginBottom:12,backgroundColor:'#fff'},
  primaryAction:{backgroundColor:'#2f80ff',paddingVertical:12,borderRadius:10,alignItems:'center'},
  primaryActionText:{color:'#fff',fontWeight:'700'},
  secondaryAction:{marginTop:10,borderWidth:1,borderColor:'#d5d9e0',borderRadius:10,paddingVertical:12,alignItems:'center'},
  secondaryActionText:{color:'#505b6d',fontWeight:'600'},
  providersRow:{flexDirection:'row',marginTop:20},
  providerButton:{flex:1,backgroundColor:'#f2f6fb',borderRadius:12,padding:14,borderWidth:1,borderColor:'#d6dee8'},
  providerButtonFirst:{marginRight:10},
  providerLabel:{fontWeight:'700',color:'#0b1a2b'},
  providerCaption:{marginTop:4,color:'#5b6d82',fontSize:12,lineHeight:16},
  quickButton:{marginTop:12,backgroundColor:'#ffffff'},
  quickHint:{marginTop:8,color:'#5b6d82',fontSize:12},
  setupLinks:{marginTop:16},
  setupLink:{marginBottom:10,backgroundColor:'#ffffff',borderRadius:12,padding:14,borderWidth:1,borderColor:'#d6dee8'},
  setupLinkLabel:{fontWeight:'700',color:'#0b1a2b'},
  setupLinkCaption:{marginTop:4,color:'#5b6d82',fontSize:12,lineHeight:16},
  statusCard:{marginTop:16,borderRadius:12,padding:14,borderWidth:1},
  statusHeading:{fontSize:12,textTransform:'uppercase',letterSpacing:1,fontWeight:'700',marginBottom:6,color:'#35435a'},
  statusMessage:{color:'#1e2a3a',fontSize:13,lineHeight:18},
  statusInfo:{backgroundColor:'#eef2fb',borderColor:'#d4dbee'},
  statusPending:{backgroundColor:'#e8f1ff',borderColor:'#b6cffd'},
  statusSuccess:{backgroundColor:'#edf9f0',borderColor:'#c4e6cf'},
  statusWarning:{backgroundColor:'#fff4e6',borderColor:'#ffdaad'},
  helpLinks:{marginTop:18},
  helpHeading:{color:'#5b6d82',fontSize:12,fontWeight:'600'},
  helpLinkRow:{flexDirection:'row',alignItems:'center',marginTop:6},
  helpLink:{color:'#2f80ff',fontWeight:'700'},
  helpDivider:{marginHorizontal:10,color:'#9aa5b8'},
  actions:{marginTop:14},
  profile:{flexDirection:'row',alignItems:'center',gap:10,marginTop:16},
  avatar:{width:40,height:40,borderRadius:20}
});
