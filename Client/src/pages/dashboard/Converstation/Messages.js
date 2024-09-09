import {Box, Stack} from '@mui/material';
import React from 'react';
import {Chat_History} from '../../../data';
import {MediaMsg, TextMsg, Timeline, ReplyMsg, LinkMsg, DocMsg} from './MessageType';

const Chat = ({menu}) => {
  const renderChatItem = (ele) => {
    switch (ele.type) {
      case 'divider':
        return <Timeline key={ele.id} {...ele} />;
      case 'msg':
        switch (ele.subtype) {
          case 'img':
            return <MediaMsg key={ele.id} {...ele} menu={menu} />;
          case 'doc':
            return <DocMsg key={ele.id} {...ele} menu={menu} />;
          case 'link':
            return <LinkMsg key={ele.id} {...ele} menu={menu} />;
          case 'reply':
            return <ReplyMsg key={ele.id} {...ele} menu={menu} />;
          default:
            return <TextMsg key={ele.id} {...ele} menu={menu} />;
          }
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        padding: 1,
      }}
    >
      <Stack spacing={3}>
        {Chat_History.map((ele,index) => (
          <div key={index}>
            {renderChatItem(ele)}
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default Chat;
