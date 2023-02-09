import {useState} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {styles} from './style';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {dataSet} from '../../services/dataset/dataset';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useOrientation} from '../../components/deviceorientation/orientation';
import lookup from 'country-code-lookup';
import {styled} from 'nativewind';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width - 100;
const screenHeight = Dimensions.get('window').height - 100;
const StyledView = styled(View);
const StyledText = styled(Text);
export const Chart = () => {
  const [load, setLoad] = useState(false);
  const orientation = useOrientation();
  const sortData = dataSet.sort(function (a, b) {
    return +b['Internet Users'] - +a['Internet Users'];
  });
  const Regions: any = {};
  dataSet.forEach(x => {
    const region = lookup.byCountry(x['Country or Area'])?.region;
    if (!region) return;
    if (region in Regions) {
      Regions[region] += x['Internet Users'];
    }
    Regions[region] = x['Internet Users'];
  });
  const calcucateBarOercentage = () => {
    return orientation === 'PORTRAIT'
      ? Object.keys(Regions).length / screenHeight
      : Object.keys(Regions).length / screenWidth;
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: false,
    fillShadowGradientFrom: '#28aac8',
    fillShadowGradientTo: '#28aac8',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    barPercentage: +calcucateBarOercentage(),
    decimalPlaces: 0,
    // formatXLabel: (xLabel: string) => {
    //   return <StyledView className="p-1 font-semibold">{xLabel}</StyledView>;
    // },
  };

  const data = {
    labels: Object.keys(Regions),
    datasets: [
      {
        data: Object.values(Regions),
      },
    ],
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
                  <StyledText className="text-slate-900">
                    {'Number ' + +(index + 1)}
                  </StyledText>
                  <StyledText style={styles.basicText}>
                    {data['Internet Users'] + ' Users'}
                  </StyledText>
                  <StyledText className="text-slate-900">
                    {data['Country or Area']}
                  </StyledText>
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
              ? heightPercentageToDP('70')
              : widthPercentageToDP('160'),
        }}>
        {load ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <BarChart
              style={{flex: 1}}
              data={data}
              width={
                orientation === 'PORTRAIT'
                  ? widthPercentageToDP('100')
                  : heightPercentageToDP('100')
              }
              height={
                orientation === 'PORTRAIT'
                  ? heightPercentageToDP('65')
                  : widthPercentageToDP('150')
              }
              // yAxisLabel=""
              // yAxisSuffix=""
              chartConfig={chartConfig}
              verticalLabelRotation={90}
              withInnerLines={true}
              withCustomBarColorFromData={false}
              fromZero={true}
              showBarTops={false}
              onDataPointClick={({value, dataset, getColor}: any) =>
                console.log('test:', value)
              }
              bezier
              // propsForLabels={{
              //   fontSize: 5,
              // }}
              // xAxisLabel=""
            />
          </View>
        )}
      </View>
      <View style={{height: 200}}></View>
    </ScrollView>
  );
};
