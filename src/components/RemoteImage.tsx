import { Image } from 'react-native'
import React, { ComponentProps, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import { ActivityIndicator } from 'react-native-paper';
import CustomActivityIndicator from './CustomActivityIndicator';

type RemoteImageProps = {
    path?: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const placeholderImage = require('../../assets/images/placeholder-image.png');

const RemoteImage = ({path, ...imageProps} : RemoteImageProps) => {
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from('item-images')
        .download(path);

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
      setIsLoading(false)   
    })(); 
  }, [path]);

  if(isLoading) {
    return <CustomActivityIndicator {...imageProps}/>
  }

  return (
    <Image source={image ? { uri: image } : placeholderImage} alt='Couldn`t load image!' {...imageProps} />
  )
}

export default RemoteImage