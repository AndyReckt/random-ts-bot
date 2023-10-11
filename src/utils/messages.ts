import { Colors, EmbedBuilder } from "discord.js";

/**
 * Template for success messages
 */
const success = () =>
    new EmbedBuilder().setColor(Colors.Green).setTitle("Successful");

/**
 * Template for info messages
 */
const info = () => new EmbedBuilder().setColor(Colors.Blurple).setTitle("Info");

/**
 * Template for error messages
 */
const error = () => new EmbedBuilder().setColor(Colors.Red).setTitle("Error");

export default {
    success,
    info,
    error,
};
