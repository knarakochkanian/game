'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { CapacitorHttp } from '@capacitor/core';
import useWebSocket, { ReadyState, SendMessage } from 'react-use-websocket';
import { WebSocketMessage } from 'react-use-websocket/dist/lib/types';

import { registerPlugin } from '@capacitor/core';

const ChemodanSettings = registerPlugin('ChemodanSettings') as any;

export enum DeviceEventId {
  AcceptPressed = 'accept pressed',
  StartPressed = 'start pressed',
  CancelPressed = 'cancel pressed',
  ReadyPressed = 'ready pressed'
}

const DeviceEventIds = Object.values(DeviceEventId)

export interface DeviceEvent {
  eventId: DeviceEventId,
  consumed?: boolean
}

export interface WebSocketContextProps {
  lastMessage: WebSocketEventMap['message'] | null;
  pingFailed: boolean;
  modalVisible?: boolean;
  send: SendMessage;
  lastDeviceEvent: DeviceEvent | undefined
}

const InitialState = {
  lastMessage: null,
  pingFailed: true,
  send: (message: WebSocketMessage, keep?: boolean) => { },
  lastDeviceEvent: undefined
}
export const WebSocketContext = createContext<WebSocketContextProps>(InitialState);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const getChemodanUrl = useCallback(() => {
    return ChemodanSettings.getSettings().then((settings: any) => {
      console.log("ChemodanSettings.chemodan", settings.chemodan_ip)
      console.log("ChemodanSettings.volna", settings.volna_ip)
      return `ws://${settings.chemodan_ip}:8766`
    })
  }, []);

  const {sendMessage, readyState, lastMessage, getWebSocket} = useWebSocket(
    getChemodanUrl,{
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

  const [lastDeviceEvent, setLastDeviceEvent] = useState<DeviceEvent>()

  // Handle messages as device events to prevent double consuming
  useEffect(() => {
    if (DeviceEventIds.includes(lastMessage?.data)) {
      setLastDeviceEvent({
        eventId: lastMessage?.data,
        consumed: false
      })
    }
  }, [lastMessage, setLastDeviceEvent])

  // Check device websocket connection
  useEffect(() => {
    const isOpened = readyState === ReadyState.OPEN
    setDeviceReachable(isOpened)
  },[readyState, setDeviceReachable])

  // Check Volna network
  useEffect(() => {
    const pingInterval = setInterval(() => {
      pingAddressWithTimeout(5000).then((isReachable) => {
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

    if (!isReachable && !modalHidden && !modalVisible) {
      setModalVisible(true)
    }

    if (isReachable) {
      setModalVisible(false)
      setModalHidden(false)
    }
    setPingFailed(!isReachable)

  }, [volnaReachable, deviceReachable, setPingFailed, modalVisible, setModalVisible, modalHidden, setModalHidden])

  // Send ping when both volna & device connected
  useEffect(() => {
    if (volnaReachable && deviceReachable) {
      sendMessage && sendMessage('ping')
    }
    else if (!volnaReachable && deviceReachable) {
      sendMessage && sendMessage('cancel')
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

  const pingAddress = async () => {
    const settings = await ChemodanSettings.getSettings()

    if (!settings || !settings.volna_ip) {
      return true
    }

    try {
      const options = {
        url: `http://${settings.volna_ip}`,
        method: 'HEAD',
      };
      const response = await CapacitorHttp.get(options);
      return true;
    } catch (error) {
      console.error('Ping failed:', error);
      return false;
    }
  };

  const pingAddressWithTimeout = (timeout: number) => {
    return Promise.race([
      pingAddress(),
      new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(false), timeout)
      ),
    ]);
  };

  return (
    <WebSocketContext.Provider
      value={{
        lastMessage: lastMessage || InitialState.lastMessage,
        pingFailed: pingFailed,
        modalVisible,
        send: sendMessage || InitialState.send,
        lastDeviceEvent: lastDeviceEvent
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useDeviceConnection = () => {
  return useContext(WebSocketContext);
};
