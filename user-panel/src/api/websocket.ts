import {
  taskCreated,
  taskUpdated,
  taskDeleted,
} from "@/store/slices/taskSlice";
import type { RootState, AppDispatch } from "@/store";
import type { Task } from "@/api/tasks/taskController";

interface WSEventMap {
  TASK_CREATED: Task;
  TASK_UPDATED: Task;
  TASK_DELETED: { id: string };
}

type WSMessage = {
  [K in keyof WSEventMap]: {
    type: K;
    payload: WSEventMap[K];
  };
}[keyof WSEventMap];

interface InjectedStore {
  getState: () => RootState;
  dispatch: AppDispatch;
}

let store: InjectedStore;
let socket: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 3000;

export const injectStore = (_store: InjectedStore) => {
  store = _store;
};

const getWSUrl = (token: string) => {
  const baseUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5000";
  return `${baseUrl}?token=${token}`;
};

export const connectWebSocket = (token?: string) => {
  const activeToken = token || store?.getState()?.auth?.token;

  if (!activeToken) {
    console.error("WebSocket connection failed: No token provided");
    return;
  }

  if (socket?.readyState === WebSocket.OPEN) return;

  const url = getWSUrl(activeToken);
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket connected");
    reconnectAttempts = 0;
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) satisfies WSMessage;
      const { type, payload } = data;

      // Handle specific events with Redux dispatch
      switch (type) {
        case "TASK_CREATED":
          store.dispatch(taskCreated(payload));
          break;
        case "TASK_UPDATED":
          store.dispatch(taskUpdated(payload));
          break;
        case "TASK_DELETED":
          store.dispatch(taskDeleted(payload));
          break;
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  socket.onclose = (event) => {
    console.log("WebSocket disconnected", event.reason);

    if (event.code === 1008) {
      // Token required or invalid
      console.error("WebSocket auth error, logging out...");
      return;
    }

    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        reconnectAttempts++;
        console.log(
          `Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`,
        );
        connectWebSocket();
      }, RECONNECT_INTERVAL);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
