'use client';
import React from "react";
import { useNavigation } from "@/context/NavigationContext";
// import { UploadFormPage } from "./UploadForm/page";
import TransfersPage from "./Transfers/page";
import LoginPage from "../login/page";
import UploadFormPage from "./UploadForm/page";


const ChildPages = () => {
const { activePage } = useNavigation();

  const renderContent = () => {
    switch (activePage) {
      case 'upload-form':
        return <UploadFormPage />;
      case 'transfers':
        return <TransfersPage />;
      // case 'history':
      //   return <HistoryPage />; // Assuming HistoryPage is defined elsewhere
      // case 'pricing':
      //   return <PlansPage />;
      // case 'reviews':
      //   return <ReviewsPage />;
      // case 'branding':
      //   return <BrandingPage />;
      // case 'account':
      //   return <AccountPage />;
      // case 'integrations':
      //   return <IntegrationsPage />;
      case 'login':
        return <LoginPage />;
      default:
        return <UploadFormPage />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-5vh)]" >
      { /* this is the rendered content based on the active page */ }

      {renderContent()}
      
    </div>
  );
}

export default ChildPages;