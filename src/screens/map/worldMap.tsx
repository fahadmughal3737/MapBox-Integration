import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {BarChart} from 'react-native-gifted-charts';
import {dataSet} from '../../services/dataset/dataset';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useOrientation} from '../../components/deviceorientation/orientation';
const lookup = require('country-code-lookup');
export const World = () => {
  const [load, setLoad] = useState(true);
  const [barData, setBarData] = useState<any>([]);
  const orientation = useOrientation();

  const sortData = dataSet.sort(function (a, b) {
    return parseInt(b['Internet Users']) - parseInt(a['Internet Users']);
  });
  console.log('sort data', sortData);

  useEffect(() => {
    dataSet.map((data: any, index: number) => {
      let _country = lookup.byCountry(data['Country or Area']);
      console.log('__', _country);
      let _obj = {
        value: parseInt(data['Internet Users']),
        // label: _country.fips,
        label: LabelRender(
          _country === undefined || _country === null ? 'NUL' : _country?.iso3,
        ),
      };
      barData.push(_obj);
    });

    if (barData.length > 0) {
      console.log('inside IF ');
      setLoad(false);
    }
  }, []);

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
          width: widthPercentageToDP('1.9'),
          alignItems: 'flex-end',
        }}>
        <View style={{marginTop: 15, top: 10}}>
          {_renderArr.map((data: string, index: number) => {
            return (
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={{
                  color: 'black',
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
    <ScrollView style={styles.container}>
      <View
        style={{
          height: '35%',
        }}>
        <View
          style={{
            justifyContent: 'space-evenly',
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}>
            Internet Users WorldWide
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: '5%',
            }}>
            {sortData.slice(0, 3).map((data: any, index: number) => {
              return (
                <View
                  style={{
                    height: orientation === 'PORTRAIT' ? 65 : 100,
                    width: orientation === 'PORTRAIT' ? 130 : 280,

                    backgroundColor: '#ffffff',
                    borderRadius: 5,
                    elevation: 5,
                    justifyContent: 'center',
                    padding: '2%',
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    {data['Country or Area']}
                  </Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {data['Internet Users'] + ' Users'}
                  </Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {data['Percentage']}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{flex: 0.9}}>
        {load ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View
            style={{
              height:
                orientation === 'PORTRAIT'
                  ? heightPercentageToDP('40')
                  : widthPercentageToDP('60'),
              justifyContent: 'center',
            }}>
            <BarChart
              spacing={10}
              initialSpacing={10}
              frontColor={'#177AD5'}
              barWidth={8}
              data={barData}
              // labelWidth={40}
              width={
                orientation === 'PORTRAIT'
                  ? widthPercentageToDP('83')
                  : heightPercentageToDP('98')
              }
              disableScroll={true}
              height={
                orientation === 'PORTRAIT'
                  ? heightPercentageToDP('25')
                  : widthPercentageToDP('35')
              }
              noOfSections={5}
              xAxisLabelTextStyle={{}}
              yAxisLabelSuffix="k"
              xAxisIndicesWidth={200}
            />
          </View>
        )}
        <View style={{height: 60}}></View>
      </View>
    </ScrollView>
  );
};
