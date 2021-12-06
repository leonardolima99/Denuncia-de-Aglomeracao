import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Svg, Circle, G} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  progress: number;
  circleProgressColor: string;
  circleBackgroundColor: string;
  TextColor: string;
}

const CircleProgress: React.FC<Props> = ({
  progress,
  circleBackgroundColor,
  circleProgressColor,
  TextColor,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <Svg style={styles.svg}>
          <G transform={{originX: 110, originY: 115, rotation: -90}}>
            <Circle
              cx="110"
              cy="110"
              r="100"
              translateX="5"
              translateY="5"
              stroke={circleBackgroundColor}
              strokeWidth="10"
              strokeDasharray="628"
            />
            <Circle
              cx="110"
              cy="110"
              r="100"
              translateX="5"
              translateY="5"
              stroke={circleProgressColor}
              strokeWidth="10"
              strokeDasharray="628"
              strokeDashoffset={628 - (628 * progress) / 100}
              strokeLinecap={progress !== 0 ? 'round' : 'butt'}
            />
          </G>
        </Svg>
        {progress < 100 ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={{fontSize: 32, color: TextColor}}>{progress}%</Text>
        ) : (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={{fontSize: 32, color: TextColor}}>
            <Icon name="check" color={circleProgressColor} size={88} />
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0F0F5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    position: 'absolute',
  },
});

export default CircleProgress;
