# Package Builder for Salesforce

[![GitHub Workflow Lints Status](https://img.shields.io/github/actions/workflow/status/chiefpansancolt/package-builder/lints.yml?label=Lints&logo=github&style=flat-square)](https://github.com/chiefpansancolt/package-builder/actions/workflows/lints.yml)
[![GitHub Workflow PMD Status](https://img.shields.io/github/actions/workflow/status/chiefpansancolt/package-builder/pmd.yml?label=PMD&logo=github&style=flat-square)](https://github.com/chiefpansancolt/package-builder/actions/workflows/pmd.yml)
[![GitHub Workflow Tests Status](https://img.shields.io/github/actions/workflow/status/chiefpansancolt/package-builder/tests.yml?label=Tests&logo=github&style=flat-square)](https://github.com/chiefpansancolt/package-builder/actions/workflows/tests.yml)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/chiefpansancolt/package-builder?logo=github&style=flat-square)
[![Discord](https://img.shields.io/discord/450095227185659905?label=Discord&logo=discord&style=flat-square)](https://discord.gg/FPfA3w6)

Retrieve Metadata with ease to use in Package XML or SFDX commands.
This tool allows you to pick which Metadata items you want to build your Package XML or Commands with view checkboxes.

## Features

- Ability to select a Metadata Type
- Ability to select up to 3 folders for applicable Metadata Types
- Ability to select what Package Type (All, Managed, Unmanaged)
- Give full list of applicable metadata based on above features
- Get Package.xml output for selected metadata for applicable Metadata Type.
- Get sfdx or sf command output to retrieve metadata locally.
- Copy button for SFDX command.
- Copy All and Copy Type buttons for Package.xml.
  - Copy All is to get the full package.xml output
  - Copy Type gets only the type grouping of the package.xml format
- Ability to set API Version as new release come out.

## Installation

Using the urls below install the version you desire preferred usage is latest version on top.

| Version | Package Id      | Password         | URL                                                |
| ------- | --------------- | ---------------- | -------------------------------------------------- |
| 2.0     | 04t1U000007vQ5C | QuXshu9Q8xbNeK4b | /packaging/installPackage.apexp?p0=04t1U000007vQ5C |
| 1.1     | 04t1U000006I6Zc | dVRu4KuQa2LKUuaN | /packaging/installPackage.apexp?p0=04t1U000006I6Zc |
| 1.0     | 04t1U000006I6N9 | 3BpmOLZnwPQO     | /packaging/installPackage.apexp?p0=04t1U000006I6N9 |

## Usage

1. Select Package Builder Tab Name to start
![Tab Selection](/.github/images/Package%20Builder%20Tab.png)
2. You will be presented with this page after navigating to the tab
![Pre Selection](/.github/images/Pre%20Selection.png)
3. If you select a Metadata Type of (EmailTemplate, Report, Dashboard, or Document) you will be presented with a folder selection where you can select from 1-3 folders at a time.
![Folder Selection](/.github/images/Pre%20Selection%20with%20Folders.png)
4. If you select another without a folder usage then this is your final selection set screen. Package Types allow three options (All, Managed, Unmanaged).
![Selection](/.github/images/Selection.png)
5. Finally you will be presented with results after clicking "Search". Selecting a metadata value will make "Package XML" and "CLI Reference Command" panels become visible. You have the ability to copy using buttons. Package.xml offers the ability to copy full file or just the types group if you are looking to add to an existing package.xml file locally.
![Results](/.github/images/Results.png)

## Change Log

Check out the [Change Log](https://github.com/chiefpansancolt/package-builder/blob/main/CHANGELOG.md) for new breaking changes/features/bug fixes per release of a new version.

## Contributing

Bug Reports, Feature Requests, and Pull Requests are welcome on GitHub at https://github.com/chiefpansancolt/package-builder. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://github.com/chiefpansancolt/package-builder/blob/main/.github/CODE_OF_CONDUCT.md) code of conduct.

To see more about Contributing check out this [document](https://github.com/chiefpansancolt/package-builder/blob/main/.github/CONTRIBUTING.md).

- Fork Repo and create new branch
- Once all is changed and committed create a pull request.

**Ensure all merge conflicts are fixed and CI is passing.**

## Development

Developing is done in your own development org and no methods can be renamed or removed since this is a managed package.

## License

Package Builder is available as open source under the terms of the [MIT License](https://github.com/chiefpansancolt/package-builder/blob/main/LICENSE).