'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { controllerServerAddress } from '../app/static_variables';

interface WebSocketContextProps {
  socket: WebSocket | null;
  pingFailed: boolean;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pingFailed, setPingFailed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${controllerServerAddress}`);
    console.log('Attempting to connect WebSocket');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(socket);

    const pingInterval = setInterval(() => {
      pingAddress('10.99.2.5').then((isReachable) => {
        console.log(`Ping result for 10.99.2.5: ${isReachable}`);
        if (!isReachable) {
          setPingFailed(true);
          setModalVisible(true);
          socket.send(JSON.stringify({ command: 'cancel' }));
        } else {
          setPingFailed(false);
          setModalVisible(false);
        }
      });
    }, 5000);

    return () => {
      console.log('Cleaning up WebSocket and intervals');
      clearInterval(pingInterval);
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    let timer: any;
    timer = setTimeout(() => {
      console.log('Automatically hiding modal after 5 seconds');
      setModalVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [modalVisible]);

  const pingAddress = async (address: string) => {
    try {
      const response = await fetch(`https://${address}`, {
        method: 'HEAD',
        mode: 'no-cors',
      });
      return response.ok;
    } catch (error) {
      console.error('Ping failed:', error);
      return false;
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, pingFailed }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
