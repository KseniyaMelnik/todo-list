import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        removeTask: action("removeTask"),
        changeTaskStatus:action("changeTaskStatus"),
        changeTasksTitle:action("changeTasksTitle"),
    }
} as ComponentMeta<typeof Task>;

