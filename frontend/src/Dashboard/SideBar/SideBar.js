import React from 'react';
import { styled } from '@mui/system';
import MainPageButton from './MainPageButton';
import CreateRoomButton from './CreateRoomButton';
import { connect } from 'react-redux';
import ActiveRoomButton from './ActiveRoomButton';
import BotButton from './BotButton';
import Game1Button from './Game1Button';
import Game2Button from './Game2Button';

const MainContainer = styled('div')({
  width: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <MainContainer>
      <MainPageButton />
      <BotButton />
      <Game1Button />
      <Game2Button />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
