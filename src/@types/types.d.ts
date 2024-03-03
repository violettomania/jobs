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
