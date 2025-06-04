'use client';

import React from "react";
import { useNavigation } from "@/context/NavigationContext";
import TransfersPage from "./Transfers/page";
import UploadFormPage from "./UploadForm/page";
import PricingPage from "./Pricing/page";
import AccountPage from "../account/page";

export default function ChildPagesContent() {
  const { activePage } = useNavigation();

  const renderContent = () => {
    switch (activePage) {
      case 'upload-form':
        return <UploadFormPage />;
      case 'transfers':
        return <TransfersPage />;
      case 'pricing':
        return <PricingPage />;
      case 'account':
        // Placeholder for account page, if needed
      return <AccountPage />;
      
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
