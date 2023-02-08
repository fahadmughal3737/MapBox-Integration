import {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {styles} from './style';
// import {BarChart} from 'react-native-gifted-charts';
import {BarChart} from 'react-native-chart-kit';
import {dataSet} from '../../services/dataset/dataset';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useOrientation} from '../../components/deviceorientation/orientation';
import lookup from 'country-code-lookup';
// import {LabelRender} from '../../components/labels/labelRender';
import LabelRender from '../../components/labels/labelRender';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const PretoChart = () => {
  const [load, setLoad] = useState(false);
  const [barData, setBarData] = useState<any>([]);
  const orientation = useOrientation();
  const sortData = dataSet.sort(function (a, b) {
    return +b['Internet Users'] - +a['Internet Users'];
  });
  useEffect(() => {
    setBarData(
      dataSet.slice(0, 3).map((data: any, index: number) => {
        let _country = lookup.byCountry(data['Country or Area']);
        return {
          value: +data['Internet Users'],
          label: _country?.iso3,
          labelTextStyle: {
            fontSize: 2,
          },
          leftShiftForTooltip: index > 15 ? 15 : 0,
          dataObj: data,
        };
      }),
    );
  }, []);
  const chartConfig = {
    backgroundGradientFrom: '#000000',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#000000',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.1,
    useShadowColorFromDataset: false, // optional
  };
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ],
    datasets: [
      {
        data: [
          20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99,
          43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80,
          99, 43,
        ],
      },
    ],
  };
  // const LabelRender = (text: string) => {
  //   let _renderArr = [...text];
  //   return (
  //     <View
  //       style={{
  //         width: widthPercentageToDP('1.9'),
  //         alignItems: 'flex-end',
  //       }}>
  //       <View style={styles.labelMargin}>
  //         {_renderArr.map((data: string) => {
  //           return (
  //             <Text
  //               numberOfLines={1}
  //               adjustsFontSizeToFit={true}
  //               style={styles.barLabel}>
  //               {data}
  //             </Text>
  //           );
  //         })}
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topNavContainer}>
        <View style={styles.topSeparator}>
          <Text style={styles.mainHeading}>Internet Users WorldWide</Text>
          <View style={styles.topThree}>
            {sortData.slice(0, 3).map((data: any) => {
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
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View
        style={{
          height:
            orientation === 'PORTRAIT'
              ? heightPercentageToDP('50')
              : widthPercentageToDP('95'),
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
                  : widthPercentageToDP('90'),
              justifyContent: 'center',
            }}>
            {/* <BarChart
              leftShiftForLastIndexTooltip={55}
              renderTooltip={(item: any) => {
                return (
                  <View style={styles.toolTip}>
                    <Text>{item.value}</Text>
                  </View>
                );
              }}
              xAxisLabelTextStyle={{
                transformY: 50,
                fontSize: 24,
              }}
              labelsExtraHeight={60}
              spacing={3}
              initialSpacing={7}
              frontColor={'#177AD5'}
              // barWidth={8}
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
            /> */}
            <BarChart
              style={{}}
              data={data}
              width={screenWidth}
              height={400}
              yAxisLabel="$"
              yAxisSuffix="a"
              chartConfig={chartConfig}
              verticalLabelRotation={90}
            />
          </View>
        )}
        <View style={{height: 60}}></View>
      </View>
    </ScrollView>
  );
};
