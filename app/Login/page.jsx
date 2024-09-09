import Image from "next/image";
import Link from "next/link";
import { doSocialLogin } from "../actions";
import { Button } from "../../@/components/ui/button";
import Github from "../../public/github.svg";
import logo from "../../public/2.svg"

export default function Page() {
  return (
    <div className="w-full h-screen lg:grid  lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <form action={doSocialLogin}>
            <div className="grid gap-2 place-items-center">
            <Image src={logo} width={85} height={85} alt="logo" />
              <p className="text-balance text-muted-foreground text-center pb-2">
                Click below to authenticate with GitHub Account.
              </p>
            </div>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full flex gap-2 justify-center"
                typer="submit"
                name="action"
                value="github"
              >
                <Image src={Github} alt="GitHub" width={20} height={20} />
                Login with GitHub
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/pic.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.5] "
        />
      </div>
    </div>
  );
}
