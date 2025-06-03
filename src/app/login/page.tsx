import { Header } from "@/components/Header"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <> 
    <Header title="Login" />
    <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      
      <div className="w-full max-w-sm md:max-w-lg ">
        
        <LoginForm />
      </div>
    </div>
    
    </>
    
  )
}
