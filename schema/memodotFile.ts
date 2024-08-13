type MemodotFile = {
  id?: number;
  createdAt: number;
  updatedAt: number;
  isFolder: boolean;
  parentFolderId?: number;
  fileName: string;
  text?: string;
  children?: MemodotFile[];
  isRootFolder: boolean;
};
