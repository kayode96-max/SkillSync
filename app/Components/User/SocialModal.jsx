import React, { useContext } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { SocialLinksContext } from './Header';

export default function SocialModal({ isOpen, onOpenChange }) {
  const { socialLinks, setSocialLinks } = useContext(SocialLinksContext);
  const twitter = socialLinks.twitter || "";
  const linkedin = socialLinks.linkedin || "";
  const stackoverflow = socialLinks.stackoverflow || "";
  const leetcode = socialLinks.leetcode || "";
  const website = socialLinks.website || "";

  const handleInputChange = (e, field) => {
    setSocialLinks({ ...socialLinks, [field]: e.target.value });
  };

  const handleSave = () => {
    setSocialLinks({ ...socialLinks }); // Trigger an update to force re-render
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      classNames={{
        contentWrapper: "rounded-lg",
        base: "dark:bg-[#021526]  p-4",
        body: "flex flex-col gap-4",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
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
                  label:
                    "block text-white text-sm absolute top-1 left-2 right-1", // Ensures the label is a block element with margin below
                  base: "  rounded-md", // Background color of the base with padding and rounded corners
                  inputWrapper: " h-14 rounded-md", // Background color behind the input with padding and rounded corners
                  innerWrapper: " h-14 flex flex-col justify-end  rounded-md", // Background color and height of the inner wrapper with flex alignment and rounded corners
                  input: [
                    "text-white/80", // Text color of the input
                    "placeholder:text-slate-600", // Placeholder text color
                    "w-full", // Full width to fit the container
                    "pt-4 mt-2 ", // Padding inside the input
                    "rounded-md",
                    "outline-none", // Rounded corners
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
                  label:
                    "block text-white text-sm absolute top-1 left-2 right-1", // Ensures the label is a block element with margin below
                  base: "  rounded-md", // Background color of the base with padding and rounded corners
                  inputWrapper: " h-14 rounded-md", // Background color behind the input with padding and rounded corners
                  innerWrapper: " h-14 flex flex-col justify-end  rounded-md", // Background color and height of the inner wrapper with flex alignment and rounded corners
                  input: [
                    "text-white/80", // Text color of the input
                    "placeholder:text-slate-600", // Placeholder text color
                    "w-full", // Full width to fit the container
                    "pt-4 mt-2 ", // Padding inside the input
                    "rounded-md",
                    "outline-none", // Rounded corners
                  ],
                }}
              />
              <Input
                label="Stackoverflow"
                placeholder="https://stackoverflow.com/users/1234/username"
                variant="bordered"
                value={stackoverflow}
                onChange={(e) => handleInputChange(e, 'stackoverflow')}
                classNames={{
                  label:
                    "block text-white text-sm absolute top-1 left-2 right-1", // Ensures the label is a block element with margin below
                  base: "  rounded-md", // Background color of the base with padding and rounded corners
                  inputWrapper: " h-14 rounded-md", // Background color behind the input with padding and rounded corners
                  innerWrapper: " h-14 flex flex-col justify-end  rounded-md", // Background color and height of the inner wrapper with flex alignment and rounded corners
                  input: [
                    "text-white/80", // Text color of the input
                    "placeholder:text-slate-600", // Placeholder text color
                    "w-full", // Full width to fit the container
                    "pt-4 mt-2 ", // Padding inside the input
                    "rounded-md",
                    "outline-none", // Rounded corners
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
                  label:
                    "block text-white text-sm absolute top-1 left-2 right-1", // Ensures the label is a block element with margin below
                  base: "  rounded-md", // Background color of the base with padding and rounded corners
                  inputWrapper: " h-14 rounded-md", // Background color behind the input with padding and rounded corners
                  innerWrapper: " h-14 flex flex-col justify-end  rounded-md", // Background color and height of the inner wrapper with flex alignment and rounded corners
                  input: [
                    "text-white/80", // Text color of the input
                    "placeholder:text-slate-600", // Placeholder text color
                    "w-full", // Full width to fit the container
                    "pt-4 mt-2 ", // Padding inside the input
                    "rounded-md",
                    "outline-none", // Rounded corners
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
                  label:
                    "block text-white text-sm absolute top-1 left-2 right-1", // Ensures the label is a block element with margin below
                  base: "  rounded-md", // Background color of the base with padding and rounded corners
                  inputWrapper: " h-14 rounded-md", // Background color behind the input with padding and rounded corners
                  innerWrapper: " h-14 flex flex-col justify-end  rounded-md", // Background color and height of the inner wrapper with flex alignment and rounded corners
                  input: [
                    "text-white/80", // Text color of the input
                    "placeholder:text-slate-600", // Placeholder text color
                    "w-full", // Full width to fit the container
                    "pt-4 mt-2 ", // Padding inside the input
                    "rounded-md",
                    "outline-none", // Rounded corners
                  ],
                }}
              />
            </ModalBody>
            <ModalFooter className="pt-2">
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
