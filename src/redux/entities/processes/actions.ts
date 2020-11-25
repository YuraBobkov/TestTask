import { createAction } from '@reduxjs/toolkit';

import { FIND_PROCESSES, CREATE_PROCESS } from './types';

export const findProcesses = createAction(FIND_PROCESSES);

export const createProcess = createAction(CREATE_PROCESS);
