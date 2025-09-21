
import { signIn } from "@/auth"
import { Button } from "../ui/button"
 
export default function SignInBtn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("microsoft-entra-id")
      }}
    >
      <Button type="submit">Signin with Microsoft Entra ID</Button>
    </form>
  )
} 