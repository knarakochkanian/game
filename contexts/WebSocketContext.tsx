'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { controllerServerAddress, pingServerAddress } from '../app/static_variables';
import { CapacitorHttp } from '@capacitor/core';
import useWebSocket, { ReadyState, SendMessage } from 'react-use-websocket';
import { resolve } from 'path';

export interface WebSocketContextProps {
  lastMessage: WebSocketEventMap['message'] | null;
  pingFailed: boolean;
  modalVisible?: boolean;
  send: SendMessage;
}

export const WebSocketContext = createContext<WebSocketContextProps | null>(
  null
);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const {sendMessage, readyState, lastMessage, getWebSocket} = useWebSocket(
    `ws://${controllerServerAddress}`,{
      shouldReconnect: () => true,
      reconnectAttempts: Number.MAX_SAFE_INTEGER, // always reconnect
      reconnectInterval: 2000
    }
  )

  const [volnaReachable, setVolnaReachable] = useState(false)
  const [deviceReachable, setDeviceReachable] = useState(false)
  const [lastPingTimestamp, setLastPingTimestamp] = useState(0);

  const [pingFailed, setPingFailed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHidden, setModalHidden] = useState(false);

  // Check device websocket connection
  useEffect(() => {
    const isOpened = readyState === ReadyState.OPEN
    setDeviceReachable(isOpened)
  },[readyState, setDeviceReachable])

  // Check Volna network
  useEffect(() => {
    const pingInterval = setInterval(() => {
      pingAddressWithTimeout(pingServerAddress, 5000).then((isReachable) => {
        console.log(`Ping result for ${pingServerAddress}: ${isReachable}`);
        setVolnaReachable(isReachable)
        setLastPingTimestamp(new Date().getTime())
      });
    }, 5000);

    return () => {
      clearInterval(pingInterval);
    };
  }, [setVolnaReachable, setLastPingTimestamp]);

  // Actual ping & modal setup
  useEffect(() => {
    const isReachable = volnaReachable && deviceReachable

    if(!isReachable && !modalHidden && !modalVisible) {
      setModalVisible(true)
    }

    if(isReachable) {
      setModalVisible(false)
      setModalHidden(false)
    }
    setPingFailed(!isReachable)
    
  },[volnaReachable, deviceReachable, setPingFailed, modalVisible, setModalVisible, modalHidden, setModalHidden])

  // Send ping when both volna & device connected
  useEffect(() => {
      if(volnaReachable && deviceReachable) {
        sendMessage('ping')
      }
      else if(!volnaReachable && deviceReachable) {
        sendMessage('cancel')
      }
  }, [volnaReachable, deviceReachable, sendMessage, lastPingTimestamp])


  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        console.log('Automatically hiding modal after 5 seconds');
        setModalHidden(true)
        setModalVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible, setModalHidden]);

  const pingAddress = async (address: string | null) => {
    if(address === null) {
      return true
    }
    
    try {
      const options = {
        url: `http://${address}`,
        method: 'HEAD',
      };
      const response = await CapacitorHttp.get(options);
      return true;
    } catch (error) {
      console.error('Ping failed:', error);
      return false;
    }
  };

  const pingAddressWithTimeout = (address: string | null, timeout: number) => {
    return Promise.race([
      pingAddress(address),
      new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(false), timeout)
      ),
    ]);
  };

  return (
    <WebSocketContext.Provider
      value={{ 
        lastMessage: lastMessage, 
        pingFailed: pingFailed,
        modalVisible, 
        send: sendMessage
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useDeviceConnection = () => {
  return useContext(WebSocketContext);
};
