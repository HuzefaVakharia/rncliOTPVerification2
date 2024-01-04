/*

First code which is working when we ask user for entering phone number on which we want to get OTP and we are not providing any 
Test number in our Firebase in Authentication of phone.
The way to get OTP on our device is that:
1. We do not have to give any Test number in Firebase console.
2. Next we have to provide the correct number in First TextInput which have placeholder="Phone Number with Country Code" and click on
Phone Number Sign In Button shown below, so that Firebase will first check
that this number is not a Test Number, then it will check that this number is correct from which i got OTP request, and so Firebase will
send the OTP, if we will put incorrect number on which we want to receive OTP
then firebase will not send any OTP number and thus our app will not work.



Reference for code is: https://www.youtube.com/watch?v=yeP0og7Za08&t=271s*/
//import liraries
//Read this important document : https://firebase.google.com/docs/auth/android/phone-auth?authuser=0
/*
Above important document contain below note, read it:

Security concerns

Authentication using only a phone number, while convenient, is less secure than the other available methods,
because possession of a phone number can be easily transferred between users.
Also, on devices with multiple user profiles, any user that can receive SMS messages can sign in to an account using the device's phone number.

If you use phone number based sign-in in your app, you should offer it alongside more secure sign-in methods,
and inform users of the security tradeoffs of using phone number sign-in.
*/
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import auth, {
  PhoneAuthOptions,
  PhoneAuthProvider,
} from '@react-native-firebase/auth';

const App = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log(
      'Confirmation in SignInWithPhoneNumber got this:',
      confirmation,
    );
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      const result = await confirm.confirm(code);
      console.log('Result of Phone Authentication is:', result);
      Alert.alert(
        'OTP Successfully Verified. User ID Successfully Generated to use this App',
      );
    } catch (error) {
      console.log('Invalid code.');
      Alert.alert('Invalid OTP Code Entered.');
    }
  };

  if (!confirm) {
    return (
      <>
        <TextInput
          placeholder="Enter Your Phone Number with Country Code without space in Which you want OTP"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={styles.textInput}
        />

        <TouchableOpacity
          onPress={() => signInWithPhoneNumber(phoneNumber)}
          style={{
            width: 250,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            alignSelf: 'center',
            marginTop: 100,
            backgroundColor: 'cyan',
          }}>
          <Text style={{textAlign: 'center'}}>
            Send OTP on Above Provided Number
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        keyboardType={'number-pad'}
        maxLength={6}
        style={{borderWidth: 0.5, width: 200, marginBottom: 50}}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 12.5,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 2,
    marginBottom: 20,
    textAlign: 'auto',
    color: 'black',

    width: 300,
    height: 100,

    alignSelf: 'center',
    marginTop: 100,
  },
});

export default App;
