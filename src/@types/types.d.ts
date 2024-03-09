interface User {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token: string;
  isDemo?: boolean;
}

interface MonthlyApplication {
  date: string;
  count: number;
}

interface JobStats {
  defaultStats: {
    pending: number;
    interview: number;
    declined: number;
  };
  monthlyApplications: MonthlyApplication[];
}

interface Job {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string;
  status: string;
}

type JobToCreate = Omit<Job, '_id' | 'createdAt'>;
