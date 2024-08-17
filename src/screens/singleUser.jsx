import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {perticularUser} from '../components/Home';
import BackgroundImage from '../components/ImageBackground';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {url} from '../components/Home';
import Toast from 'react-native-toast-message';
import {useToast} from 'react-native-toast-notifications';

const SingleUser = () => {
  const [userName, setUserName] = useState(perticularUser.name);
  const [userEmail, setUserEmail] = useState(perticularUser.email);
  const [userPhone, setUserPhone] = useState(perticularUser.phone);
  const [userQualification, setUserQualification] = useState(perticularUser.qualification);
  const [userCity, setUserCity] = useState(perticularUser.city);
  const [userDOB, setUserDOB] = useState(perticularUser.dob);
  const [userGender, setUserGender] = useState(perticularUser.gender);
  var navigation = useNavigation();
  const [isUpdationOpen, setUpdationOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const handleNameRef = useRef(null);
  
  const focusing = () => {
    handleNameRef.current?.focus();
  };
  const toastNotify = (e,t) => {
    
    Toast.show({
      type: t,
      text1: e,
    });
  
}
const toast = useToast();

  const toastNot = (c,m)=>{
    toast.show(c, {
      type: m,
      placement: "top",
      duration: 2000,
      offset: 30,
      animationType: "slide-in",
    });
  }
  const updatingData = async () => {
    let updatedData = {
      id: perticularUser.userId,
      name: userName,
      email: userEmail,
      phone: userPhone,
      city: userCity,
    };
    let response = await axios.put(`${url}/update`, updatedData);
    if (response.data == 'data updated') {
      toastNot('Data Updated','success')
      setTimeout(() => {
        navigation.navigate('User');
      }, 1000);
    }
  };
  const handleOnUpdate = () => {
    if (isUpdationOpen == true) {
      updatingData();
      setIsUpdated(true);
      setUpdationOpen(false);
    } else {
      setUpdationOpen(true);
      focusing();
    }
  };
  const handleOnDelete = async () => {
    if (isUpdationOpen) {
      setUpdationOpen(false);
      setIsUpdated(false);
    } else {
      let id = perticularUser.userId;
      let res = await axios.delete(`${url}/delete/${id}`);
      if (res.data == 'deleted') {
        toastNot('user deleted','success')
        setTimeout(() => {
          navigation.navigate('User');
        }, 1000);
      }
    }
  };
  
  return (
    <>
    <Toast />
    <View style={[styles.bg]}>
      
      <View style={styles.paddingBlock}>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>Name :</Text>
          <Text style={[styles.data, isUpdationOpen && styles.dataHide]}>
            {isUpdated == true ? userName : perticularUser.name}
          </Text>
          <TextInput
            placeholder="type here"
            ref={handleNameRef}
            value={userName}
            style={[!isUpdationOpen && styles.dataHide, styles.input]}
            onChangeText={e => setUserName(e)}></TextInput>
        </View>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>Email : </Text>
          <Text style={[styles.data, isUpdationOpen && styles.dataHide]}>
            {isUpdated == true ? userEmail : perticularUser.email}
          </Text>
          <TextInput
            placeholder="type here"
            value={userEmail}
            style={[!isUpdationOpen && styles.dataHide, styles.input]}
            onChangeText={e => setUserEmail(e)}></TextInput>
        </View>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>Phone : </Text>
          <Text style={[styles.data, isUpdationOpen && styles.dataHide]}>
            {isUpdated == true ? userPhone : perticularUser.phone}
          </Text>
          <TextInput
            placeholder="type here"
            value={userPhone}
            style={[!isUpdationOpen && styles.dataHide, styles.input]}
            onChangeText={e => setUserPhone(e)}></TextInput>
        </View>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>DOB : </Text>
          <Text style={[styles.data, isUpdationOpen && styles.dataHide]}>
            {isUpdated == true ? userDOB : perticularUser.dob}
          </Text>
          <TextInput
            placeholder="dd/mm/yy"
            value={userDOB}
            style={[!isUpdationOpen && styles.dataHide, styles.input]}
            onChangeText={e => setUserDOB(e)}></TextInput>
        </View>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>Gender : </Text>
          <Text style={[styles.data, isUpdationOpen && styles.dataHide]}>
            {perticularUser.gender}
          </Text>
          <TextInput
            placeholder="type here"
            value={userGender}
            style={[!isUpdationOpen && styles.dataHide, styles.input]}
            onChangeText={e => setUserName(e)}></TextInput>
        </View>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>City : </Text>
          <Text style={[styles.data, isUpdationOpen && styles.dataHide]}>
            {perticularUser.city}
          </Text>
          <TextInput
            placeholder="type here"
            value={userCity}
            style={[!isUpdationOpen && styles.dataHide, styles.input]}
            onChangeText={e => setUserCity(e)}></TextInput>
        </View>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>Qualification : </Text>
          <Text style={[styles.data]}>{userQualification}</Text>
        </View>
        <View style={styles.propertyWraper}>
          <Text style={styles.heading}>Registration Date : </Text>
          <Text style={[styles.data]}>{perticularUser.date}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          marginVertical: 15,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity onPress={handleOnUpdate}>
          <Text
            style={{
              color: 'white',
              backgroundColor: 'blue',
              paddingVertical: 5,
              paddingHorizontal: 20,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {isUpdationOpen == true ? 'Change' : 'Update'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnDelete}>
          <Text
            style={{
              color: 'white',
              backgroundColor: 'orange',
              paddingVertical: 5,
              paddingHorizontal: 20,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {isUpdationOpen == true ? 'Cancel' : 'Delete'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};
let styles = StyleSheet.create({
  dataHide: {
    display: 'none',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'blue',
    padding: 0,
    width: '60%',
    // fontSize:25
  },
  showModal: {
    display: 'block',
    position: 'absolute',
    height: '50%',
    backgroundColor: 'white',
    width: '100vw',
  },
  hideModal: {
    display: 'none',
  },
  bg: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.111)',
    padding: 30,
    borderWidth: 2,
    width: '100%',
  },
  paddingBlock: {},
  propertyWraper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  data: {},
});

export default SingleUser;
