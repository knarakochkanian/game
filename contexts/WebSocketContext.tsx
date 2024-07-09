'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { controllerServerAddress } from '../app/static_variables';
import { CapacitorHttp } from '@capacitor/core';

export interface WebSocketContextProps {
  socket: WebSocket | null;
  pingFailed: boolean;
  modalVisible?: boolean;
}

export const WebSocketContext = createContext<WebSocketContextProps | null>(
  null
);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pingFailed, setPingFailed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const protocol = 'ws';
    const socketUrl = `${protocol}://${controllerServerAddress}`;
    const ws = new WebSocket(socketUrl);
    console.log(`Attempting to connect WebSocket to ${socketUrl}`);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setPingFailed(true);
      setModalVisible(true);
    };

    setSocket(ws);

    const pingInterval = setInterval(() => {
      pingAddressWithTimeout('10.99.2.5', 5000).then((isReachable) => {
        console.log(`Ping result for 10.99.2.5: ${isReachable}`);
        if (!isReachable) {
          setPingFailed(true);
          setModalVisible(true);
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send('cancel');
          }
        } else {
          setPingFailed(false);
          setModalVisible(false);
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send('ping');
          }
        }
      });
    }, 5000);

    return () => {
      console.log('Cleaning up WebSocket and intervals');
      clearInterval(pingInterval);
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        console.log('Automatically hiding modal after 5 seconds');
        setModalVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const pingAddress = async (address: string) => {
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

  const pingAddressWithTimeout = (address: string, timeout: number) => {
    return Promise.race([
      pingAddress(address),
      new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(false), timeout)
      ),
    ]);
  };

  return (
    <WebSocketContext.Provider
      value={{ socket: socket!, pingFailed, modalVisible }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
