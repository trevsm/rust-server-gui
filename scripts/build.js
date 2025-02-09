const packager = require("electron-packager")
const electronInstaller = require("electron-winstaller")

async function build(options) {
  const appPaths = await packager(options)

  console.log(
    `✅ App build ready in: ${appPaths.join("\n")}, creating installer...`
  )

  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: "./dist/app-win32-ia32",
      outputDirectory: "./dist/installer",
      authors: "Weekly Webtips",
      description: "📦🚀 Electron app using React, built with Parcel",
      exe: "app.exe",
    })

    console.log("💻 Installer is created in dist/installer")
  } catch (e) {
    console.log(`The following error occured: ${e.message}`)
  }
}

build({
  name: "app",
  dir: "./",
  out: "dist",
  overwrite: true, // overwrite existing app if exists
  asar: true, // asar is a format for packing your app's source code into a single file
  platform: "win32", // win32, darwin, linux
  arch: "ia32", // ia32, x64, armv7l, all
})
