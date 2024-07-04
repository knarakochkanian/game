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
import { StatusBar } from '@capacitor/status-bar';

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
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const maxReconnectAttempts = 5;

  useEffect(() => {
    const connectWebSocket = () => {
      const protocol = 'ws';
      const socketUrl = `${protocol}://${controllerServerAddress}`;
      const ws = new WebSocket(socketUrl);
      console.log(`Attempting to connect WebSocket to ${socketUrl}`);

      ws.onopen = () => {
        console.log('WebSocket connection established');
        setReconnectAttempts(0); // Reset the reconnection attempts on successful connection
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        attemptReconnection();
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setPingFailed(true);
        setModalVisible(true);
        attemptReconnection();
      };

      setSocket(ws);
    };

    const attemptReconnection = () => {
      if (reconnectAttempts < maxReconnectAttempts) {
        setTimeout(() => {
          console.log('Attempting to reconnect...');
          setReconnectAttempts((prev) => prev + 1);
          connectWebSocket();
        }, 2000); // Delay before attempting to reconnect
      } else {
        console.error('Max reconnection attempts reached.');
      }
    };

    connectWebSocket();

    const pingInterval = setInterval(() => {
      pingAddressWithTimeout('10.99.2.5', 5000).then((isReachable) => {
        console.log(`Ping result for 10.99.2.5: ${isReachable}`);
        if (!isReachable) {
          setPingFailed(true);
          setModalVisible(true);
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send('cancel');
          }
        } else {
          setPingFailed(false);
          setModalVisible(false);
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send('ping');
          }
        }
      });
    }, 5000);

    const subscription = setInterval(async () => {
      console.log('Status bar hide!');

      const info = await StatusBar.getInfo();
      if (info.visible) {
        await StatusBar.hide();
      }
    }, 1000);

    return () => {
      console.log('Cleaning up WebSocket and intervals');
      clearInterval(pingInterval);
      clearInterval(subscription);
      socket?.close();
    };
  }, [reconnectAttempts]);

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
    return true;
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
    <WebSocketContext.Provider value={{ socket, pingFailed, modalVisible }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
