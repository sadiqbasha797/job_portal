export interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    deadline: Date;
    docLink?: string;
    applyLink?: string;
    createdBy: string;
    college: string;
    createdAt: Date;
    updatedAt: Date;
  }
  