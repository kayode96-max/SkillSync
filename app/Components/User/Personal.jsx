import React from "react";

export default function Personal() {
  return (
    <div class=" flex justify-center p-8 ">
      <div class=" flex flex-col 2xl:w-3/4 ">
        <div class="flex-1 dark:bg-cyan-700 rounded-lg shadow-xl p-8">
          <h4 class="text-xl dark:text-white text-gray-900 font-bold">
            Personal Info
          </h4>
          <ul class="mt-2 dark:text-white text-gray-900">
            <li class="flex border-y py-2">
              <span class="font-bold w-24">Full name:</span>
              <span class="dark:text-white text-gray-700">Amanda S. Ross</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Birthday:</span>
              <span class="dark:text-white text-gray-700">24 Jul, 1991</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Joined:</span>
              <span class="dark:text-white text-gray-700">
                10 Jan 2022 (25 days ago)
              </span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Mobile:</span>
              <span class="dark:text-white text-gray-700">(123) 123-1234</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Email:</span>
              <span class="dark:text-white text-gray-700">
                amandaross@example.com
              </span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Location:</span>
              <span class="dark:text-white text-gray-700">New York, US</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Languages:</span>
              <span class="dark:text-white text-gray-700">
                English, Spanish
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
