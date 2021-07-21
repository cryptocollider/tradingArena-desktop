const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'CryptoCollider-win32-ia32/'),
    authors: 'Crypto-Collider',
    noMsi: false,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'CryptoCollider.exe',
    setupExe: 'CryptoCollider-1.6_Installer.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico'),
	loadingGif: path.join(rootPath, 'assets', 'installLoading2.gif'),
	iconUrl: 'https://cryptocollider.com/app/images/icon.ico'
  })
}


/*
// msi file
import { MSICreator } from 'electron-wix-msi';

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: '/path/to/built/app',
  description: 'My amazing Kitten simulator',
  exe: 'kittens',
  name: 'Kittens',
  manufacturer: 'Kitten Technologies',
  version: '1.1.2',
  outputDirectory: '/path/to/output/folder'
});

// Step 2: Create a .wxs template file
await msiCreator.create();

// Step 3: Compile the template to a .msi file
await msiCreator.compile();*/