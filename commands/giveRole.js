
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giverole')
    .setDescription('Belirtilen rolü sunucudaki tüm üyelere dağıtır')
    .addRoleOption(option => option.setName('rol').setDescription('Dağıtılacak rol').setRequired(true)),
  
  async execute(interaction) {

    if (interaction.user.id !== config.ownerID) {
      return interaction.reply('Bu komutu sadece bot sahibi kullanabilir.');
    }

    const role = interaction.options.getRole('rol');
    if (!role) {
      return interaction.reply('Geçerli bir rol seçmelisiniz.');
    }

 
    const members = await interaction.guild.members.fetch();
    members.forEach(member => {
      member.roles.add(role).catch(console.error);
    });

    return interaction.reply(`Sunucudaki tüm üyelere \`${role.name}\` rolü dağıtıldı.`);
  }
};
