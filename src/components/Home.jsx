import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
  SectionList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {transformer} from '../../metro.config';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import DatePicker from 'react-native-date-picker';
import BackgroundImage from './ImageBackground';
const image = { uri: 'https://wallpaperaccess.com/full/3348599.jpg' };

export default function Home() {
  const navigation = useNavigation();
  return (
    <>
    <BackgroundImage imageUrl={image}>
    <View
      style={{
        position: 'absolute',
        paddingTop: 300,
        width: '100%',
        padding: 50,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.111)',
      }}>
      <View style={{width: '', display: 'flex', gap: 10}}>
        <Button
          title="register"
          color="#1A5319"
          onPress={() => navigation.navigate('Register')}></Button>
        <Button
          title="result"
          onPress={() => navigation.navigate('User')}></Button>
      </View>
    </View>
    </BackgroundImage>
    </>

  );
}
export const RegisterationScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const navigation = useNavigation();
  const [isFocused, setisFocused] = useState('');
  const [selectQualification, setSelectQualification] = useState('');
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    city: '',
    gender: '',
    dob: '',
  });
  const handleonFocus = () => {
    setisFocused(false);
  };
  const hadleInputOnChange = e => {
    setFormValue({[e.target.name]: e.target.value});
    console.log(e.target.value);
  };

  return (
    <>
    <BackgroundImage imageUrl={image}>
      <ScrollView style={styles.registration.block}>
        <View style={styles.registration.parent}>
          <Text
            style={styles.registration.text}
            onPress={() => navigation.navigate('singleUser')}>
            Registered
          </Text>
          <View style={styles.registration.inputParent}>
            <Text
              style={[
                styles.registration.blur,
                isFocused != 'name' && styles.registration.labels,
              ]}>
              Name
            </Text>
            <TextInput
              style={styles.registration.input}
              onFocus={() => setisFocused('name')}
              onBlur={() => setisFocused('')}
              value={formValue.name}
              onChange={() => setFormValue.name}
            />
            <Text
              style={[
                styles.registration.blur,
                isFocused != 'email' && styles.registration.labels,
              ]}>
              Email
            </Text>
            <TextInput
              style={styles.registration.input}
              onFocus={() => setisFocused('email')}
              onBlur={() => setisFocused('')}
            />
            <Text
              style={[
                styles.registration.blur,
                isFocused != 'phone' && styles.registration.labels,
              ]}>
              Phone
            </Text>
            <TextInput
              style={styles.registration.input}
              onFocus={() => setisFocused('phone')}
              onBlur={() => setisFocused('')}
            />
            <Text
              style={[
                styles.registration.blur,
                isFocused != 'qualification' && styles.registration.labels,
              ]}>
              Qualification
            </Text>
            <TextInput
              style={styles.registration.input}
              onFocus={() => setisFocused('qualification')}
              onBlur={() => setisFocused('')}
            />
            <Text
              style={[
                styles.registration.blur,
                isFocused != 'city' && styles.registration.labels,
              ]}>
              City
            </Text>
            <TextInput
              style={styles.registration.input}
              onFocus={() => setisFocused('city')}
              onBlur={() => setisFocused('')}
            />
            <Text
              style={[
                styles.registration.blur,
                isFocused != 'dob' && styles.registration.labels,
              ]}>
              DOB
            </Text>
            <TextInput
              style={styles.registration.input}
              onFocus={() => setisFocused('dob')}
              onBlur={() => setisFocused('')}
            />

            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            {/* <DatePicker date={date} onDateChange={setDate} /> */}
            
          </View>
        </View>
      </ScrollView>
      </BackgroundImage>
    </>
  );
};
export const UsersList = () => {
  const [Id,setId]= useState('')
  let url = 'http://localhost:4100';
  useLayoutEffect(() => {
    option: {
      Header: {
        title: 'users lists';
      }
    }
  });
  // const gettingData =async ()=> {

  //   let response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  //   console.log(response)
  //   console.log('function raning')
  // }

  // useEffect(()=> {
  //   gettingData()
  //   console.log('hello world')
  // },[])
  const getData =async ()=> {
    let res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    // console.warn(res.data)
    setId(res.data)
  }
  return (
    <BackgroundImage imageUrl={image}>
    <View style={styles.registration.block}>
      <Text style={styles.registration.text} onPress={getData}>UsersList</Text>
      <Text>{Id.title}</Text>
    </View>
    </BackgroundImage>
  );
};
export const SingleUser = () => {
  return (
    <View>
      <Text>single users page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    color: 'white',
    backgroundColor: '#1A5319',
    padding: 5,
    fontSize: 25,
    paddingStart: 12,
    fontWeight: '',
  },
  registration: {
    block: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255,255,255, 0.8)',
      elevation: 20,
      borderTopLeftRadius: 200,
      padding: 35,
    },
    blur: {
      display: 'relative',
      bottom: 0,
    },
    parent: {
      marginVertical: 80,
      textAlign: 'center',
    },
    text: {
      color: 'black',
      fontSize: 32,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    labels: {
      position: 'relative',
      bottom: -37,
      left: 15,
    },

    input: {
      borderBottomWidth: 2,
      borderColor: 'green',
      fontSize: 20,
      marginBottom: 5,
    },
  },
});
