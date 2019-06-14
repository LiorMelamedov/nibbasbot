const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("helping to Nibba's giveaways made by It's me Mario#5713", { type: "PLAYING" })
})
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith("~")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "dmall") {
        dmallCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Hmmmmm. It seems as though this command does not exist! Try ~help for a list of commands.")
    }
}
function dmallCommand(arguments, receivedMessage) {
    if (!receivedMessage.member.hasPermission("ADMINISTRATOR")) return receivedMessage.channel.send("You do not have permission!")
    receivedMessage.delete().catch(O_o => { });
    if (!arguments[0]) return receivedMessage.channel.send("You must provide a message to announce.")
    receivedMessage.guild.members.forEach(member => {
        member.send(arguments.join(" ")).catch(O_o => { })
    })
}
client.on('error', console.error);
client.login("NTg2ODcwNjgwNjM3ODAwNDQ5.XPuUBw.SpNu5GJszAypnBmKlUk_hgj0S5I");
