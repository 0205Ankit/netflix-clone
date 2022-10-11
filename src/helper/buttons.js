import { useState,useEffect } from "react";
import useAutoId from "../hooks/autoIdHook";
import { activeProfile,addToList,removeFromList } from "../services/firebase";
import CheckIcon from "../assets/check";
import AddIcon from "../assets/add";
import { HoverButtons } from "../styles/globalStyles";
import _ from 'lodash'
import React from 'react'

const Buttons = ({ item,type }) => {
  const [showAddIcon, setShowAddIcon] = useState(false);
  const userId = useAutoId();

  useEffect(() => {
    const profId = JSON.parse(localStorage.getItem('user-profile')).profileId;
    const currentProfile = async () => {
      const currProfile = await activeProfile(userId, profId);
      setShowAddIcon(_.some(currProfile.myList, item));
    };
    if (userId) {
      currentProfile();
    }
  }, [userId, item]);

  const addToListHandler = async (content) => {
    const profId = JSON.parse(localStorage.getItem('user-profile')).profileId;
    try {
      setShowAddIcon((prev) => {
        return !prev;
      });
      await addToList(userId, profId, {...content,type});
    } catch {
      setShowAddIcon((prev) => {
        return !prev;
      });
    }
  };

  const removeFromListHandler = async (content) => {
    const profId = JSON.parse(localStorage.getItem('user-profile')).profileId;
    try {
      setShowAddIcon((prev) => {
        return !prev;
      });
      await removeFromList(userId, profId, {...content,type});
    } catch {
      setShowAddIcon((prev) => {
        return !prev;
      });
    }
  };

  return (
    <>
      {showAddIcon ? (
        <HoverButtons
          onClick={() => {
            removeFromListHandler(item);
          }}
        >
          <CheckIcon fill={'white'} />
        </HoverButtons>
      ) : (
        <HoverButtons
          onClick={() => {
            addToListHandler(item);
          }}
        >
          <AddIcon fill={'white'} />
        </HoverButtons>
      )}
    </>
  );
};

export default React.memo(Buttons)