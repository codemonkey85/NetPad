import {System} from "@common";
import {IMenuItem} from "./imenu-item";
import {
    EnvironmentPropertyChangedEvent,
    IEventBus,
    IPaneManager,
    IScriptService,
    ISession,
    ISettingsService,
    IShortcutManager,
    IWindowService,
    ShortcutIds
} from "@application";
import {ITextEditorService} from "@application/editor/itext-editor-service";
import {AppUpdateDialog} from "@application/app/app-update-dialog/app-update-dialog";
import {DialogUtil} from "@application/dialogs/dialog-util";
import {IMainMenuService} from "./imain-menu-service";
import {WindowParams} from "@application/windows/window-params";
import {ShellType} from "@application/windows/shell-type";
import {AppDependenciesCheckDialog} from "@application/app/app-dependencies-check-dialog/app-dependencies-check-dialog";

export class MainMenuService implements IMainMenuService {
    private readonly _items: IMenuItem[] = [];

    constructor(
        @IScriptService private readonly scriptService: IScriptService,
        @ISettingsService private readonly settingsService: ISettingsService,
        @IShortcutManager private readonly shortcutManager: IShortcutManager,
        @ITextEditorService private readonly textEditorService: ITextEditorService,
        @IWindowService private readonly windowService: IWindowService,
        @IPaneManager private readonly paneManager: IPaneManager,
        @ISession private readonly session: ISession,
        @IEventBus eventBus: IEventBus,
        private readonly dialogUtil: DialogUtil
    ) {
        this._items = [
            {
                text: "File",
                menuItems: [
                    {
                        id: "file.new",
                        text: "New",
                        icon: "add-script-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.newDocument),
                    },
                    {
                        id: "file.goToScript",
                        text: "Go to Script",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.quickOpenDocument),
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "file.save",
                        text: "Save",
                        icon: "save-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.saveDocument),
                    },
                    {
                        id: "file.saveAll",
                        text: "Save All",
                        icon: "save-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.saveAllDocuments),
                    },
                    {
                        id: "file.properties",
                        text: "Properties",
                        icon: "properties-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.openDocumentProperties),
                    },
                    {
                        id: "file.close",
                        text: "Close",
                        icon: "close-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.closeDocument),
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "file.settings",
                        text: "Settings",
                        icon: "settings-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.openSettings),
                    },
                    WindowParams.shell === ShellType.Browser ? undefined! : {
                        id: "file.exit",
                        text: "Exit",
                        click: async () => this.windowService.close()
                    }
                ].filter(x => x)
            },
            {
                text: "Edit",
                menuItems: [
                    {
                        id: "edit.undo",
                        text: "Undo",
                        icon: "undo-icon",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "undo", null),
                        helpText: "Ctrl + Z"
                    },
                    {
                        id: "edit.redo",
                        text: "Redo",
                        icon: "redo-icon",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "redo", null),
                        helpText: "Ctrl + Shift + Z"
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "edit.selectAll",
                        text: "Select All",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.selectAll", null),
                        helpText: "Ctrl + A"
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "edit.find",
                        text: "Find",
                        icon: "search-icon",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "actions.findWithSelection", null),
                        helpText: "Ctrl + F"
                    },
                    {
                        id: "edit.replace",
                        text: "Replace",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.startFindReplaceAction", null),
                        helpText: "Ctrl + H"
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "edit.transform1",
                        text: "Transform to Upper/Lower Case",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "netpad.action.transformToUpperOrLowercase", null),
                        helpText: "Ctrl + Shift + Y"
                    },
                    {
                        id: "edit.transform2",
                        text: "Transform to Upper Case",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.transformToUppercase", null)
                    },
                    {
                        id: "edit.transform3",
                        text: "Transform to Lower Case",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.transformToLowercase", null)
                    },
                    {
                        id: "edit.transform4",
                        text: "Transform to Title Case",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.transformToTitlecase", null)
                    },
                    {
                        id: "edit.transform5",
                        text: "Transform to Kebab Case",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.transformToKebabcase", null)
                    },
                    {
                        id: "edit.transform6",
                        text: "Transform to Snake Case",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.transformToSnakecase", null)
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "edit.toggleLineComment",
                        text: "Toggle Line Comment",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.commentLine", null),
                        helpText: "Ctrl + /"
                    },
                    {
                        id: "edit.toggleBlockComment",
                        text: "Toggle Block Comment",
                        click: async () => this.textEditorService.active?.monaco
                            .trigger(null, "editor.action.blockComment", null),
                        helpText: "Ctrl + Shift + A"
                    }
                ]
            },
            {
                text: "View",
                menuItems: [
                    {
                        id: "view.explorer",
                        text: "Explorer",
                        icon: "explorer-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.openExplorer),
                    },
                    {
                        id: "view.output",
                        text: "Output",
                        icon: "output-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.openOutput),
                    },
                    {
                        id: "view.code",
                        text: "Code",
                        icon: "code-icon",
                        click: async () => {
                            const CodePane = (await import("../../../windows/main/panes")).CodePane;
                            this.paneManager.toggle(CodePane);
                        }
                    },
                    {
                        id: "view.namespaces",
                        text: "Namespaces",
                        icon: "namespaces-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.openNamespaces),
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "view.reload",
                        text: "Reload",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.reloadWindow),
                    },
                    {
                        id: "view.toggleDeveloperTools",
                        text: "Toggle Developer Tools",
                        click: async () => this.windowService.toggleDeveloperTools(),
                        helpText: "Ctrl + Shift + I",
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "view.zoomIn",
                        text: "Zoom In",
                        icon: "zoom-in-icon",
                        // shortcut: this.shortcutManager.getShortcut("zoomIn"),
                        click: async () => this.windowService.zoomIn()
                    },
                    {
                        id: "view.zoomOut",
                        text: "Zoom Out",
                        icon: "zoom-out-icon",
                        shortcut: this.shortcutManager.getShortcut(ShortcutIds.zoomOut),
                    },
                    {
                        id: "view.resetZoom",
                        text: "Reset Zoom",
                        helpText: "Ctrl + 0",
                        click: async () => this.windowService.resetZoom()
                    },
                    {
                        isDivider: true
                    },
                    {
                        id: "view.toggleFullScreen",
                        text: "Toggle Full Screen",
                        click: async () => this.windowService.toggleFullScreen(),
                        helpText: "F11",
                    },
                ]
            },
            {
                text: "Tools",
                menuItems: [
                    {
                        id: "tools.dependencyCheck",
                        text: "App Dependency Check",
                        icon: "app-deps-check-icon",
                        click: async () => await this.dialogUtil.toggle(AppDependenciesCheckDialog)
                    },
                    {
                        id: "tools.stopRunningScripts",
                        text: "Stop Running Scripts",
                        hoverText: "Stop all running scripts.",
                        icon: "stop-icon text-red",
                        click: async () => this.scriptService.stopAll(false),
                    },
                    {
                        id: "tools.stopScriptHosts",
                        text: "Stop Scripts and Runners",
                        hoverText: "Stop all running scripts and idle runners that are alive in the background.",
                        icon: "stop-icon",
                        click: async () => this.scriptService.stopAll(true),
                    },
                ]
            },
            {
                text: "Help",
                menuItems: [
                    {
                        id: "help.wiki",
                        text: "Wiki",
                        icon: "wiki-icon",
                        click: async () => System.openUrlInBrowser("https://github.com/tareqimbasher/NetPad/wiki")
                    },
                    {
                        id: "help.github",
                        text: "GitHub",
                        icon: "github-icon",
                        click: async () => System.openUrlInBrowser("https://github.com/tareqimbasher/NetPad")
                    },
                    {
                        id: "help.searchIssues",
                        text: "Search Issues",
                        icon: "github-icon",
                        click: async () => System.openUrlInBrowser("https://github.com/tareqimbasher/NetPad/issues")
                    },
                    {isDivider: true},
                    {
                        id: "help.checkForUpdates",
                        text: "Check for Updates",
                        icon: "app-update-icon",
                        click: async () => await this.dialogUtil.toggle(AppUpdateDialog)
                    },
                    {
                        id: "help.about",
                        text: "About",
                        icon: "star-icon",
                        click: async () => await this.settingsService.openSettingsWindow("about")
                    },
                ]
            }
        ];

        this.updateMenuItems();

        eventBus.subscribeToServer(EnvironmentPropertyChangedEvent, _ => this.updateMenuItems());
    }

    public get items(): ReadonlyArray<IMenuItem> {
        return this._items;
    }

    public addItem(item: IMenuItem) {
        this._items.push(item);
    }

    public removeItem(item: IMenuItem) {
        const ix = this._items.indexOf(item);
        if (ix >= 0) this._items.splice(ix, 1);
    }

    public async clickMenuItem(itemOrId: IMenuItem | string) {
        let menuItem: IMenuItem | undefined;

        if (typeof itemOrId === "object") {
            menuItem = itemOrId;
        } else {
            menuItem = this.find(this._items, item => item.id === itemOrId);
        }

        if (!menuItem) return;

        if (menuItem.click) {
            await menuItem.click();
        } else if (menuItem.shortcut) {
            await this.shortcutManager.executeShortcut(menuItem.shortcut);
        }
    }

    private filter(items: IMenuItem[], predicate: (item: IMenuItem) => boolean) {
        const results: IMenuItem[] = [];

        this.walkItems(items, item => {
            if (predicate(item)) results.push(item);
            return true;
        });

        return results;
    }

    private find(items: IMenuItem[], predicate: (item: IMenuItem) => boolean) {
        let result: IMenuItem | undefined;

        this.walkItems(items, item => {
            if (predicate(item)) {
                result = item;
                return false;
            }

            return true;
        });

        return result;
    }

    private walkItems(items: IMenuItem[], action: (item: IMenuItem) => boolean) {
        for (const item of items) {
            if (!action(item)) return;

            if (item.menuItems && item.menuItems.length) {
                this.walkItems(item.menuItems, action);
            }
        }
    }

    private updateMenuItems() {
        let anyScriptRunning = false;
        let anyScriptHostRunning = false;

        for (const environment of this.session.environments) {
            if (!anyScriptRunning && environment.status === "Running") {
                anyScriptRunning = true;
            }

            if (!anyScriptHostRunning && environment.isScriptHostRunning) {
                anyScriptHostRunning = true;
            }

            if (anyScriptRunning || anyScriptHostRunning) {
                break;
            }
        }

        let item = this.find(this._items, x => x.id === "tools.stopRunningScripts");
        if (item) {
            item.disabled = !anyScriptRunning;
        }

        item = this.find(this._items, x => x.id === "tools.stopScriptHosts");
        if (item) {
            item.disabled = !anyScriptHostRunning;
        }
    }
}
