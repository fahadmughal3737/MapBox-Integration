import {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
    const region = lookup.byCountry(x['Country or Area'])?.iso3;
    if (!region) return;
    if (region in Regions) {
      Regions[region] += x['Internet Users'];
    }
    Regions[region] = x['Internet Users'];
  });
  const calculateBarPercentage = () => {
    return orientation === 'PORTRAIT'
      ? Object.keys(Regions).length / screenHeight + 0.05
      : Object.keys(Regions).length / screenWidth + 0.4;
  };
  console.log('Regionsss', Regions);
  const chartConfig = {
    backgroundGradientFrom: '#f0f2f7',
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: '#f0f2f7',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: false,
    fillShadowGradientFrom: '#28aac8',
    fillShadowGradientTo: '#28aac8',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    barPercentage: +calculateBarPercentage(),
    decimalPlaces: 0,
    formatXLabel: (xLabel: string) => {
      console.log('xLABELLL', xLabel);
      return xLabel;
    },
    formatYLabel: (yLabel: string) => {
      const Label = nFormatter(parseInt(yLabel));
      return Label === undefined ? '0' : Label;
    },
  };
  const nFormatter = (num: number) => {
    if (num >= 1000000000) {
      return `${
        (num / 1000000000).toFixed(2).replace(/\.0$/, '').split('.')[0]
      } B`;
    }

    if (num >= 1000000) {
      return `${
        (num / 1000000).toFixed(2).replace(/\.0$/, '').split('.')[0]
      } M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2).replace(/\.0$/, '').split('.')[0]} K`;
    }
  };
  console.log('object.keys(regions)', Object.keys(Regions));
  const data = {
    labels: Object.keys(Regions).splice(orientation === 'PORTRAIT' ? 20 : 10),
    datasets: [
      {
        data: Object.values(Regions).splice(
          orientation === 'PORTRAIT' ? 20 : 10,
        ),
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
              renderBars={(obj: any) => {
                console.log(obj);
              }}
              chartConfig={chartConfig}
              verticalLabelRotation={90}
              withInnerLines={true}
              withCustomBarColorFromData={false}
              fromZero={true}
              showBarTops={true}
              onDataPointClick={({value, dataset, getColor}: any) =>
                console.log('test:', value)
              }
            />
          </View>
        )}
      </View>
      <View style={{height: 200}}></View>
    </ScrollView>
  );
};
