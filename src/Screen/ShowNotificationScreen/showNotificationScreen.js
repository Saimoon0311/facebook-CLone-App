import React from 'react';
import {View, Text} from 'react-native';

export default function showNotificationScreen({route, navigation}) {
  const item = route.params;
  console.log(2345678, item);
  // {"collapseKey": "com.facebookclonepractice", "data": {"ad": "Saimoon",
  //  "customData": "{\"_id\":\"62472ff3b0ea91d8cdc5bee7\",\"userId\":\"61c586dd0c2defd28f453548\",\"description\":\"Hwjajshs\",\"image\":\"\",\"likes\":[\"61c586dd0c2defd28f453548\"],\"postName\":\"Muhammad Saimoon\",\"profilePicture\":\"UserImages/ivzixgcrdxwh7awzr8a5\",\"hidePost\":[],\"createdAt\":\"2022-04-01T17:01:39.248Z\",\"updatedAt\":\"2022-06-08T11:37:24.416Z\",\"__v\":0}", "id": "1", "subTitle": "Muhammad Saimoon"}, "from": "397458988617", "messageId": "0:1654688249488299%40e1cbe540e1cbe5", "notification": {"android": {"color": "#00b2f7", "imageUrl": "https://www.pexels.com/photo/brunette-posing-in-suit-12296893/", "priority": 1, "sound": "default"}, "body": "Hwjajshs", "title": "Bilal Ahmed like your post"}, "sentTime": 1654688249481, "ttl": 2419200}
  return (
    <View>
      <Text>ksjdfhjksdhkf</Text>
    </View>
  );
}
