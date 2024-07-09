
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Kullanıcıyı kayıt eder')
    .addUserOption(option => option.setName('kullanıcı').setDescription('Kayıt edilecek kullanıcı').setRequired(true)),
  
  async execute(interaction) {
    const user = interaction.options.getUser('kullanıcı');
    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply('Kullanıcı bulunamadı.');
    }

    const unregisteredRole = interaction.guild.roles.cache.get(config.unregisteredRoleID);
    const registeredRole = interaction.guild.roles.cache.get(config.registeredRoleID);
    
    if (unregisteredRole && registeredRole) {
      await member.roles.remove(unregisteredRole).catch(console.error);
      await member.roles.add(registeredRole).catch(console.error);
      return interaction.reply(`${user.tag} başarıyla kayıt edildi.`);
    } else {
      return interaction.reply('Roller bulunamadı.');
    }
  }
};
