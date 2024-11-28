import { Client, Colors, GatewayIntentBits, TextChannel } from 'discord.js';

class LoggerService {
  private client: Client;
  private channelId: string;

  constructor() {
    this.channelId = process.env.DEV_DISCORD_CHANNEL_ID || '';
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.client.login(process.env.DEV_DISCORD_TOKEN);

    this.client.on('ready', () => {
      if (!this.client.user) return;

      console.log(`Logged in as ${this.client.user.tag}`);
    });

    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  async sendFormatLog(logData: {
    title: string;
    code: number;
    message: string;
  }) {
    const { title, code, message } = logData;
    const formattedLog = {
      content: message,
      embeds: [
        {
          color: Colors.Aqua,
          title,
          description: '```json\n' + JSON.stringify(code, null, 2) + '\n```',
        },
      ],
    };

    await this.sendLog(formattedLog);
  }

  async sendLog(log: any) {
    if (!this.client.user) return;

    const channel = this.client.channels.cache.get(this.channelId);
    if (!channel) {
      console.log('Channel not found');
      return;
    }

    await (channel as TextChannel).send(log).catch(console.error);
  }
}

export default new LoggerService();
