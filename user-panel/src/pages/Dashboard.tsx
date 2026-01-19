import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { Button } from "../components/Button/Button";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Hoş geldin, {user?.name || "Kullanıcı"}!</p>
      <div style={{ marginTop: "2rem" }}>
        <Button onClick={() => dispatch(logout())}>Çıkış Yap</Button>
      </div>
    </div>
  );
};

export default Dashboard;
