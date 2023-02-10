import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, padding: '5%', backgroundColor: '#f0f2f7'},

  dataBox: {
    height: 65,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 5,
    padding: '2%',
  },
  barLabel: {
    color: 'black',
    fontWeight: '400',
    fontSize: 6,
  },
  labelMargin: {marginTop: 15, top: 10},
  topNavContainer: {
    height: '25%',
  },
  topSeparator: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  topThree: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '5%',
  },
  subHeading: {fontSize: 12, fontWeight: 'bold', color: 'black'},
  basicText: {fontSize: 12, color: 'black'},
  toolTip: {
    marginBottom: 20,
    marginLeft: -6,
    backgroundColor: '#ffcefe',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
