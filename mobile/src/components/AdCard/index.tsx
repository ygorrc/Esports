import React from 'react';
import { TouchableOpacity, View,Text } from 'react-native';
import { THEME } from '../../theme';
import { AdInfo } from '../AdInfo';
import {GameController} from 'phosphor-react-native'
import { styles } from './styles';
export interface AdCardProps{
    hourEnd: string
    hourStart: string
    id: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number

}
interface Props{
    data: AdCardProps;
    onConnect: () =>void;
}
export function AdCard({data, onConnect}:Props) {
  return (
    <View style={styles.container}>
        <AdInfo
            label='Nome'
            value={data.name}
        />
        <AdInfo
            label='Tempo de jogo'
            value= {`${data.yearsPlaying} anos`}
        />
        <AdInfo
            label='Disponibilidade'
            value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
        />
        <AdInfo
            label='Chamada de áudio?'
            value={data.useVoiceChannel ? "Sim" : "Não" }
            colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />

        <TouchableOpacity
            onPress={onConnect} 
            style={styles.button}>
            <GameController
                color={THEME.COLORS.TEXT}
                size={20} 
            />
            <Text style={styles.buttonTitle}>
                Conectar
            </Text>
        </TouchableOpacity>
    </View>
  );
}