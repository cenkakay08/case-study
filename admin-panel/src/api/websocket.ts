import {
  taskCreated,
  taskUpdated,
  taskDeleted,
} from "@/store/slices/taskSlice";
import {
  userCreated,
  userUpdated,
  userDeleted,
} from "@/store/slices/userSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { Task } from "@/api/tasks/taskController";
import type { AdminUser } from "@/api/login/loginController";

interface WSEventMap {
  TASK_CREATED: Task;
  TASK_UPDATED: Task;
  TASK_DELETED: { id: string };
  USER_CREATED: AdminUser;
  USER_UPDATED: AdminUser;
  USER_DELETED: { id: string };
}

type WSMessage = {
  [K in keyof WSEventMap]: {
    type: K;
    payload: WSEventMap[K];
    clientId?: string;
  };
}[keyof WSEventMap];

interface InjectedStore {
  getState: () => RootState;
  dispatch: AppDispatch;
}

let store: InjectedStore;
let socket: WebSocket | null = null;
let clientId: string | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 3000;

export const injectWebSocketStore = (
  _store: InjectedStore,
  _clientId: string,
) => {
  store = _store;
  clientId = _clientId;
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
    reconnectAttempts = 0;
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as WSMessage;
      const { type, payload, clientId: eventClientId } = data;

      // Ignore self-triggered events
      if (eventClientId === clientId) {
        console.log(`[WS] Ignoring self-triggered event: ${type}`);
        return;
      }

      switch (type) {
        case "TASK_CREATED":
          store.dispatch(taskCreated(payload as Task));
          break;
        case "TASK_UPDATED":
          store.dispatch(taskUpdated(payload as Task));
          break;
        case "TASK_DELETED":
          store.dispatch(taskDeleted(payload as { id: string }));
          break;
        case "USER_CREATED":
          store.dispatch(userCreated(payload as AdminUser));
          break;
        case "USER_UPDATED":
          store.dispatch(userUpdated(payload as AdminUser));
          break;
        case "USER_DELETED":
          store.dispatch(userDeleted(payload as { id: string }));
          break;
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  socket.onclose = (event) => {
    if (event.code === 1008) {
      console.error("WebSocket auth error");
      return;
    }

    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        reconnectAttempts++;
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
