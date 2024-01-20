# Contributing

Contributions are welcome. Please read the [Code of Conduct](CODE_OF_CONDUCT.md) and [License](LICENSE.md) before contributing.

Please open an issue to discuss changes first. We use the [GitHub Flow](https://www.gitkraken.com/learn/git/best-practices/git-branch-strategy#github-flow-considerations) branching strategy. 

Work from the `development` branch, as this will have the most up-to-date features before a release is made Add your code into a feature branch such as `feature/feature-name`. 



## Development
Clone the repository and run `npm install` to install dependencies.

## Info
`tsconfig.json` is the configuration file for type checking during development. It is not used during production.

`tsconfig.build.json` is the configuration file for generating declaration files for production. It is not used during development.
 The build process is taken care of by `Babel` and `Rollup`.
