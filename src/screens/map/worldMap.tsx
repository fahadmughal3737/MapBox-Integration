import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from './style';
import {BarChart} from 'react-native-gifted-charts';
import {dataSet} from '../../services/dataset/dataset';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const lookup = require('country-code-lookup');

export const World = () => {
  const [load, setLoad] = useState(true);
  const [barData, setBarData] = useState<any>([]);
  const [Data, setData] = useState<any>([]);

  useEffect(() => {
    dataSet.map((data: any, index: number) => {
      let _country = lookup.byCountry(data['Country or Area']);
      console.log('__', _country);
      let _obj = {
        value: parseInt(data['Internet Users']),
        // label: _country.fips,
        label: LabelRender(_country?.iso3),
      };
      barData.push(_obj);
    });
    dataSet.map((data: any, index: number) => {
      let _country = lookup.byCountry(data['Country or Area']);
      console.log('__', _country);
      let _obj = {
        value: parseInt(data['Internet Users']),
        // label: _country.fips,
        label: LabelHorizontal(_country?.iso3),
      };
      Data.push(_obj);
    });
    if (barData.length > 0) {
      console.log('inside IF ');
      setLoad(false);
    }
  }, []);
  const LabelHorizontal = (text: string) => {
    return (
      <View
        style={{
          // width: widthPercentageToDP('6.7'),
          width: widthPercentageToDP('6.7'),
          // marginLeft: widthPercentageToDP('5'),

          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            color: 'black',
            // backgroundColor: 'red',
            fontWeight: 'bold',
          }}>
          {text}
        </Text>
      </View>
    );
  };
  const LabelRender = (text: string) => {
    console.log('test chk', text);
    let _renderArr = [];
    _renderArr.push(text?.substring(0, 1));
    _renderArr.push(text?.substring(1, 2));
    _renderArr.push(text?.substring(2, 3));
    console.log('ren', _renderArr);
    return (
      <View
        style={{
          // width: widthPercentageToDP('6.7'),
          width: widthPercentageToDP('2.9'),
          // marginLeft: widthPercentageToDP('5'),

          alignItems: 'flex-end',
        }}>
        {/* <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{
            color: 'black',
            // backgroundColor: 'red',
            fontWeight: '400',
            fontSize: 8,
          }}>
          {text}
  
        </Text> */}
        <View style={{marginTop: 15, top: 10}}>
          {_renderArr.map((data: string, index: number) => {
            return (
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={{
                  color: 'black',

                  // backgroundColor: 'red',

                  fontWeight: '400',
                  fontSize: 8,
                }}>
                {data}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };
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
          </View>
        </View>
      </View>
      <View style={{flex: 0.9}}>
        {load ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
              }}>
              <BarChart
                spacing={10}
                initialSpacing={20}
                frontColor={'#177AD5'}
                barWidth={8}
                data={barData}
                // labelWidth={40}
                width={widthPercentageToDP(80)}
                disableScroll={true}
                height={heightPercentageToDP('25')}
                noOfSections={5}
                xAxisLabelTextStyle={{}}
                yAxisLabelSuffix="k"
                xAxisIndicesWidth={200}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
              }}>
              <BarChart
                spacing={10}
                initialSpacing={20}
                frontColor={'#177AD5'}
                barWidth={25}
                data={Data}
                // labelWidth={40}
                width={widthPercentageToDP(80)}
                // disableScroll={true}
                height={heightPercentageToDP('25')}
                noOfSections={5}
                xAxisLabelTextStyle={{}}
                yAxisLabelSuffix="k"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
