import {
  structUtils,
  Descriptor,
  Locator,
  Package,
  Resolver,
} from '@yarnpkg/core';
import { xfs, npath } from '@yarnpkg/fslib';
import { getManifestByVersion } from '@backstage/release-manifests';

export class BackstageResolver implements Resolver {
  static protocol = `backstage:`;

  supportsDescriptor = (descriptor: Descriptor) =>
    descriptor.range.startsWith(BackstageResolver.protocol);

  shouldPersistResolution = () => true;

  bindDescriptor(descriptor: Descriptor): Descriptor {
    if (descriptor.range === `${BackstageResolver.protocol}*`) {
      const backstageJson = xfs.readJsonSync(
        npath.toPortablePath('./backstage.json'),
      );

      return structUtils.makeDescriptor(
        descriptor,
        `backstage:${backstageJson.version}`,
      );
    }

    return descriptor;
  }

  async getCandidates(descriptor: Descriptor): Promise<Locator[]> {
    const backstageVersion = descriptor.range.replace(
      BackstageResolver.protocol,
      '',
    );

    const manifest = await getManifestByVersion({ version: backstageVersion });
    const ident = structUtils.stringifyIdent(descriptor);

    const manifestEntry = manifest.packages.find(
      candidate => candidate.name === ident,
    );

    if (!manifestEntry) {
      throw new Error(`Package ${ident} not found in manifest`);
    }

    return [
      structUtils.makeLocator(descriptor, `npm:${manifestEntry.version}`),
    ];
  }

  supportsLocator = () => false;

  getResolutionDependencies = () => ({});

  async getSatisfying(): Promise<{ locators: Locator[]; sorted: boolean }> {
    // Candidate versions produced by this resolver always use the `npm:`
    // protocol, so this function will never be called.
    throw new Error('Unreachable');
  }

  async resolve(): Promise<Package> {
    // Once transformed into locators (through getCandidates), the versions are
    // resolved by the NpmSemverResolver
    throw new Error(`Unreachable`);
  }
}
