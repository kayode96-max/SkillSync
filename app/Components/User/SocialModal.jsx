"use client";

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';

export default function SocialModal({ isOpen, onOpenChange, username, initialSocialLinks }) {
  // Initialize state with the initialSocialLinks or default values
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks || {
    twitter: '',
    linkedin: '',
    stackoverflow: '',
    leetcode: '',
    website: '',
  });

  const { twitter, linkedin, stackoverflow, leetcode, website } = socialLinks;

  // Update social links if initialSocialLinks change
  useEffect(() => {
    setSocialLinks(initialSocialLinks || {
      twitter: '',
      linkedin: '',
      stackoverflow: '',
      leetcode: '',
      website: '',
    });
  }, [initialSocialLinks]);

  const handleInputChange = (e, field) => {
    setSocialLinks({ ...socialLinks, [field]: e.target.value });
  };

  const handleSocialLinksUpdate = async () => {
    try {
      const response = await fetch('/api/UpdateSocial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, socialLinks }), // Include socialLinks here
      });
      if (!response.ok) {
        throw new Error(`Failed to update social links: ${response.status}`);
      }
      const result = await response.json();
      console.log('Update response:', result);
    } catch (error) {
      console.error(`Error updating social links: ${error}`);
    }
  };

  const handleSave = () => {
    handleSocialLinksUpdate();
    console.log("saving social links",{...socialLinks});
    
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onOpenChange(false)}
      placement="center"
      classNames={{
        contentWrapper: "rounded-lg",
        base: "dark:bg-[#021526] p-4",
        body: "flex flex-col gap-4",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add Social Links
        </ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            isClearable
            type="text"
            label="Twitter"
            placeholder="https://twitter.com/username"
            variant="bordered"
            value={twitter}
            onChange={(e) => handleInputChange(e, 'twitter')}
            classNames={{
              label: "block text-white text-sm absolute top-1 left-2 right-1",
              base: "rounded-md",
              inputWrapper: "h-14 rounded-md",
              innerWrapper: "h-14 flex flex-col justify-end rounded-md",
              input: [
                "text-white/80",
                "placeholder:text-slate-600",
                "w-full",
                "pt-4 mt-2",
                "rounded-md",
                "outline-none",
              ],
            }}
          />
          <Input
            label="LinkedIn"
            placeholder="https://www.linkedin.com/in/username"
            variant="bordered"
            value={linkedin}
            onChange={(e) => handleInputChange(e, 'linkedin')}
            classNames={{
              label: "block text-white text-sm absolute top-1 left-2 right-1",
              base: "rounded-md",
              inputWrapper: "h-14 rounded-md",
              innerWrapper: "h-14 flex flex-col justify-end rounded-md",
              input: [
                "text-white/80",
                "placeholder:text-slate-600",
                "w-full",
                "pt-4 mt-2",
                "rounded-md",
                "outline-none",
              ],
            }}
          />
          <Input
            label="Stack Overflow"
            placeholder="https://stackoverflow.com/users/1234/username"
            variant="bordered"
            value={stackoverflow}
            onChange={(e) => handleInputChange(e, 'stackoverflow')}
            classNames={{
              label: "block text-white text-sm absolute top-1 left-2 right-1",
              base: "rounded-md",
              inputWrapper: "h-14 rounded-md",
              innerWrapper: "h-14 flex flex-col justify-end rounded-md",
              input: [
                "text-white/80",
                "placeholder:text-slate-600",
                "w-full",
                "pt-4 mt-2",
                "rounded-md",
                "outline-none",
              ],
            }}
          />
          <Input
            label="LeetCode"
            placeholder="https://leetcode.com/u/username"
            variant="bordered"
            value={leetcode}
            onChange={(e) => handleInputChange(e, 'leetcode')}
            classNames={{
              label: "block text-white text-sm absolute top-1 left-2 right-1",
              base: "rounded-md",
              inputWrapper: "h-14 rounded-md",
              innerWrapper: "h-14 flex flex-col justify-end rounded-md",
              input: [
                "text-white/80",
                "placeholder:text-slate-600",
                "w-full",
                "pt-4 mt-2",
                "rounded-md",
                "outline-none",
              ],
            }}
          />
          <Input
            label="Website"
            placeholder="https://abcxyz.com"
            variant="bordered"
            value={website}
            onChange={(e) => handleInputChange(e, 'website')}
            classNames={{
              label: "block text-white text-sm absolute top-1 left-2 right-1",
              base: "rounded-md",
              inputWrapper: "h-14 rounded-md",
              innerWrapper: "h-14 flex flex-col justify-end rounded-md",
              input: [
                "text-white/80",
                "placeholder:text-slate-600",
                "w-full",
                "pt-4 mt-2",
                "rounded-md",
                "outline-none",
              ],
            }}
          />
        </ModalBody>
        <ModalFooter className="pt-2">
          <Button color="error" flat onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
