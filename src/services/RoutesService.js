module.exports = class RoutesService {
    constructor() {
        this.express = require("express")
        this.universityController = require("../controllers/UniversityController")
        this.dbService = require("../services/DbService")
        this.loaderService = require("../services/LoaderService")
        this.server_port = process.env.SERVER_PORT || 3000
    }
    init = async () => {
        const dbService = new this.dbService.DbService()
        const server = this._config()
        await dbService.connect()
        return this._start(server)
    }
    _config = () => {
        const server = this.express()
        const controller = new this.universityController.UniversityController()
        server.use(this.express.json());
        server.use(this.express.urlencoded({ extended: true }));
        server.use("/universities", controller.getRoutes());
        server.get("/", (_, response) => { response.sendStatus(404) });
        return server
    }
    _start = (server) => {
        return server.listen(this.server_port, async () => {
            const loaderService = new this.loaderService.LoaderService()
            console.info(`[INFO] - server listening on port ${this.server_port}`)
            await loaderService.runLoaders()
        });
    }
}