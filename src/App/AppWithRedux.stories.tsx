import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppWidthRedux from "./AppWidtxRedux";
import {ReduxStoreProviderDecorator, RouterDecorator} from "../store/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AppWidthRedux',
    component: AppWidthRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator, RouterDecorator],
} as ComponentMeta<typeof AppWidthRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWidthRedux> = (args) => <AppWidthRedux />;

export const AppWidthReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWidthReduxStory.args = {

};


