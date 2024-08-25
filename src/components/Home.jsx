import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Vibration,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import BackgroundImage from './ImageBackground';
import {useToast} from 'react-native-toast-notifications';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
const image = {uri: 'https://wallpaperaccess.com/full/3348599.jpg'};
export var url = 'https://crud-application-k1lr.vercel.app';
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
  const [isConnected, setIsConnected] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [isFocused, setisFocused] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userQualification, setUserQualification] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userDOB, setUserDOB] = useState('');
  const [userGender, setUserGender] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [gender, setGender] = useState('');

  const toast = useToast();

  const toastNot = (c, m) => {
    toast.show(c, {
      type: m,
      placement: 'top',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in',
    });
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
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your network settings.',
        );
      }
    });
    unsubscribe();
    if (userEmail.length <= 6) {
      setEmailInvalid(true);
      toastNot('invalid input', 'warning');
    } else if (isConnected == false) {
    } else {
      setVisibleModal(true);
      try {
        let res = await axios.post(`${url}/register-user`, userData);
        if (res.data == 'submited') {
          setVisibleModal(false);
          Vibration.vibrate(500);
          toastNot('Data submited', 'success');
          setUserName('');
          setUserEmail('');
          setUserPhone('');
          setUserCity('');
          setUserQualification('qualification');
          setUserGender('gender');
        } else if (res.data == 'exists') {
          setVisibleModal(false);
          toastNot('Email is already Registered', 'warning');
        } else {
          setVisibleModal(false);
          toastNot('network error', 'danger');
        }
      } catch (err) {
        setVisibleModal(false);
      }
    }
  };
  const handleonReset = () => {
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserCity('');
    setUserQualification('qualification');
    setUserGender('gender');
    // setUserDOB(dates)
  };
  const holdOnRegister = ()=> {
    Vibration.vibrate(200)
    alert('designed by @abhinay sharma')
  }

  return (
    <>
      <Modal transparent={true} visible={visibleModal}>
        <View
          style={{
            backgroundColor: 'rgba(100,100,100,0.7)',
            height: '100%',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{height: 100, width: 100}}>
            <ActivityIndicator size={150} color={'white'} />
          </View>
        </View>
      </Modal>
      <BackgroundImage imageUrl={image}>
        <Toast />
        <ScrollView style={[styles.registration.block, {zIndex: 1}]}>
          <View style={styles.registration.parent}>
            <Text
              style={styles.registration.text}
              onLongPress={holdOnRegister}>
              Registered
            </Text>

            <View style={styles.registration.inputParent}>
              <Text
                style={[
                  styles.registration.blur,
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
                autoFocus
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
              <Text style={[styles.registration.blur]}>DOB</Text>
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
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 20,
                  marginLeft: 20,
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  style={{
                    display: 'felx',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      padding: 1.5,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <View
                      style={[
                        {height: '100%', width: '100%'},
                        gender == 'male'
                          ? {backgroundColor: 'blue', borderRadius: 100}
                          : null,
                      ]}></View>
                  </View>
                  <Text>male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('female')}
                  style={{
                    display: 'felx',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      padding: 1.5,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <View
                      style={[
                        {height: '100%', width: '100%'},
                        gender == 'female'
                          ? {backgroundColor: 'blue', borderRadius: 100}
                          : null,
                      ]}></View>
                  </View>
                  <Text>female</Text>
                </TouchableOpacity>
              </View>
              

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
                  setUserDOB(date.toLocaleDateString());
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
  const [isInternet, setInternet] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [userVisibleModal, setUserVisibleModal] = useState(false);
  const [userListLoader, setUserListLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  var sr_no = 0;
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
    setUserListLoader(true);
    try {
      let res = await axios.get(`${url}/users`);
      setUserListLoader(false);
      setUsersData(res.data);
    } catch (err) {}
  };
  const refreshApi = async () => {
    setRefreshing(true);
    try {
      let res = await axios.get(`${url}/users`);
      setRefreshing(false);
      setUsersData(res.data);
      // setUserListLoader(false);
    } catch (err) {}
  };

  useEffect(() => {
    getApi();
  }, []);
  const handleOnSearch = async () => {
    let searchData = {data: inputValue};
    setUserListLoader(true);
    try {
      let res = await axios.post(`${url}/search`, searchData);
      setUserListLoader(false);
      setUsersData(res.data);
    } catch (err) {}
  };
  const handleOnCross = () => {
    setInputValue('');
    setUserVisibleModal(true);
    getApi();
    setUserVisibleModal(false);
  };
  const handleOnLongPress = item => {
    Vibration.vibrate(100)
    Alert.alert('designed by @abhinay sharma')
  };

  return (
    <BackgroundImage imageUrl={image}>
      <View
        style={[styles.registration.block, {padding: 10, paddingBottom: 150}]}>
        
        <Text style={styles.registration.text} onPress={handleOnLongPress}>UsersList</Text>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="search here"
              value={inputValue}
              onChangeText={e => setInputValue(e)}
              style={{
                borderWidth: 1,
                borderColor: 'blue',
                padding: 0,
                width: 200,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                paddingLeft: 15,
                borderRightWidth: 0,
              }}
            />
            <Text
              style={[
                {
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: 'blue',
                },
                inputValue.length == 0
                  ? {color: 'transparent'}
                  : {color: 'black'},
              ]}
              onPress={handleOnCross}>
              X
            </Text>
          </View>

          <TouchableOpacity>
            <Text
              style={[
                {
                  paddingVertical: 5,
                  backgroundColor: 'blue',
                  color: 'white',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  paddingHorizontal: 15,
                },
              ]}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <Text>total users :- {usersData?.length}</Text>
        <View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 12}}>
            <Text style={[styles.userList.table, {marginRight: 10}]}>s.no</Text>
            <Text style={[styles.userList.table, {flexGrow: 2}]}>Name</Text>
            {/* <Text style={styles.userList.table}>Phone</Text> */}
            <Text style={[styles.userList.table, {flexGrow: 2}]}>Email</Text>
          </View>
          
          <Modal transparent={true} visible={userListLoader}>
            <View
              style={{
                backgroundColor: 'rgba(100,100,100,0.0)',
                height: '100%',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{height: 100, width: 100}}>
                <ActivityIndicator size={100} color={'white'} />
              </View>
            </View>
          </Modal>
          <FlatList
            onRefresh={refreshApi}
            refreshing={refreshing}
            data={usersData}
            renderItem={({item, i}) => (
              <View key={item.email}>
                <TouchableOpacity
                  onPress={() => handleOnDetails(item, i)}
                  onLongPress={() => handleOnLongPress(item.email)}
                  key={i}>
                  <View style={styles.userList.tableContainer}>
                    <Text
                      style={{
                        marginRight: 25,
                        marginLeft: 5,
                        height: 27,
                        width: 25,
                      }}>
                      {(sr_no += 1)}
                    </Text>
                    <Text
                      style={{width: '40%', overflow: 'hidden', height: 23}}>
                      {item.name}
                    </Text>
                    {/* <Text>0108108108</Text> */}
                    <Text
                      style={{width: '40%', overflow: 'hidden', height: 21}}>
                      {item.email.length >= 15 ? `${item.email.substring(0,14)}...` : item.email}
                    </Text>
                    {/* <Text style={{position: 'absolute', right: 0}}>f</Text> */}
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: 'green',
                  }}></View>
              </View>
            )}
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
