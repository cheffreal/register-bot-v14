const config = require('../config.json');

module.exports = {
  name: 'guildMemberAdd',
  execute(member) {
    const role = member.guild.roles.cache.get(config.welcomeRoleID);
    if (role) {
      member.roles.add(role).catch(console.error);
    }
  }
};
