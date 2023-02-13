import React, { useEffect, useState } from 'react'
import { View,Text } from 'react-native'
import { dataSet } from '../../services/dataset/dataset'
import lookup from 'country-code-lookup';
export const TempDataSet = () => {
    const newData = []
    const region: any = []
    var _temp :any = dataSet
    // region.push( lookup.byCountry('Pakistan'))
    dataSet.map((data: any, index: number) => {
        if (lookup.byCountry(data['Country or Area']) === null || lookup.byCountry(data['Country or Area']) === undefined) {

        }
        else {
            region.push(lookup.byCountry(data['Country or Area']))
        }
        // region.push(lookup.byCountry(data['Country or Area']))
    })

    for (let i = 0; i < region.length; i++) {
        if (region[i].country === dataSet[i]['Country or Area']) {
            console.log('found ', region[i].country)
            _temp[i].region = region[i].region
            newData.push(
                _temp[i]
            )
        }
    }
    console.log('newDATAAA', newData)
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:'black'}}>{Object.keys(newData)}</Text>
        </View>
    )
}