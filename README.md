# This repository has been archived - the plugin will be contribued to backstage/backstage. See https://github.com/backstage/backstage/pull/24136.

# yarn-plugin-backstage

This repository contains a proof-of-concept yarn plugin for working with
Backstage versions. This package allows consumers of Backstage packages to
replace the specific version for each package with the version of the overall
Backstage release, making it easier to ensure that versions are kept in sync.

## Trying it out

This package itself depends on some Backstage packages - and you'll see from the
package.json that the dependency is set to `backstage:*`. This means "the
version from backstage.json". You can try:

* Adding a new package with a command like `yarn add
  '@backstage/plugin-catalog@backstage:*'`.
* Updating the version in `backstage.json` and re-running `yarn`. You'll see all
  the versions in `yarn.lock` get updated with the appropriate versions.
* Using a different version of backstage in the package.json. If you prefer, you
  can set the version explicitly with a range like `backstage:1.10.0` - this
  will resolve the package version from the manifest for that release.

## Installing the plugin in a different repository

If you want to try this out in a different repository on your local machine, you
can run the following command:

```
yarn plugin import <path-to-this-repo>/bundles/@yarnpkg/plugin-backstage.js
```

Once that's done, you should be able to move over to using `backstage:*`
versions in the `package.json` files in your repo.
