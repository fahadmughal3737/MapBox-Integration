import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {styles} from './style';
import {BarChart} from 'react-native-gifted-charts';
import {dataSet} from '../../services/dataset/dataset';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useOrientation} from '../../components/deviceorientation/orientation';
import lookup from 'country-code-lookup';
export const PretoChart = () => {
  const [load, setLoad] = useState(true);
  const [barData, setBarData] = useState<any>([]);
  const orientation = useOrientation();
  const sortData = dataSet.sort(function (a, b) {
    return +a['Internet Users'] - +b['Internet Users'];
  });
  useEffect(() => {
    dataSet.map((data: any, index: number) => {
      let _country = lookup.byCountry(data['Country or Area']);
      let _obj = {
        value: parseInt(data['Internet Users']),
        label: LabelRender(
          _country === undefined || _country === null ? 'NUL' : _country?.iso3,
        ),
        leftShiftForTooltip: index > 15 ? 15 : 0,
        dataObj: data,
      };
      barData.push(_obj);
    });

    if (barData.length > 0) {
      setLoad(false);
    }
  }, []);
  const LabelRender = (text: string) => {
    let _renderArr = [];
    _renderArr.push(text?.substring(0, 1));
    _renderArr.push(text?.substring(1, 2));
    _renderArr.push(text?.substring(2, 3));
    return (
      <View
        style={{
          width: widthPercentageToDP('1.9'),
          alignItems: 'flex-end',
        }}>
        <View style={styles.labelMargin}>
          {_renderArr.map((data: string, index: number) => {
            return (
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={styles.barLabel}>
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
      <View style={styles.topNavContainer}>
        <View style={styles.topSeparator}>
          <Text style={styles.mainHeading}>Internet Users WorldWide</Text>
          <View style={styles.topThree}>
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
                  <Text style={styles.subHeading}>
                    {data['Country or Area']}
                  </Text>
                  <Text style={styles.basicText}>
                    {data['Internet Users'] + ' Users'}
                  </Text>
                  <Text style={styles.basicText}>{data['Percentage']}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View
        style={{
          height: heightPercentageToDP('50'),
          justifyContent: 'space-around',
        }}>
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
              onPress={(item: any, index: any) => {}}
              leftShiftForLastIndexTooltip={55}
              renderTooltip={(item: any, index: any) => {
                return (
                  <View style={styles.toolTip}>
                    <Text>{item.value}</Text>
                  </View>
                );
              }}
              spacing={3}
              initialSpacing={7}
              frontColor={'#177AD5'}
              barWidth={8}
              data={barData}
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
