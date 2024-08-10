import { useState } from 'react';
import { Text, TextInput, View } from "react-native";
// Use pre-typed versions of the React-Redux
// `useDispatch` and `useSelector` hooks
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IconButton } from '../components/IconButton';
import TextButton from '../components/TextButton';
import { RootStackParamList } from '../Router';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
  selectStatus
} from '../slicers/counter/counterSlice';


/* Example of custom hook. To be honest you can define a custom hook with logic. */
const useIncrementByAmount = (init: string) => {
  const [incrementAmountByHook, setIncrementAmountByHook] = useState(init)
  return { incrementAmountByHook, setIncrementAmountByHook }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Counter', 'counter'>

const Counter: React.FC<Props> = ({ navigation, route }) => {
  const param = route.params.initCount

  /* Defining a dispatcher */
  const dispatch = useAppDispatch()

  /* Defining selectors */
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  // You can define like the below.
  // const count = useAppSelector((state: RootState) => state.counter.value)

  const [incrementAmount, setIncrementAmount] = useState('2')

  const { incrementAmountByHook, setIncrementAmountByHook } = useIncrementByAmount('5')
  const incrementValue = Number(incrementAmount) || 0

  return (
    <View className='flex-1 justify-center items-center'>
      <View className='p-5'>
        <Text>Count is {count}</Text>
        <Text>Status is {status}</Text>
      </View>

      <View className='flex-row'>
        <IconButton
          onPress={() => {
            dispatch(decrement())
          }}
          size={24}
          iconName='text-decrease'
          color='black'>
        </IconButton>
        <View className='flex-none w-10'></View>
        <IconButton
          onPress={() => {
            dispatch(increment())
          }}
          size={24}
          iconName='text-increase'
          color='black'>
        </IconButton>
      </View>

      <View className='flex-row'>
        <TextButton
          onPress={() => {
            dispatch(incrementByAmount(incrementValue))
            console.log('TextButton tapped!')
          }}
          title='TextButton'
          textStyle='font-thin text-white'
          buttonStyle='bg-green-500 p-2 m-3 rounded-md'
        />
        <TextInput
          className='h-8 m-4 border border-gray-300 p-2'
          placeholder='Num'
          keyboardType='numeric'
          onChangeText={e => setIncrementAmount(e)}
          value={incrementAmount}
        />
      </View>

      <View className='flex-row'>
        <TextButton
          title='Increment (Async)'
          textStyle='font-bold text-white'
          buttonStyle='bg-red-500 p-2 m-4 rounded-md'
          onPress={() => {
            dispatch(incrementAsync(1))
          }}
        />
        <TextButton
          title='Increment (If odd)'
          textStyle='font-bold text-white'
          buttonStyle='bg-red-500 p-2 m-4 rounded-md'
          onPress={() => {
            dispatch(incrementIfOdd(1))
          }}
        />
      </View>

    </View>
  )
}

export default Counter