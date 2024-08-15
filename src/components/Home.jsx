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
  ActivityIndicator,
  Vibration,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {transformer} from '../../metro.config';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import DatePicker from 'react-native-date-picker';
import BackgroundImage from './ImageBackground';
import {SafeAreaView} from 'react-native-safe-area-context';
import {dataChanged} from '../screens/singleUser';
import { useToast } from "react-native-toast-notifications";
const image = {uri: 'https://wallpaperaccess.com/full/3348599.jpg'};
export let perticularUser = {
  name: '',
  id: '',
  phone: '',
  email: '',
};
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
  const toast = useToast();
  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const navigation = useNavigation();
  const [isFocused, setisFocused] = useState('');
  const [selectQualification, setSelectQualification] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userQualification, setUserQualification] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userDOB, setUserDOB] = useState('');
  const [userGender, setUserGender] = useState('');
  const [showDeleteButton, setDeleteButton] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  // const [userName,setUserName] = useState('')
  const handleonFocus = e => {
    setisFocused(false);
  };

  const dobFocus = () => {
    setOpen(true);
    setisFocused('dob');
  };
  let userData = {
    username: userName,
    phone: userPhone,
    email: userEmail,
    qualificatoin: userQualification,
    city: userCity,
    dob: userDOB,
    gender: userGender,
  };
  const handleonSubmit = async () => {
    if (userEmail.length <= 6) {
      setEmailInvalid(true);
      // alert('please fill all the input field');
    } else {
      try {
        let res = await axios.post('http://10.0.2.2:4100/user', userData);
        console.warn(res);
      } catch (err) {
        console.warn(err, 'error found in url');
      }
    }
  };
  let dates = new Date();
  const handleonReset = () => {
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserCity('');
    setUserQualification('qualification');
    setUserGender('gender');
    // setUserDOB(dates)
  };

  return (
    <>
      <BackgroundImage imageUrl={image}>
        <ScrollView style={styles.registration.block}>
          <View style={styles.registration.parent}>
            <Text
              style={styles.registration.text}
              onLongPress={() => Vibration.vibrate(100)}
              onPress={()=> toast.show('hello world', {
                type: "warning",
                placement: "top",
                duration: 2000,
                offset: 1000,
                animationType: "slide-in",
              })}>
              Registered
            </Text>
            <View style={styles.registration.inputParent}>
              <Text
                style={[
                  styles.registration.blur,
                  // isFocused != 'name' && styles.registration.labels,
                  // userName.length == 0 ? styles.registration.labels : styles.registration.blur
                  isFocused != 'name'
                    ? styles.registration.labels
                    : styles.registration.blur,
                  userName.length > 0 ? {display: 'none'} : {display: 'block'},
                ]}>
                Name
              </Text>
              <TextInput
                style={styles.registration.input}
                onFocus={() => setisFocused('name')}
                onBlur={() => setisFocused('')}
                value={userName}
                onChangeText={e => setUserName(e)}
              />
              <Text
                style={[
                  styles.registration.blur,
                  isFocused != 'email' && styles.registration.labels,
                  userEmail.length > 0 ? {display: 'none'} : {display: 'block'},
                ]}>
                Email
              </Text>
              <TextInput
                style={[styles.registration.input]}
                onFocus={() => setisFocused('email')}
                onBlur={() => setisFocused('')}
                value={userEmail}
                onChangeText={e => setUserEmail(e)}
              />
              <Text
                style={[
                  styles.registration.blur,
                  isFocused != 'phone' && styles.registration.labels,
                  userPhone.length > 0 ? {display: 'none'} : {display: 'block'},
                ]}>
                Phone
              </Text>
              <TextInput
                style={styles.registration.input}
                onFocus={() => setisFocused('phone')}
                onBlur={() => setisFocused('')}
                value={userPhone}
                keyboardType="numeric"
                onChangeText={e => setUserPhone(e)}
              />
              {/* <Text
                style={[
                  styles.registration.blur,
                  isFocused != 'qualification' && styles.registration.labels,
                ]}>
                Qualification
              </Text> */}
              {/* <TextInput
                style={styles.registration.input}
                onFocus={() => setisFocused('qualification')}
                onBlur={() => setisFocused('')}
              /> */}
              <Text
                style={[
                  styles.registration.blur,
                  isFocused != 'city' && styles.registration.labels,
                ]}>
                City
              </Text>
              <TextInput
                style={[styles.registration.input]}
                onFocus={() => setisFocused('city')}
                onBlur={() => setisFocused('')}
                value={userCity}
                onChangeText={e => setUserCity(e)}
              />
              <Text
                style={[
                  styles.registration.blur,
                  // isFocused != 'dob' && styles.registration.labels,
                ]}>
                DOB
              </Text>
              <TextInput
                placeholder="tarik"
                onFocus={dobFocus}
                value={DOB && DOB.toLocaleDateString()}
                style={styles.registration.input}
              />

              <Picker
                selectedValue={userQualification}
                onValueChange={(itemValue, itemIndex) =>
                  setUserQualification(itemValue)
                }>
                <Picker.Item label="qualification" value="" />
                <Picker.Item label="10th" value="10th" />
                <Picker.Item label="12th" value="12th" />
                <Picker.Item label="UG" value="UG" />
                <Picker.Item label="PG" value="PG" />
              </Picker>
              <View
                style={{
                  backgroundColor: 'green',
                  height: 2,
                  width: 'full',
                }}></View>
              <Picker
                selectedValue={userGender}
                onValueChange={(itemValue, itemIndex) =>
                  setUserGender(itemValue)
                }>
                <Picker.Item label="Gender" value="" />
                <Picker.Item label="male" value="male" />
                <Picker.Item label="female" value="female" />
                <Picker.Item label="other" value="other" />
              </Picker>
              <View
                style={{
                  backgroundColor: 'green',
                  height: 2,
                  width: 'full',
                }}></View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  style={{width: '40%'}}
                  onPress={handleonSubmit}>
                  <Text style={styles.registration.submit}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: '40%'}}
                  onPress={handleonReset}>
                  <Text style={styles.registration.reset}>Reset</Text>
                </TouchableOpacity>
              </View>

              <DatePicker
                modal
                open={open}
                date={DOB}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setUserDOB(date);
                  console.warn(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </BackgroundImage>
    </>
  );
};
export const UsersList = () => {
  let navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  let userssData = [
    {
      name: 'aman',
      email: 'aman@gmail.com',
    },
    {
      name: 'chaman',
      email: 'chaman@gmail.com',
    },
    {
      name: 'vivek',
      email: 'vivek@gmail.com',
    },
    {
      name: 'osamabin',
      email: 'osamabin@gmail.com',
    },
    {
      name: 'akshay',
      email: 'akshay@gmail.com',
    },
    {
      name: 'ravi',
      email: 'ravichaudhari@gmail.com',
    },
    {
      name: 'jethalalG',
      email: 'jethalalG@gmail.com',
    },
    {
      name: 'bhideTukaram',
      email: 'bhideTukaram@gmail.com',
    },
    {
      name: 'tarak',
      email: 'tarakMehta@gmail.com',
    },
    {
      name: 'kavi kumar',
      email: 'kumarkavi@gmail.com',
    },
    {
      name: 'aman',
      email: 'aman@gmail.com',
    },
    {
      name: 'chaman',
      email: 'chaman@gmail.com',
    },
    {
      name: 'vivek',
      email: 'vivek@gmail.com',
    },
    {
      name: 'osamabin',
      email: 'osamabin@gmail.com',
    },
    {
      name: 'akshay',
      email: 'akshay@gmail.com',
    },
    {
      name: 'ravi',
      email: 'ravichaudhari@gmail.com',
    },
    {
      name: 'jethalalG',
      email: 'jethalalG@gmail.com',
    },
    {
      name: 'bhideTukaram',
      email: 'bhideTukaram@gmail.com',
    },
    {
      name: 'tarak',
      email: 'tarakMehta@gmail.com',
    },
    {
      name: 'kavi kumar',
      email: 'kumarkavi@gmail.com',
    },
    {
      name: 'aman',
      email: 'aman@gmail.com',
    },
    {
      name: 'chaman',
      email: 'chaman@gmail.com',
    },
    {
      name: 'vivek',
      email: 'vivek@gmail.com',
    },
    {
      name: 'osamabin',
      email: 'osamabin@gmail.com',
    },
    {
      name: 'akshay',
      email: 'akshay@gmail.com',
    },
    {
      name: 'ravi',
      email: 'ravichaudhari@gmail.com',
    },
    {
      name: 'jethalalG',
      email: 'jethalalG@gmail.com',
    },
    {
      name: 'bhideTukaram',
      email: 'bhideTukaram@gmail.com',
    },
    {
      name: 'tarak',
      email: 'tarakMehta@gmail.com',
    },
    {
      name: 'kavi kumar',
      email: 'kumarkavi@gmail.com',
    },
    {
      name: 'aman',
      email: 'aman@gmail.com',
    },
    {
      name: 'chaman',
      mail: 'chaman@gmail.com',
    },
    {
      name: 'vivek',
      mail: 'vivek@gmail.com',
    },
    {
      name: 'osamabin',
      mail: 'osamabin@gmail.com',
    },
    {
      name: 'akshay',
      mail: 'akshay@gmail.com',
    },
    {
      name: 'ravi',
      mail: 'ravichaudhari@gmail.com',
    },
    {
      name: 'jethalalG',
      mail: 'jethalalG@gmail.com',
    },
    {
      name: 'bhideTukaram',
      mail: 'bhideTukaram@gmail.com',
    },
    {
      name: 'tarak',
      mail: 'tarakMehta@gmail.com',
    },
    {
      name: 'kavi kumar',
      mail: 'kumarkavi@gmail.com',
    },
    {
      name: 'tarak',
      mail: 'tarakMehta@gmail.com',
    },
    {
      name: 'kavi kumar',
      mail: 'kumarkavi@gmail.com',
    },
    {
      name: 'aman',
      mail: 'aman@gmail.com',
    },
    {
      name: 'chaman',
      mail: 'chaman@gmail.com',
    },
    {
      name: 'vivek',
      mail: 'vivek@gmail.com',
    },
    {
      name: 'osamabin',
      mail: 'osamabin@gmail.com',
    },
    {
      name: 'akshay',
      mail: 'akshay@gmail.com',
    },
    {
      name: 'ravi',
      mail: 'ravichaudhari@gmail.com',
    },
    {
      name: 'jethalalG',
      mail: 'jethalalG@gmail.com',
    },
    {
      name: 'bhideTukaram',
      mail: 'bhideTukaram@gmail.com',
    },
    {
      name: 'tarak',
      mail: 'tarakMehta@gmail.com',
    },
    {
      name: 'kavi kumar',
      mail: 'kumarkavi@gmail.com',
    },
  ];
  let s_no = 0;
  const handleOnLongPress = item => {
    console.warn(item.name);
  };
  const handleOnDetails = item => {
    perticularUser = {
      name: item.name,
      email: item.email,
      city: item.city,
      date: item.date,
      phone: item.phone,
      dob: item.dob,
      gender: item.gender,
      qualification: item.qualification,
      userId: item._id,
    };
    navigation.navigate('singleUser');
  };
  const getApi = async () => {
    try {
      let res = await axios.post('http://10.0.2.2:4100');
      setUsersData(res.data);
      // console.warn(res.data)
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    getApi();
  }, [dataChanged]);
  return (
    <BackgroundImage imageUrl={image}>
      <View style={[styles.registration.block, {padding: 10}]}>
        <Text style={styles.registration.text}>UsersList</Text>
        <View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 12}}>
            <Text style={[styles.userList.table, {marginRight: 10}]}>s.no</Text>
            <Text style={[styles.userList.table, {flexGrow: 2}]}>Name</Text>
            {/* <Text style={styles.userList.table}>Phone</Text> */}
            <Text style={[styles.userList.table, {flexGrow: 2}]}>Email</Text>
          </View>
          <ScrollView
            style={
              usersData.length == 0 ? styles.display : styles.blockDisplay
            }>
            {usersData.map((item, i) => (
              <View key={item.email}>
                <TouchableOpacity
                  onPress={() => handleOnDetails(item, i)}
                  onLongPress={handleOnLongPress}
                  key={i}>
                  <View style={styles.userList.tableContainer}>
                    <Text
                      style={{
                        marginRight: 25,
                        marginLeft: 5,
                        height: 27,
                        width: 25,
                      }}>
                      {(s_no += 1)}
                    </Text>
                    <Text
                      style={{width: '40%', overflow: 'hidden', height: 23}}>
                      {item.name}
                    </Text>
                    {/* <Text>0108108108</Text> */}
                    <Text
                      style={{width: '40%', overflow: 'hidden', height: 23}}>
                      {item.email}
                    </Text>
                    <Text style={{position: 'absolute', right: 0}}>f</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: 'green',
                  }}></View>
              </View>
            ))}
          </ScrollView>
          <ActivityIndicator
            size={100}
            style={[
              usersData.length == 0 ? styles.blockDisplay : styles.display,
              styles.indicator,
            ]}
          />
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  emailError: {
    borderBottomColor: 'red',
  },
  indicator: {
    flex: 1,
    position: 'absolute',
    top: 250,
    left: '35%',
  },
  display: {
    display: 'none',
  },
  blockDisplay: {
    display: 'block',
  },
  button: {
    color: 'white',
    backgroundColor: '#1A5319',
    padding: 5,
    fontSize: 25,
    paddingStart: 12,
    fontWeight: '',
  },
  userList: {
    tableContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    table: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
  registration: {
    block: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255,255,255, 0.8)',
      elevation: 20,
      borderTopLeftRadius: 100,
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
    submit: {
      backgroundColor: 'green',
      color: 'white',
      padding: 5,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      // width:"50%"
    },
    reset: {
      backgroundColor: 'orange',
      color: 'white',
      padding: 5,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  },
});
