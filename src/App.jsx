import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Login from "./components/Login";
import MapPage from "./components/MapPage";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyDwMR-V1LfK2tKNlX6XjpB7GhcEm6-4hBk",
  authDomain: "the-product-labs.firebaseapp.com",
  projectId: "the-product-labs",
  storageBucket: "the-product-labs.firebasestorage.app",
  messagingSenderId: "229045852141",
  appId: "1:229045852141:web:af4f433b9e88badb7a39e4",
  measurementId: "G-5YLDX6DW05",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/map" />}
      />
      <Route
        path="/map"
        element={user ? <MapPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={user ? "/map" : "/login"} />} />
    </Routes>
  );
}

export default App;
