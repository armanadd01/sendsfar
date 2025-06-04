'use client'
import { Header } from "@/components/Header"
import { LoginForm } from "@/components/login-form"
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  // Function to handle back navigation
  const handleBack = () => {
    router.back();
  };


  return (
    <> 
    <Header showBackButton onBack={handleBack} title="Login to your account" />
    <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      
      <div className="w-full max-w-sm md:max-w-lg ">
        
        <LoginForm />
      </div>
    </div>
    
    </>
    
  )
}
