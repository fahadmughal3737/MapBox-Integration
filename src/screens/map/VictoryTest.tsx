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
import {dummyLabel} from '../../services/dataset/dummylabel';
import {dummyData} from '../../services/dataset/dummydata';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryPie,
  VictoryZoomContainer,
  Bar,
} from 'victory-native';
const screenWidth = Dimensions.get('window').width - 100;
const screenHeight = Dimensions.get('window').height - 100;
const StyledView = styled(View);
const StyledText = styled(Text);
export const VictoryTest = () => {
  console.log(
    'LENGTHS CHECk DUMMYLABEL AND DUMMY DATA',
    dummyLabel.length + '  ',
    dummyData.length,
  );
  const [load, setLoad] = useState(false);
  const orientation = useOrientation();
  console.log('dataset', dataSet.length);
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
  console.log('asdsa', Object.keys(Regions).length);

  const calculateBarPercentage = () => {
    // return orientation === 'PORTRAIT'
    //   ? Object.keys(Regions).length / screenHeight + 0.35
    //   : Object.keys(Regions).length / screenWidth + 0.7;
    return orientation === 'PORTRAIT'
      ? dummyData.length / screenHeight + 0.35
      : dummyData.length / screenWidth + 0.7;
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
  const datadum = [
    {quarter: '1', earnings: '100'},
    {quarter: '2', earnings: '120'},
    {quarter: '3', earnings: '14250'},
    {quarter: '3', earnings: '19000'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '5', earnings: '14250'},
    {quarter: '5', earnings: '19000'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '3', earnings: '14250'},
    {quarter: '3', earnings: '19000'},
    {quarter: '3', earnings: '13000'},
    {quarter: '2', earnings: '16500'},
    {quarter: '3', earnings: '14250'},
    {quarter: '5', earnings: '19000'},
    {quarter: '6', earnings: '13000'},
    {quarter: '7', earnings: '16500'},
    {quarter: '8', earnings: '14250'},
    {quarter: '1', earnings: '100'},
    {quarter: '2', earnings: '120'},
    {quarter: '3', earnings: '14250'},
    {quarter: '3', earnings: '19000'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '5', earnings: '14250'},
    {quarter: '5', earnings: '19000'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '3', earnings: '14250'},
    {quarter: '3', earnings: '19000'},
    {quarter: '3', earnings: '13000'},
    {quarter: '2', earnings: '16500'},
    {quarter: '3', earnings: '14250'},
    {quarter: '5', earnings: '19000'},
    {quarter: '6', earnings: '13000'},
    {quarter: '7', earnings: '16500'},
    {quarter: '8', earnings: '14250'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '5', earnings: '14250'},
    {quarter: '5', earnings: '19000'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '3', earnings: '14250'},
    {quarter: '3', earnings: '19000'},
    {quarter: '3', earnings: '13000'},
    {quarter: '2', earnings: '16500'},
    {quarter: '3', earnings: '14250'},
    {quarter: '5', earnings: '19000'},
    {quarter: '6', earnings: '13000'},
    {quarter: '7', earnings: '16500'},
    {quarter: '8', earnings: '14250'},
    {quarter: '1', earnings: '100'},
    {quarter: '2', earnings: '120'},
    {quarter: '3', earnings: '14250'},
    {quarter: '3', earnings: '19000'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '5', earnings: '14250'},
    {quarter: '5', earnings: '19000'},
    {quarter: '4', earnings: '13000'},
    {quarter: '4', earnings: '16500'},
    {quarter: '3', earnings: '14250'},
    {quarter: '3', earnings: '19000'},
    {quarter: '3', earnings: '13000'},
    {quarter: '2', earnings: '16500'},
    {quarter: '38', earnings: '14250'},
    {quarter: '30', earnings: '19000'},
    {quarter: '28', earnings: '13000'},
    {quarter: '20', earnings: '16500'},
    {quarter: '8', earnings: '14250'},
    // {quarter: 4, earnings: 19000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
    // {quarter: 1, earnings: 13000},
    // {quarter: 2, earnings: 16500},
    // {quarter: 3, earnings: 14250},
    // {quarter: 4, earnings: 19000},
  ];
  console.log('object.keys(regions)', Object.keys(Regions));
  console.log('first cal test', screenWidth / Object.keys(Regions).length);
  console.log('normalLL test', Object.values(Regions).length);
  console.log(
    'spliceee test',
    Object.values(Regions).splice(
      screenWidth / Object.values(Regions).length -
        Object.values(Regions).splice(
          screenWidth / Object.values(Regions).length,
        ).length,
    ).length,
  );
  console.log('NEW SPLICEEEEE ', dummyLabel.splice(screenWidth / 15).length);
  const data = {
    labels:
      //   orientation === 'PORTRAIT'
      //     ? dummyLabel.splice(screenWidth / 15)
      //     : dummyLabel.splice(screenHeight / 15),

      Object.keys(Regions).splice(
        screenWidth / Object.keys(Regions).length -
          Object.keys(Regions).splice(screenWidth / Object.keys(Regions).length)
            .length,
      ),
    datasets: [
      {
        // data: Object.values(Regions).splice(
        //   orientation === 'PORTRAIT' ? 20 : 10,
        // ),
        // data: Object.values(Regions).splice(
        //   screenWidth / Object.values(Regions).length -
        //     Object.values(Regions).splice(
        //       screenWidth / Object.values(Regions).length,
        //     ).length,
        // ),
        data:
          //   orientation === 'PORTRAIT'
          //     ? dummyData.splice(screenWidth / 15)
          //     : dummyData.splice(screenHeight / 15),
          Object.values(Regions).splice(
            screenWidth / Object.values(Regions).length -
              Object.values(Regions).splice(
                screenWidth / Object.values(Regions).length,
              ).length,
          ),
      },
    ],
  };
  const [test, setTest] = useState('tomato');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topNavContainer}>
        <View style={styles.topSeparator}>
          <Text style={styles.mainHeading}>This is Victory Native Test</Text>
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
          marginVertical: '5%',
        }}>
        {load ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={{}}>
            {/* <BarChart
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
            /> */}
            <VictoryChart
              //   domainPadding={{x: 40}}
              domainPadding={{x: widthPercentageToDP(12)}}
              animate={{duration: 2000, easing: 'bounce'}}
              width={widthPercentageToDP(100)}
              theme={VictoryTheme.material}>
              <VictoryBar
                dataComponent={
                  <Bar events={{onPress: () => console.log('TestSasdasds')}} />
                }
                barWidth={15}
                labelComponent={<VictoryTooltip />}
                style={{
                  data: {
                    fill: 'blue',

                    opacity: ({datum}) => datum.opacity,
                  },
                }}
                data={datadum}
                x="quarter"
                y="earnings"
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onPress: (evt: any) => {
                        console.log('makes sense');
                        return <VictoryTooltip />;

                        // setTest('blue');
                      },
                    },
                  },
                ]}
              />
            </VictoryChart>
            <View
              style={{
                width: '100%',
                height: heightPercentageToDP(40),
              }}>
              <VictoryPie
                labelComponent={<VictoryTooltip />}
                height={300}
                width={widthPercentageToDP('90')}
                colorScale={['red', 'green', 'blue', 'cyan', 'navy']}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onPress: () => {
                        console.log('makes sense PIEE CLICkl');
                        //   setTest('blue');
                      },
                    },
                  },
                ]}
                data={[
                  {x: 'Cats', y: 100, label: '1'},
                  {x: 'Birds', y: 100, label: '2'},

                  {x: 'Dogs', y: 123, label: '3'},
                  {x: 'Dogs', y: 123, label: '4'},

                  {x: 'Dogs', y: 123, label: '5'},
                ]}
              />
            </View>
          </View>
        )}
      </View>
      {/* <View style={{height: orientation === 'LANDSCAPE' ? 0 : 0}}></View> */}
    </ScrollView>
  );
};
