'use client';

import React from "react";
import { useNavigation } from "@/context/NavigationContext";
import TransfersPage from "./Transfers/page";
import LoginPage from "../login/page";
import UploadFormPage from "./UploadForm/page";

export default function ChildPagesContent() {
  const { activePage } = useNavigation();

  const renderContent = () => {
    switch (activePage) {
      case 'upload-form':
        return <UploadFormPage />;
      case 'transfers':
        return <TransfersPage />;
      case 'login':
        return <LoginPage />;
      default:
        return <UploadFormPage />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-5vh)]">
      {/* this is the rendered content based on the active page */}
      {renderContent()}
    </div>
  );
}
