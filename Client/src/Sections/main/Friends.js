import {Dialog, Tabs, Tab, Stack, DialogContent} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchFriend,
  fetchFriendRequest,
  fetchUsers,
} from '../../redux/slices/app';

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const {users} = useSelector((state) => state.app);
  return <></>;
};

const FriendRequestList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFriendRequest());
  }, []);

  const {friends} = useSelector((state) => state.app);
  return <></>;
};

const FriendList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFriend());
  }, []);

  const {friendRequest} = useSelector((state) => state.app);
  return <></>;
};

const Friends = ({open}) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleChange}
    >
      <Stack p={2} sx={{width: '100%'}}>
        <Tabs value={value} centered>
          <Tab label="Explore"></Tab>
          <Tab label="Friends"></Tab>
          <Tab label="Requests"></Tab>
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{height: '100%'}}>
          <Stack spacing={2.5}>
            {() => {
              switch (value) {
                case 0:
                  return UserList();
                case 1:
                  return FriendList();
                case 2:
                  return FriendRequestList();
                default:
                  break;
              }
            }}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
