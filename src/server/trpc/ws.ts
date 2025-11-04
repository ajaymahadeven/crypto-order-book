// src/server/trpc/ws.ts
import { WebSocket } from 'ws';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

// @deprecated - using websocket-manager.ts instead
/**
 * This module provides a function to connect to a WebSocket and retrieve real-time order book data.
 */
export function connectToWebSocket(): Promise<OrderBookData> {
    /**
     * Returns a Promise that resolves with the latest order book data received from the WebSocket.
     */
    return new Promise((resolve, reject) => {
        /**
         * Creates a new WebSocket connection using the URL specified in the environment variable `WS_URL`.
         */
        const ws = new WebSocket(process.env.WS_URL as string);

        /**
         * Handles the 'open' event, which is emitted when the WebSocket connection is established.
         * Logs a message to the console indicating that the connection has been established.
         */
        ws.on('open', () => {
            console.log('WebSocket connection established');
        });

        /**
         * Handles the 'message' event, which is emitted when data is received from the WebSocket.
         * Parses the received data as JSON and resolves the Promise with the order book data.
         */
        ws.on('message', (data: OrderBookData) => {
            const orderBookData: OrderBookData = JSON.parse(data.toString());
            resolve(orderBookData);
        });

        /**
         * Handles the 'error' event, which is emitted when an error occurs with the WebSocket connection.
         * Rejects the Promise with the error message.
         */
        ws.on('error', (error: string) => {
            reject(error);
        });

        /**
         * Handles the 'close' event, which is emitted when the WebSocket connection is closed.
         * Logs a message to the console indicating that the connection has been closed.
         */
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
}
