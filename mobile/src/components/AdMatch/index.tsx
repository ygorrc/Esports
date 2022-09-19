import { useState } from 'react';
import { View, Modal,ModalProps, Text, TouchableOpacity , Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle} from 'phosphor-react-native'
import * as ClipBoard from 'expo-clipboard'
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps{
    discord: string;
    onClose: () => void;
}
export function AdMatch({ discord, onClose, ...rest}: Props) {

    const [isCopping,setIsCopping] = useState(false)
  async function handleCopyDiscordToClipBoard(){
    setIsCopping(true);
    await ClipBoard.setStringAsync(discord)

    Alert.alert('Discord Copiado!','Usuário copiado  para você colar no Discord!');
    setIsCopping(false)
  }
    

  return (
    <Modal
        transparent
        statusBarTranslucent 
        animationType='fade'
        {...rest}>
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeIcon}>
                    
                    <MaterialIcons
                        name="close"
                        size={20}
                        color={THEME.COLORS.CAPTION_500}
                    />
                </TouchableOpacity>
                
                <CheckCircle
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight="bold"
                />
                <Heading
                    title="Let's play!"
                    subTitle="Agora é so começar"
                    style={{ alignItems: 'center', marginTop:24}}
                />
                <Text style={styles.label}>
                    Adicione no Discord
                </Text>
                <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordToClipBoard} disabled={isCopping}>
                    <Text style={styles.discord}>
                        {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
}