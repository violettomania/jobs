import { createSlice } from '@reduxjs/toolkit';

import { fetchJobs } from '../actions/fetchJobs';

interface Job {
  id: string;
  company: string;
  position: string;
  status: string;
  jobType: string;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface JobsState {
  loading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: JobStats;
  monthlyApplications: MonthlyApplication[];
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

interface FilterState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

const initialFiltersState: FilterState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState: JobsState = {
  loading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {
    defaultStats: {
      pending: 0,
      interview: 0,
      declined: 0,
    },
    monthlyApplications: [],
  },
  monthlyApplications: [],
  ...initialFiltersState,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      //       state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(fetchJobs.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = jobsSlice.actions;

export default jobsSlice.reducer;
