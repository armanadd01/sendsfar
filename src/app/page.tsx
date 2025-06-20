
import FileUpload from "@/components/FileUpload";
import { Header } from "@/components/Header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ChildPages from "./child-pages/page";
// import { NavigationProvider } from "@/context/NavigationContext";


export default function Home() {
  return (
    <>

      <main className="flex min-h-screen flex-col items-center justify-between">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel 
            defaultSize={45} minSize={30} maxSize={55}>
            <Header title="Dashboard" />
              <ChildPages />
          </ResizablePanel>
          <ResizableHandle withHandle  />
          <ResizablePanel 
          defaultSize={55} minSize={30} maxSize={75}>
            <FileUpload />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>

      
    </>
  );
}
