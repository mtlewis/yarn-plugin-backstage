import { Plugin } from '@yarnpkg/core';
import { BackstageResolver } from './resolver/BackstageResolver';

const plugin: Plugin = {
  resolvers: [BackstageResolver]
};

export default plugin;
