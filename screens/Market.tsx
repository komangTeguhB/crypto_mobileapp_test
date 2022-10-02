/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import MainLayout from './Mainlayout';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import TextButton from '../components/TextButton';
import api from '../api/api';
import {LineChart} from 'react-native-chart-kit';

const Market = () => {
  const [coins, setCoins] = useState<any>([]);
  const [errorFetch, setErrorFetch] = useState('');

  const topLabels = ['New', 'Defi', 'NFT/gaming', 'CEX'];

  const fetchCoinMarket = useCallback(async () => {
    await api
      .getCoinMarket()
      .then(response => {
        setCoins(response);
      })
      .catch(error => {
        setErrorFetch(error.message);
      });
  }, []);

  useEffect(() => {
    fetchCoinMarket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}>
        {topLabels.map((label: string, index: number) => {
          return (
            <TextButton
              label={label}
              key={index}
              containerStyle={{
                marginLeft: index > 0 ? 15 : 0,
              }}
            />
          );
        })}
      </View>
    );
  }

  const renderCoin = ({item}: any) => {
    let priceColor =
      item.price_change_percentage_7d_in_currency === 0
        ? COLORS.lightGray3
        : item.price_change_percentage_7d_in_currency > 0
        ? COLORS.lightGreen
        : COLORS.red;
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          marginBottom: SIZES.radius,
          borderBottomColor: COLORS.lightGray4,
          borderBottomWidth: 1,
        }}>
        {/* Coins */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.radius,
              color: COLORS.black,
              ...FONTS.h3,
            }}>
            {item.name}
          </Text>
        </View>

        {/* Line Charts */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <LineChart
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withDots={false}
            withInnerLines={false}
            withVerticalLines={false}
            withOuterLines={false}
            data={{
              labels: [],
              datasets: [{data: item.sparkline_in_7d.price}],
            }}
            width={90}
            height={60}
            chartConfig={{
              color: () => priceColor,
              strokeWidth: 0.6,
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
            }}
            bezier
            style={{
              paddingRight: 0,
            }}
          />
        </View>

        {/* Figures */}
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h4,
            }}>
            {Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(item.current_price)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {item.price_change_percentage_7d_in_currency !== 0 && (
              <Image
                source={icons.upArrow}
                style={{
                  width: 10,
                  height: 10,
                  tintColor: priceColor,
                  transform:
                    item.price_change_percentage_7d_in_currency > 0
                      ? [{rotate: '45deg'}]
                      : [{rotate: '125deg'}],
                }}
              />
            )}

            <Text
              style={{
                marginLeft: 5,
                color: priceColor,
                ...FONTS.body5,
              }}>
              {item.price_change_percentage_7d_in_currency.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  function renderCoins() {
    return (
      <View
        style={{
          flex: 1,
          width: SIZES.width,
        }}>
        <FlatList
          data={coins}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderCoin}
        />
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        {errorFetch !== '' ? (
          <Text
            style={{
              color: COLORS.red,
            }}>
            {errorFetch}
          </Text>
        ) : (
          <>
            {renderButtons()}

            {renderCoins()}
          </>
        )}
      </View>
    </MainLayout>
  );
};

export default Market;
