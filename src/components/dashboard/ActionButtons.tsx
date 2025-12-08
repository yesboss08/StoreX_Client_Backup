import React from 'react';
import { Button } from '../ui';
import { FolderPlusIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';



interface ActionButtonsProps {
  onCreateFolder: () => void;
  onUploadFile: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCreateFolder,
  onUploadFile,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <Button
        onClick={onCreateFolder}
        variant="primary"
        size="lg"
        className="group"
      >
        <FolderPlusIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Create Folder
      </Button>
      
      <Button
        onClick={onUploadFile}
        variant="secondary"
        size="lg"
        className="group"
      >
        <DocumentPlusIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Upload File
      </Button>
    </div>
  );
};