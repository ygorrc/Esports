import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';
import { useRoute ,useNavigation} from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'
import  logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { AdCard, AdCardProps } from '../../components/AdCard';
import { useEffect, useState } from 'react';
import { AdMatch} from '../../components/AdMatch';

export function Game() {
    
  const route = useRoute();
  const game = route.params as GameParams;
  const [ad,setAd] = useState<AdCardProps[]>([])
  const navigation = useNavigation();
  const [discordAdSelected, setDicordAdSelected] = useState<string>('')
  function handleBack(){
    navigation.goBack();
  }
  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.1.12:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => {setDicordAdSelected(data.discord)})
  }
  useEffect(() =>{
    fetch(`http://192.168.1.12:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setAd(data))
  },[])
  return (
    <Background>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}> 
                    <Entypo
                        name="chevron-thin-left"
                        color={THEME.COLORS.CAPTION_300}
                        size={20}
                    />
                </TouchableOpacity>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />  
                <View style={styles.right}/>
            </View>

            <Image
                source={{uri: game.bannerUrl}}
                style={styles.cover}
                resizeMode="cover"
            />
            <Heading
                title={game.title}
                subTitle="Conecte-se e comece a jogar!"
            />

            <FlatList
                data={ad}
                keyExtractor={item => item.id}
                renderItem={({item}) =>(
                    <AdCard 
                        data={item}
                        onConnect={() => getDiscordUser(item.id)}
                        />
                )}
                horizontal
                style={styles.containerList}
                contentContainerStyle={[ad.length > 0 ? styles.contentList : styles.emptyListContent]}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style = {styles.emptyListText}>
                        Não há anúncios publicados ainda.
                    </Text>
                )
                }
            />
            <AdMatch
                visible={discordAdSelected.length > 0}
                onClose={() => setDicordAdSelected('')}
                discord={discordAdSelected}
            />
        </SafeAreaView>
    </Background>
  );
}