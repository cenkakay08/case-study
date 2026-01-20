import * as Toast from "@/components/Toast/Toast";
import { Outlet } from "react-router";
import { ToastList } from "@/components/ToastList.tsx/ToastList";

export default function ProviderLayout() {
  return (
    <Toast.Provider toastManager={Toast.toastManager}>
      <Outlet />
      <Toast.Portal>
        <Toast.Viewport>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
