import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchJobs } from '../actions/fetchJobs';

export interface JobsState {
  loading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: JobStats;
  monthlyApplications: MonthlyApplication[];
  searchTerm: string;
  status: string;
  jobType: string;
  sort: string;
  sortOptions: string[];
}

export interface FilterState {
  searchTerm: string;
  status: string;
  jobType: string;
  sort: string;
  sortOptions: string[];
}

const initialFiltersState: FilterState = {
  searchTerm: '',
  status: 'all',
  jobType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState: JobsState & FilterState = {
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
    search: (
      state,
      action: PayloadAction<{
        name: keyof JobsState & FilterState;
        value: JobsState[keyof JobsState] & FilterState[keyof FilterState];
      }>
    ) => {
      state.page = 1;
      (state as any)[action.payload.name] = action.payload.value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearJobs: () => initialState,
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
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  showLoading,
  hideLoading,
  search,
  clearFilters,
  changePage,
  clearJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;
