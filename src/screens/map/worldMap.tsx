import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
// import WorldMap from 'react-native-world-map-svg';
import {worldmap} from '../../assets/svg/worldmap';
import MapboxGL from '@rnmapbox/maps';

export const World = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.12,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
            List of Internet Users WorldWide
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: '2.%',
            }}>
            <View style={styles.dataBox}></View>
            <View style={styles.dataBox}></View>
            <View style={styles.dataBox}></View>
            {/* {values.map((data: any, index: number) => {
              return (
                <View style={styles.dataBox}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {'Country: ' + data['Country or Area']}
                  </Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {'Users: ' + data['Internet Users']}
                  </Text>
                </View>
              );
            })} */}
          </View>
        </View>
      </View>
      <View style={{flex: 0.9}}>
        {/* <WorldMap  /> */}
        {/* <WorldMap
          color="red"
          title="Top 10 Populous Countries"
          value-suffix="people"
          size="lg"
          data={data}
        /> */}
        {/* <WorldMap data={data} title="aaasd" />
         */}
        {/* <WorldMap selected={selected} onSelect={onSelect} /> */}
        {/* <WorldMap  /> */}
        <MapboxGL.MapView style={{flex: 1}} />
      </View>
    </View>
  );
};
