const {MVLoaderBase} = require('mvloader');

class wrProcessController extends MVLoaderBase {

    caption = 'wrProcess';

    constructor (App, ...config) {
        let localDefaults = {

        };
        super(localDefaults, ...config);
        this.App = App;
    }

    async init() {
        return super.init();
    }

    async initFinish() {
        super.initFinish();
    }

    newMember_trg = (ctx) => ctx.Message.event === 'chatMemberNew';

    leftMember_trg = (ctx) => ctx.Message.event === 'chatMemberLeft';

    isPrivate_trg = (ctx) => ctx.Message.chat.type === 'user';

    newMember_act = async (ctx) => {
        // console.log(ctx.Message.sender);
        let selfJoined = true;
        // let selfJoined = ctx.Message.sender.id === ctx.context.update.message.new_chat_member.id;
        let entry = selfJoined ? 'wr.msg.welcome.selfJoined' : 'wr.msg.welcome.invited';
        if (selfJoined) {
            await ctx.Bridge.Telegram.restrictChatMember(
                ctx.Message.chat.id,
                ctx.context.update.message.new_chat_member.id,
                {
                    permissions: JSON.stringify(this.getPermissions(false))
                },
            );
            await this.MT.sleep(800);
        }
        await ctx.reply(ctx.lexicon(entry, this.MT.merge({
                pmLink: process.env.PM_LINK
            }
            , ctx.context.update.message.new_chat_member)
        ));
    }

    leftMember_act = async (ctx) => {
        // await ctx.Bridge.Telegram.restrictChatMember(
        //     ctx.Message.chat.id,
        //     ctx.context.update.message.left_chat_member.id,
        //     {
        //         permissions: JSON.stringify(this.getPermissions(true))
        //     },
        // );
    }

    allowChatMember = async (ctx) => {
        await ctx.Bridge.Telegram.restrictChatMember(
            process.env.GUARD_CHAT_ID,
            ctx.Message.sender.id,
            {
                permissions: JSON.stringify(this.getPermissions(true))
            },
        );

    }

    getPermissions = (allow = true) => {
        return {
            can_send_messages: allow,
            can_send_media_messages: allow,
            can_send_polls: allow,
            can_send_other_messages: allow,
            can_add_web_page_previews: allow,
            can_change_info: allow,
            can_invite_users: allow,
            can_pin_messages: allow,
        }
    }



}

module.exports = wrProcessController;