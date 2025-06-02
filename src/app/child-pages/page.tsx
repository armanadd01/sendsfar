
import { Button } from "@/components/ui/button";
import React from "react";
// import { useNavigation } from "@/context/NavigationContext";

const ChildPages = () => {
// const { activePage } = useNavigation();

  // const renderContent = () => {
  //   switch (activePage) {
  //     case 'upload-form':
  //       return <TransferUploadForm />;
  //     case 'transfers':
  //       return <TransfersPage />;
  //     case 'history':
  //       return <HistoryPage />; // Assuming HistoryPage is defined elsewhere
  //     case 'pricing':
  //       return <PlansPage />;
  //     case 'reviews':
  //       return <ReviewsPage />;
  //     case 'branding':
  //       return <BrandingPage />;
  //     case 'account':
  //       return <AccountPage />;
  //     case 'integrations':
  //       return <IntegrationsPage />;
  //     default:
  //       return <TransferUploadForm />;
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Child Pages
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        This is a placeholder for child pages.
      </p>
      {/* {renderContent()} */}
      {/* Uncomment the above line when you have the content components ready */} 
      <Button> Button</Button>
    </div>
  );
}

export default ChildPages;