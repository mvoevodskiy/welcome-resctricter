const WelcomeRestricter = require('./src/welcomerestricter');
const MVTools = require('mvtools');

MVTools.readEnv();
MVTools.verboseConsole();

let config = {
    ext: {
        configs: {
            handlers: {
                BotHandler: {
                    botcms: {
                        networks: [
                            {
                                name: "tg",
                                token: process.env.TG_TOKEN,
                            },
                        ],
                        language: 'ru',
                        // defaults: {
                        //     action: 'help',
                        // }
                        // notifyLaunch: {
                        //     bridge: 'tg',
                        //     peerId: 1857089,
                        //     message: 'Realtor community manager started success',
                        // },
                    },
                    schemaFiles: [
                        __dirname + '/src/botschemas/main.yml',
                    ],
                },
                DBHandler: {sync: true,
                    sequelize: {
                        host: process.env.DB_HOST,
                        // port: process.env.DB_PORT,
                        username: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_DATABASE,
                        // logging: console.log,
                    },
                    models: {
                        // mvlomOffer: require('./src/models/offer'),
                    }
                },
            }
        }
    },
};

let welcomeRestricter = new WelcomeRestricter(config)
welcomeRestricter.init().then(() => {
    // console.log(welcomeRestricter.config.ext.configs);
    // console.log(Realtor.ext.handlers.BotHandler.Bot.keyboards);
    // console.log(Realtor.ext.handlers.BotHandler.Bot.Scripts._scripts);
    // console.log(Realtor.config.ext.configs.handlers.BotHandler);
});