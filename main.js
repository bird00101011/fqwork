const { app, BrowserWindow, Notification, ipcMain, Menu, screen, Tray } = require('electron/main')

const path = require('node:path')

let win;
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // ❌ 如果已经有实例在运行，直接退出当前这个实例
  app.quit();
} else {
  app.on('second-instance', () => {
    // 🧠 如果用户试图打开第二个实例，聚焦现有窗口
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

const createWindow = () => {
    // 返回屏幕的 可用工作区域大小，也就是屏幕上去除任务栏和其他系统界面元素后可以用来显示应用程序的区域
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const wh = 200
    win = new BrowserWindow({
        width: wh,
        height: wh,
        maximizable: false,
        alwaysOnTop: true,
        minimizable: false,
        // frame: false,

        // 设置窗口默认右下角
        x: width - wh,
        y: height - wh,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    })
    ipcMain.handle('fqwork_rest', () => {
        if (Notification.isSupported()) {
            const notification = new Notification({
                title: '提醒',
                body: '请注意休息!',
            })
            notification.show()
        }
    })
    win.loadFile('index.html')
    Menu.setApplicationMenu(null)

    if (process.platform === 'win32') {
        app.setAppUserModelId('番茄工作法')
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', (e) => {
    app.quit()
})
