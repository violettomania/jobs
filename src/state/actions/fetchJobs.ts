import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Job {}

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {});
