import {useState, useEffect} from 'react';
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
  VictoryAxis,
  Bar,
  VictoryLabel,
} from 'victory-native';
const screenWidth = Dimensions.get('window').width - 100;
const screenHeight = Dimensions.get('window').height - 100;
const StyledView = styled(View);
const StyledText = styled(Text);
export const VictoryTest = () => {
  const [load, setLoad] = useState(true);
  const orientation = useOrientation();
  const [iterator, setIterator] = useState(0);
  const sortData = dataSet.sort(function (a, b) {
    return +b['Internet Users'] - +a['Internet Users'];
  });
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
  const DatamCheck = (evt: any) => {
    console.log('EVTTTTT', evt);
    setIterator(evt._x - 1);
  };
  const [datadum, setDataDum] = useState([]);

  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const sortedRegions = dataSet.sort(function (a, b) {
      if (a.region < b.region) {
        return -1;
      }
      if (a.region > b.region) {
        return 1;
      }
      return 0;
    });
    var dataa: any = [];
    sortedRegions.map((data: any) => {
      var _sum = 0;
      var _region = data['region'];
      var _temp: any = {};
      dataSet.map((item: any) => {
        if (_region === item['region']) {
          _sum = _sum + +item['Internet Users'];
          _temp.x = _region;
          _temp.y = //wrong way
            [..._sum.toString()][0] +
            [..._sum.toString()][1] +
            [..._sum.toString()][2] +
            'M';
          _temp.label = _temp.y; //temporary test
        }
      });
      dataa.push(_temp);
    });
    setDataDum(dataa);
    var pie: any = [];
    for (let i = iterator; i < dataSet.length; i++) {
      console.log('region in first loop', dataSet[i]['region'] + ' index ' + i);
      var _otherSum = 0;
      for (let j = 0; j < dataSet.length; j++) {
        if (dataSet[i]['region'] === dataSet[j]['region']) {
          console.log(
            'matched',
            dataSet[i]['region'] + '===' + dataSet[j]['region'],
          );
          var _temp: any = {};

          if (i < 9) {
            _temp.x = dataSet[i]['Country or Area'];
            _temp.y = +dataSet[i]['Internet Users'];
            _temp.label = dataSet[i]['Country or Area'];
            console.log('pushed I times', i + 1);
            pie.push(_temp);
          } else {
            _otherSum = _otherSum + +dataSet[j]['Internet Users'];
          }

          // pie.push({x: 'Others', y: _otherSum, label: 'Others'});
          // break;
        }
      }
      console.log('OTHERR', _otherSum);
      pie.push({x: 'Others', y: _otherSum, label: 'Others'});
    }
    console.log('pie one', pie);
    setPieData(pie);
    if (datadum.length > 0 && pieData.length > 0) {
      console.log('inside');
      setLoad(false);
    }
  }, [iterator]);
  return (
    <View style={styles.container}>
      {load ? (
        <View
          style={{
            flex: 1,
            padding: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : orientation === 'PORTRAIT' ? (
        <View style={{flex: 1, padding: '5%'}}>
          <View style={styles.topNavContainer}>
            <View style={styles.topSeparator}>
              <Text style={styles.mainHeading}>Internet Users Worldwide</Text>
              <View style={styles.topThree}>
                {sortData.slice(0, 3).map((data: any, index: number) => {
                  return (
                    <View
                      style={{
                        height: 65,
                        width: 130,
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
              flex: 0.4,
            }}>
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              <VictoryChart
                domainPadding={{x: widthPercentageToDP(8)}}
                animate={{duration: 2000, easing: 'bounce'}}
                width={widthPercentageToDP(100)}
                theme={VictoryTheme.material}>
                <VictoryBar
                  barRatio={0.7}
                  labelComponent={<VictoryLabel dy={-20} />}
                  y="y"
                  x="x"
                  data={datadum}
                  events={[
                    {
                      target: 'data',
                      eventHandlers: {
                        onPress: (datum: any, evt: any) => {
                          console.log('EVTTT', evt.datum);
                          DatamCheck(evt.datum);
                          return <VictoryTooltip />;
                        },
                      },
                    },
                  ]}
                />
              </VictoryChart>
            </View>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VictoryPie
              colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
              height={heightPercentageToDP(35)}
              labelComponent={
                <VictoryLabel
                  style={{fontSize: 10}}
                  dy={0}
                  dx={0}
                  angle={-45}
                />
              }
              data={pieData}></VictoryPie>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
            }}>
            <Text style={styles.mainHeading}>Internet Users Worldwide</Text>
          </View>
          <View
            style={{
              flex: 0.9,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.25,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              {sortData.slice(0, 3).map((data: any, index: number) => {
                return (
                  <View
                    style={{
                      height: 65,
                      width: 130,
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      elevation: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
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
            <View style={{flex: 0.45}}>
              <VictoryChart
                domainPadding={{x: widthPercentageToDP(8)}}
                animate={{duration: 2000, easing: 'bounce'}}
                width={widthPercentageToDP(100)}
                theme={VictoryTheme.material}>
                <VictoryBar
                  labelComponent={<VictoryLabel dy={-20} />}
                  y="y"
                  x="x"
                  data={datadum}
                  events={[
                    {
                      target: 'data',
                      eventHandlers: {
                        onPress: (datum: any, evt: any) => {
                          console.log('EVTTT', evt.datum);
                          DatamCheck(evt.datum);
                          return <VictoryTooltip />;
                        },
                      },
                    },
                  ]}
                />
              </VictoryChart>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flex: 0.3,
                alignItems: 'center',
              }}>
              <VictoryPie
                labelComponent={
                  <VictoryLabel
                    style={{fontSize: 8}}
                    dy={0}
                    dx={0}
                    angle={-45}
                  />
                }
                colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
                height={widthPercentageToDP(45)}
                data={pieData}></VictoryPie>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
