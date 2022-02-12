import {IAppService, IEventBus, IScriptService, ISession, ScriptDirectoryChanged, ScriptSummary} from "@domain";
import Split from "split.js";

export class Sidebar {
    private readonly rootScriptFolder: SidebarScriptFolder;

    constructor(@ISession readonly session: ISession,
                @IScriptService readonly scriptService: IScriptService,
                @IAppService readonly appService: IAppService,
                @IEventBus readonly eventBus: IEventBus) {
        this.rootScriptFolder = new SidebarScriptFolder("/", "/");
        this.rootScriptFolder.expanded = true;
    }

    public async attached() {
        this.loadScripts(await this.scriptService.getScripts());

        Split(["#connection-list", "#script-list"], {
            gutterSize: 6,
            direction: 'vertical',
            sizes: [35, 65],
            minSize: [100, 100],
        });

        this.eventBus.subscribeToServer(ScriptDirectoryChanged, msg => {
            this.loadScripts(msg.scripts);
        });
    }

    private loadScripts(summaries: ScriptSummary[]) {
        this.rootScriptFolder.scripts.splice(0);
        this.rootScriptFolder.folders.splice(0);

        for (const summary of summaries) {
            const folderParts = summary.path
                .split("/")
                .filter(x => !!x)
                .slice(0, -1);

            const folder = this.getFolder(this.rootScriptFolder, folderParts);
            folder.scripts.push(summary);
        }
    }

    private getFolder(parent: SidebarScriptFolder, folderPathParts: string[]) {
        let result = parent;

        for (const folderName of folderPathParts) {
            let folder = result.folders.find(f => f.name === folderName);
            if (!folder) {
                folder = new SidebarScriptFolder(folderName, folderPathParts.join("/"));
                result.folders.push(folder);
            }
            result = folder;
        }

        return result;
    }

    public async openScriptsFolder(folder: SidebarScriptFolder) {
        await this.appService.openScriptsFolder(folder.path);
    }

    public expandAllFolders(folder: SidebarScriptFolder) {
        folder.expanded = true;
        folder.folders.forEach(f => this.expandAllFolders(f));
    }

    public collapseAllFolders(folder: SidebarScriptFolder) {
        folder.expanded = false;
        folder.folders.forEach(f => this.collapseAllFolders(f));
    }

    public async addConnection() {
        alert("Adding connections is not implemented yet.");
    }
}

class SidebarScriptFolder {
    constructor(public name: string, public path: string) {
    }

    public expanded = false;
    public folders: SidebarScriptFolder[] = [];
    public scripts: ScriptSummary[] = [];
}