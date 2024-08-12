import Image from "next/image";
import Link from "next/link";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { doSocialLogin } from "../actions";
import { Button } from "../../@/components/ui/button";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
export default function Page() {
  return (
    <div className="w-full h-screen lg:grid  lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <form action={doSocialLogin}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground pb-2">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ahsan@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" placeholder="**********" />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-500"
              >
                <EnvelopeOpenIcon className="mr-2 h-4 w-4 " />
                Login
              </Button>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
              <Button
                variant="outline"
                className="w-full"
                typer="submit"
                name="action"
                value="google"
              >
                Login with Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                typer="submit"
                name="action"
                value="github"
              >
                Login with GitHub
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
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
