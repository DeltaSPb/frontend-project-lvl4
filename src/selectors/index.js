import { createSelector } from '@reduxjs/toolkit';

export const getMessages = (state) => state.messagesInfo.messages;
export const getChannels = (state) => state.channelsInfo.channels;
export const getCurrentChannalId = (state) => state.channelsInfo.currentChannalId;

export const messagesSelector = createSelector(
  [getMessages, getCurrentChannalId],
  (messages, currentChannelId) => (
    messages.filter(({ channelId }) => channelId === currentChannelId)
  ),
);

export const currentChannelSelector = createSelector(
  [getChannels, getCurrentChannalId],
  (channels, currentChannelId) => (
    channels.find(({ id }) => id === currentChannelId)
  ),
);
