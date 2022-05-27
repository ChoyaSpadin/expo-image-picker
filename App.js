import React from 'react';
import { Image,  StyleSheet, Text, View } from 'react-native';
import logo from './assets/profile.png';
import {TouchableOpacity} from "react-native-web";
import * as ImagePicker from 'expo-image-picker';

export default function App() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
    }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={{ width: 164, height: 164, borderRadius: 130 }} />

            <Text style={{color: '#888', fontSize: 18}}>
                IMAGEM JPEG OU PNG 350px x 350px
            </Text>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Escolha uma imagem</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,

    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 164,
        height: 164,
        resizeMode: "contain",
        borderRadius: 130,
    }
});

