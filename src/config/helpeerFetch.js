import React from 'react';
import {API_BASED_URL} from './url';
import {Text} from 'react-native';

export const ApiPost = async (url, body, headerType) => {
  var myHeaders = new Headers();
  headerType == true
    ? myHeaders.append('Content-Type', 'multipart/form-data')
    : myHeaders.append('Content-Type', 'application/json');
  return fetch(url, {
    //   return fetch('http://localhost:5000/api/v1/auth/register', {
    method: 'POST',
    body: body,
    headers: myHeaders,
    redirect: 'follow',
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      return err;
    });
};

export const ApiGet = async url => {
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      return err;
    });
};

export const ApiPut = async (url, body, confirm) => {
  // console.log(38, body);
  var myHeaders = new Headers();
  confirm == true
    ? myHeaders.append('Content-Type', 'multipart/form-data')
    : myHeaders.append('Content-Type', 'application/json');
  return fetch(url, {
    method: 'PUT',
    body: body,
    headers: myHeaders,
    redirect: 'follow',
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      return err;
    });
};

export const ApiDelete = async url => {
  return fetch(url, {
    method: 'DELETE',
    redirect: 'follow',
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      return TypeError;
    });
};
