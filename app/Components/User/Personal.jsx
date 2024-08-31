import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import Cardimage from "../../../public/card.jpeg";

export default async function Personal({ userData }) {
  const username = userData?.login;
  let data = null;

  if (username) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc`,
      { cache: "force-cache" }
    );
    if (response.ok) {
      data = await response.json();
      // console.log(data);
    } else {
      console.error(
        `Failed to fetch user data: ${response.status} ${response.statusText}`
      );
    }
  }

  return (
    <div className="flex justify-center  w-3/4 mx-auto">
      <div className="flex flex-col 2xl:w-3/4">
        <div className="flex-1 dark:bg-[#021526]  shadow-xl p-8">
          <h4 className="text-xl dark:text-white text-gray-900 font-bold">
            Latest Projects
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
            {data?.slice(0, 9).map((repo) => (
              <Card key={repo.id} className="p-6 bg-slate-900">
                <CardHeader className="flex gap-3 pb-2">
                  <Image
                    alt="repository owner"
                    height={40}
                    radius="sm"
                    src={repo.owner.avatar_url}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-bold">
                      {repo.name || "unknown"}
                    </p>
                    <p className="text-small text-default-500">
                      {repo.language || "No language specified"}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="pt-2 pb-2">
                  {repo.description ? (
                    <p>{repo.description}</p>
                  ) : (
                    <Image
                      src={Cardimage.src}
                      alt="No description available"
                      width={300}
                    />
                  )}
                </CardBody>
                <Divider />
                <CardFooter className="pt-2 flex justify-between">
                  <Button color="secondary" variant="ghost">
                    {" "}
                    <Link isExternal href={repo.html_url}>
                      Source Code
                    </Link>
                  </Button>

                  <Link isExternal showAnchorIcon href={repo.homepage || "/"}>
                    Live Preview
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
