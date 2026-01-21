import { Toast, ToastList } from "@case-study/ui";
import { Outlet } from "react-router";

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
