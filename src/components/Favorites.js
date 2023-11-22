import React, { useState, useContext } from 'react'
import AppContext from 'context/AppContextProvider';
import { FaStar } from "react-icons/fa"
import axios from 'api/axios';

export default function Favorites({ favorites, post }) {
  const [nowFavorites, setFavorites] = useState(favorites);
  const [color, setColor] = useState(nowFavorites ? "blue" : "gray");
  const { auth } = useContext(AppContext);

  const onPress = async () => {
    if (nowFavorites === false) {
      setFavorites(true)
      setColor("blue")
    } else if (nowFavorites === true) {
      setFavorites(false)
      setColor("gray")
    }
    try {
      await axios.get(
        `/work/toggleFavorites/${post.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`
          }
        }
      );
    } catch (err) {
      console.log('Registration Failed', err);
    }
  }

  return (
    <>
      <FaStar color={color} onClick={() => { onPress() }} />
    </>
  )
}
