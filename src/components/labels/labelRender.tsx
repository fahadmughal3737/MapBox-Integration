import {View, Text} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {styles} from './styles';
const LabelRender = (props: any) => {
  let _renderArr: string[] = [...props._country];
  console.log('llaa', _renderArr);

  return (
    <View
      style={{
        width: widthPercentageToDP('1.9'),
        alignItems: 'flex-end',
      }}>
      <View style={styles.labelMargin}>
        {_renderArr.map((data: string) => (
          <Text
            key={props._country}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.barLabel}>
            {data}
          </Text>
        ))}
      </View>
    </View>
  );
};
export default LabelRender;
