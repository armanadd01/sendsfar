import FileUpload from "@/components/FileUpload";
import { Header } from "@/components/Header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ChildPages from "./child-pages/page";


export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel 
          defaultSize={45} minSize={10} maxSize={55}>
            <Header title="Dashboard" />
              <ChildPages />
          </ResizablePanel>
          <ResizableHandle withHandle  />
          <ResizablePanel>
            <FileUpload />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
     
      
    </>
  );
}
